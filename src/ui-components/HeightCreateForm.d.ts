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
export declare type HeightCreateFormInputValues = {
  currentHeight?: number;
};
export declare type HeightCreateFormValidationValues = {
  currentHeight?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type HeightCreateFormOverridesProps = {
  HeightCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  currentHeight?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HeightCreateFormProps = React.PropsWithChildren<
  {
    overrides?: HeightCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: HeightCreateFormInputValues,
    ) => HeightCreateFormInputValues;
    onSuccess?: (fields: HeightCreateFormInputValues) => void;
    onError?: (
      fields: HeightCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: HeightCreateFormInputValues,
    ) => HeightCreateFormInputValues;
    onValidate?: HeightCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function HeightCreateForm(
  props: HeightCreateFormProps,
): React.ReactElement;
