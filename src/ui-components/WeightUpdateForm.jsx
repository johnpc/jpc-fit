/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getWeight } from "./graphql/queries";
import { updateWeight } from "./graphql/mutations";
const client = generateClient();
export default function WeightUpdateForm(props) {
  const {
    id: idProp,
    weight: weightModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    currentWeight: "",
  };
  const [currentWeight, setCurrentWeight] = React.useState(
    initialValues.currentWeight,
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = weightRecord
      ? { ...initialValues, ...weightRecord }
      : initialValues;
    setCurrentWeight(cleanValues.currentWeight);
    setErrors({});
  };
  const [weightRecord, setWeightRecord] = React.useState(weightModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getWeight.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getWeight
        : weightModelProp;
      setWeightRecord(record);
    };
    queryData();
  }, [idProp, weightModelProp]);
  React.useEffect(resetStateValues, [weightRecord]);
  const validations = {
    currentWeight: [{ type: "Required" }],
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
          currentWeight,
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
            query: updateWeight.replaceAll("__typename", ""),
            variables: {
              input: {
                id: weightRecord.id,
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
      {...getOverrideProps(overrides, "WeightUpdateForm")}
      {...rest}
    >
      <TextField
        label="Current weight"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentWeight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              currentWeight: value,
            };
            const result = onChange(modelFields);
            value = result?.currentWeight ?? value;
          }
          if (errors.currentWeight?.hasError) {
            runValidationTasks("currentWeight", value);
          }
          setCurrentWeight(value);
        }}
        onBlur={() => runValidationTasks("currentWeight", currentWeight)}
        errorMessage={errors.currentWeight?.errorMessage}
        hasError={errors.currentWeight?.hasError}
        {...getOverrideProps(overrides, "currentWeight")}
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
          isDisabled={!(idProp || weightModelProp)}
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
              !(idProp || weightModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
