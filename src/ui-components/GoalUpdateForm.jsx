/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getGoal } from "./graphql/queries";
import { updateGoal } from "./graphql/mutations";
const client = generateClient();
export default function GoalUpdateForm(props) {
  const {
    id: idProp,
    goal: goalModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    dietCalories: "",
  };
  const [dietCalories, setDietCalories] = React.useState(
    initialValues.dietCalories,
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = goalRecord
      ? { ...initialValues, ...goalRecord }
      : initialValues;
    setDietCalories(cleanValues.dietCalories);
    setErrors({});
  };
  const [goalRecord, setGoalRecord] = React.useState(goalModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getGoal.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getGoal
        : goalModelProp;
      setGoalRecord(record);
    };
    queryData();
  }, [idProp, goalModelProp]);
  React.useEffect(resetStateValues, [goalRecord]);
  const validations = {
    dietCalories: [{ type: "Required" }],
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
          dietCalories,
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
            query: updateGoal.replaceAll("__typename", ""),
            variables: {
              input: {
                id: goalRecord.id,
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
      {...getOverrideProps(overrides, "GoalUpdateForm")}
      {...rest}
    >
      <TextField
        label="Diet calories"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={dietCalories}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              dietCalories: value,
            };
            const result = onChange(modelFields);
            value = result?.dietCalories ?? value;
          }
          if (errors.dietCalories?.hasError) {
            runValidationTasks("dietCalories", value);
          }
          setDietCalories(value);
        }}
        onBlur={() => runValidationTasks("dietCalories", dietCalories)}
        errorMessage={errors.dietCalories?.errorMessage}
        hasError={errors.dietCalories?.hasError}
        {...getOverrideProps(overrides, "dietCalories")}
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
          isDisabled={!(idProp || goalModelProp)}
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
              !(idProp || goalModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
