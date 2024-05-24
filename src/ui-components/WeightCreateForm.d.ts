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
export declare type WeightCreateFormInputValues = {
  currentWeight?: number;
};
export declare type WeightCreateFormValidationValues = {
  currentWeight?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type WeightCreateFormOverridesProps = {
  WeightCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  currentWeight?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WeightCreateFormProps = React.PropsWithChildren<
  {
    overrides?: WeightCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: WeightCreateFormInputValues,
    ) => WeightCreateFormInputValues;
    onSuccess?: (fields: WeightCreateFormInputValues) => void;
    onError?: (
      fields: WeightCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: WeightCreateFormInputValues,
    ) => WeightCreateFormInputValues;
    onValidate?: WeightCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function WeightCreateForm(
  props: WeightCreateFormProps,
): React.ReactElement;
