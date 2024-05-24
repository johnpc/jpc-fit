import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type FoodCreateFormInputValues = {
  name?: string;
  calories?: number;
  protein?: number;
  day?: string;
  notes?: string;
  photos?: string[];
};
export declare type FoodCreateFormValidationValues = {
  name?: ValidationFunction<string>;
  calories?: ValidationFunction<number>;
  protein?: ValidationFunction<number>;
  day?: ValidationFunction<string>;
  notes?: ValidationFunction<string>;
  photos?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type FoodCreateFormOverridesProps = {
  FoodCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  calories?: PrimitiveOverrideProps<TextFieldProps>;
  protein?: PrimitiveOverrideProps<TextFieldProps>;
  day?: PrimitiveOverrideProps<TextFieldProps>;
  notes?: PrimitiveOverrideProps<TextFieldProps>;
  photos?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FoodCreateFormProps = React.PropsWithChildren<
  {
    overrides?: FoodCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FoodCreateFormInputValues) => FoodCreateFormInputValues;
    onSuccess?: (fields: FoodCreateFormInputValues) => void;
    onError?: (fields: FoodCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FoodCreateFormInputValues) => FoodCreateFormInputValues;
    onValidate?: FoodCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function FoodCreateForm(
  props: FoodCreateFormProps,
): React.ReactElement;
