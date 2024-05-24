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
export declare type QuickAddCreateFormInputValues = {
  name?: string;
  calories?: number;
  protein?: number;
  icon?: string;
};
export declare type QuickAddCreateFormValidationValues = {
  name?: ValidationFunction<string>;
  calories?: ValidationFunction<number>;
  protein?: ValidationFunction<number>;
  icon?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type QuickAddCreateFormOverridesProps = {
  QuickAddCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  calories?: PrimitiveOverrideProps<TextFieldProps>;
  protein?: PrimitiveOverrideProps<TextFieldProps>;
  icon?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuickAddCreateFormProps = React.PropsWithChildren<
  {
    overrides?: QuickAddCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: QuickAddCreateFormInputValues,
    ) => QuickAddCreateFormInputValues;
    onSuccess?: (fields: QuickAddCreateFormInputValues) => void;
    onError?: (
      fields: QuickAddCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: QuickAddCreateFormInputValues,
    ) => QuickAddCreateFormInputValues;
    onValidate?: QuickAddCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function QuickAddCreateForm(
  props: QuickAddCreateFormProps,
): React.ReactElement;
