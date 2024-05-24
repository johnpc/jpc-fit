/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, SwitchField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPreferences } from "./graphql/queries";
import { updatePreferences } from "./graphql/mutations";
const client = generateClient();
export default function PreferencesUpdateForm(props) {
  const {
    id: idProp,
    preferences: preferencesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    hideProtein: false,
    hideSteps: false,
  };
  const [hideProtein, setHideProtein] = React.useState(
    initialValues.hideProtein,
  );
  const [hideSteps, setHideSteps] = React.useState(initialValues.hideSteps);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = preferencesRecord
      ? { ...initialValues, ...preferencesRecord }
      : initialValues;
    setHideProtein(cleanValues.hideProtein);
    setHideSteps(cleanValues.hideSteps);
    setErrors({});
  };
  const [preferencesRecord, setPreferencesRecord] =
    React.useState(preferencesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPreferences.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPreferences
        : preferencesModelProp;
      setPreferencesRecord(record);
    };
    queryData();
  }, [idProp, preferencesModelProp]);
  React.useEffect(resetStateValues, [preferencesRecord]);
  const validations = {
    hideProtein: [],
    hideSteps: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue,
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          hideProtein: hideProtein ?? null,
          hideSteps: hideSteps ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item),
                ),
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName]),
            );
            return promises;
          }, []),
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updatePreferences.replaceAll("__typename", ""),
            variables: {
              input: {
                id: preferencesRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PreferencesUpdateForm")}
      {...rest}
    >
      <SwitchField
        label="Hide protein"
        defaultChecked={false}
        isDisabled={false}
        isChecked={hideProtein}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              hideProtein: value,
              hideSteps,
            };
            const result = onChange(modelFields);
            value = result?.hideProtein ?? value;
          }
          if (errors.hideProtein?.hasError) {
            runValidationTasks("hideProtein", value);
          }
          setHideProtein(value);
        }}
        onBlur={() => runValidationTasks("hideProtein", hideProtein)}
        errorMessage={errors.hideProtein?.errorMessage}
        hasError={errors.hideProtein?.hasError}
        {...getOverrideProps(overrides, "hideProtein")}
      ></SwitchField>
      <SwitchField
        label="Hide steps"
        defaultChecked={false}
        isDisabled={false}
        isChecked={hideSteps}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              hideProtein,
              hideSteps: value,
            };
            const result = onChange(modelFields);
            value = result?.hideSteps ?? value;
          }
          if (errors.hideSteps?.hasError) {
            runValidationTasks("hideSteps", value);
          }
          setHideSteps(value);
        }}
        onBlur={() => runValidationTasks("hideSteps", hideSteps)}
        errorMessage={errors.hideSteps?.errorMessage}
        hasError={errors.hideSteps?.hasError}
        {...getOverrideProps(overrides, "hideSteps")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || preferencesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || preferencesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
