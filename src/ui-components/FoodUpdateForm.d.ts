import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Food } from "./graphql/types";
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
export declare type FoodUpdateFormInputValues = {
  name?: string;
  calories?: number;
  protein?: number;
  day?: string;
  notes?: string;
  photos?: string[];
};
export declare type FoodUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  calories?: ValidationFunction<number>;
  protein?: ValidationFunction<number>;
  day?: ValidationFunction<string>;
  notes?: ValidationFunction<string>;
  photos?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type FoodUpdateFormOverridesProps = {
  FoodUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  calories?: PrimitiveOverrideProps<TextFieldProps>;
  protein?: PrimitiveOverrideProps<TextFieldProps>;
  day?: PrimitiveOverrideProps<TextFieldProps>;
  notes?: PrimitiveOverrideProps<TextFieldProps>;
  photos?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FoodUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: FoodUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    food?: Food;
    onSubmit?: (fields: FoodUpdateFormInputValues) => FoodUpdateFormInputValues;
    onSuccess?: (fields: FoodUpdateFormInputValues) => void;
    onError?: (fields: FoodUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FoodUpdateFormInputValues) => FoodUpdateFormInputValues;
    onValidate?: FoodUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function FoodUpdateForm(
  props: FoodUpdateFormProps,
): React.ReactElement;
