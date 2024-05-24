/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getHeight } from "./graphql/queries";
import { updateHeight } from "./graphql/mutations";
const client = generateClient();
export default function HeightUpdateForm(props) {
  const {
    id: idProp,
    height: heightModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    currentHeight: "",
  };
  const [currentHeight, setCurrentHeight] = React.useState(
    initialValues.currentHeight,
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = heightRecord
      ? { ...initialValues, ...heightRecord }
      : initialValues;
    setCurrentHeight(cleanValues.currentHeight);
    setErrors({});
  };
  const [heightRecord, setHeightRecord] = React.useState(heightModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getHeight.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getHeight
        : heightModelProp;
      setHeightRecord(record);
    };
    queryData();
  }, [idProp, heightModelProp]);
  React.useEffect(resetStateValues, [heightRecord]);
  const validations = {
    currentHeight: [{ type: "Required" }],
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
          currentHeight,
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
            query: updateHeight.replaceAll("__typename", ""),
            variables: {
              input: {
                id: heightRecord.id,
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
      {...getOverrideProps(overrides, "HeightUpdateForm")}
      {...rest}
    >
      <TextField
        label="Current height"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentHeight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              currentHeight: value,
            };
            const result = onChange(modelFields);
            value = result?.currentHeight ?? value;
          }
          if (errors.currentHeight?.hasError) {
            runValidationTasks("currentHeight", value);
          }
          setCurrentHeight(value);
        }}
        onBlur={() => runValidationTasks("currentHeight", currentHeight)}
        errorMessage={errors.currentHeight?.errorMessage}
        hasError={errors.currentHeight?.hasError}
        {...getOverrideProps(overrides, "currentHeight")}
      ></TextField>
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
          isDisabled={!(idProp || heightModelProp)}
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
              !(idProp || heightModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
