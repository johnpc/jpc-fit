import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Height } from "./graphql/types";
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
export declare type HeightUpdateFormInputValues = {
  currentHeight?: number;
};
export declare type HeightUpdateFormValidationValues = {
  currentHeight?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type HeightUpdateFormOverridesProps = {
  HeightUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  currentHeight?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HeightUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: HeightUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    height?: Height;
    onSubmit?: (
      fields: HeightUpdateFormInputValues,
    ) => HeightUpdateFormInputValues;
    onSuccess?: (fields: HeightUpdateFormInputValues) => void;
    onError?: (
      fields: HeightUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: HeightUpdateFormInputValues,
    ) => HeightUpdateFormInputValues;
    onValidate?: HeightUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function HeightUpdateForm(
  props: HeightUpdateFormProps,
): React.ReactElement;
