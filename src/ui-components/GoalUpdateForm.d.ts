import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Goal } from "./graphql/types";
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>;
export declare type GoalUpdateFormInputValues = {
  dietCalories?: number;
};
export declare type GoalUpdateFormValidationValues = {
  dietCalories?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type GoalUpdateFormOverridesProps = {
  GoalUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  dietCalories?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GoalUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: GoalUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    goal?: Goal;
    onSubmit?: (fields: GoalUpdateFormInputValues) => GoalUpdateFormInputValues;
    onSuccess?: (fields: GoalUpdateFormInputValues) => void;
    onError?: (fields: GoalUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GoalUpdateFormInputValues) => GoalUpdateFormInputValues;
    onValidate?: GoalUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function GoalUpdateForm(
  props: GoalUpdateFormProps,
): React.ReactElement;
