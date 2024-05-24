/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getQuickAdd } from "./graphql/queries";
import { updateQuickAdd } from "./graphql/mutations";
const client = generateClient();
export default function QuickAddUpdateForm(props) {
  const {
    id: idProp,
    quickAdd: quickAddModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    calories: "",
    protein: "",
    icon: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [calories, setCalories] = React.useState(initialValues.calories);
  const [protein, setProtein] = React.useState(initialValues.protein);
  const [icon, setIcon] = React.useState(initialValues.icon);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = quickAddRecord
      ? { ...initialValues, ...quickAddRecord }
      : initialValues;
    setName(cleanValues.name);
    setCalories(cleanValues.calories);
    setProtein(cleanValues.protein);
    setIcon(cleanValues.icon);
    setErrors({});
  };
  const [quickAddRecord, setQuickAddRecord] = React.useState(quickAddModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getQuickAdd.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getQuickAdd
        : quickAddModelProp;
      setQuickAddRecord(record);
    };
    queryData();
  }, [idProp, quickAddModelProp]);
  React.useEffect(resetStateValues, [quickAddRecord]);
  const validations = {
    name: [{ type: "Required" }],
    calories: [{ type: "Required" }],
    protein: [],
    icon: [{ type: "Required" }],
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
          name,
          calories,
          protein: protein ?? null,
          icon,
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
            query: updateQuickAdd.replaceAll("__typename", ""),
            variables: {
              input: {
                id: quickAddRecord.id,
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
      {...getOverrideProps(overrides, "QuickAddUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              calories,
              protein,
              icon,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Calories"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={calories}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              calories: value,
              protein,
              icon,
            };
            const result = onChange(modelFields);
            value = result?.calories ?? value;
          }
          if (errors.calories?.hasError) {
            runValidationTasks("calories", value);
          }
          setCalories(value);
        }}
        onBlur={() => runValidationTasks("calories", calories)}
        errorMessage={errors.calories?.errorMessage}
        hasError={errors.calories?.hasError}
        {...getOverrideProps(overrides, "calories")}
      ></TextField>
      <TextField
        label="Protein"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={protein}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              calories,
              protein: value,
              icon,
            };
            const result = onChange(modelFields);
            value = result?.protein ?? value;
          }
          if (errors.protein?.hasError) {
            runValidationTasks("protein", value);
          }
          setProtein(value);
        }}
        onBlur={() => runValidationTasks("protein", protein)}
        errorMessage={errors.protein?.errorMessage}
        hasError={errors.protein?.hasError}
        {...getOverrideProps(overrides, "protein")}
      ></TextField>
      <TextField
        label="Icon"
        isRequired={true}
        isReadOnly={false}
        value={icon}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              calories,
              protein,
              icon: value,
            };
            const result = onChange(modelFields);
            value = result?.icon ?? value;
          }
          if (errors.icon?.hasError) {
            runValidationTasks("icon", value);
          }
          setIcon(value);
        }}
        onBlur={() => runValidationTasks("icon", icon)}
        errorMessage={errors.icon?.errorMessage}
        hasError={errors.icon?.hasError}
        {...getOverrideProps(overrides, "icon")}
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
          isDisabled={!(idProp || quickAddModelProp)}
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
              !(idProp || quickAddModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
