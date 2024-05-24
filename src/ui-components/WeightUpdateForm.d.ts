import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Weight } from "./graphql/types";
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
export declare type WeightUpdateFormInputValues = {
  currentWeight?: number;
};
export declare type WeightUpdateFormValidationValues = {
  currentWeight?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type WeightUpdateFormOverridesProps = {
  WeightUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  currentWeight?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WeightUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: WeightUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    weight?: Weight;
    onSubmit?: (
      fields: WeightUpdateFormInputValues,
    ) => WeightUpdateFormInputValues;
    onSuccess?: (fields: WeightUpdateFormInputValues) => void;
    onError?: (
      fields: WeightUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: WeightUpdateFormInputValues,
    ) => WeightUpdateFormInputValues;
    onValidate?: WeightUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function WeightUpdateForm(
  props: WeightUpdateFormProps,
): React.ReactElement;
