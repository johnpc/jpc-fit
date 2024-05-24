import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { QuickAdd } from "./graphql/types";
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
export declare type QuickAddUpdateFormInputValues = {
  name?: string;
  calories?: number;
  protein?: number;
  icon?: string;
};
export declare type QuickAddUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  calories?: ValidationFunction<number>;
  protein?: ValidationFunction<number>;
  icon?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type QuickAddUpdateFormOverridesProps = {
  QuickAddUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  calories?: PrimitiveOverrideProps<TextFieldProps>;
  protein?: PrimitiveOverrideProps<TextFieldProps>;
  icon?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuickAddUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: QuickAddUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    quickAdd?: QuickAdd;
    onSubmit?: (
      fields: QuickAddUpdateFormInputValues,
    ) => QuickAddUpdateFormInputValues;
    onSuccess?: (fields: QuickAddUpdateFormInputValues) => void;
    onError?: (
      fields: QuickAddUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: QuickAddUpdateFormInputValues,
    ) => QuickAddUpdateFormInputValues;
    onValidate?: QuickAddUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function QuickAddUpdateForm(
  props: QuickAddUpdateFormProps,
): React.ReactElement;
