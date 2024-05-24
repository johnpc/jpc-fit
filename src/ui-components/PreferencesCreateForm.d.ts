import * as React from "react";
import { GridProps, SwitchFieldProps } from "@aws-amplify/ui-react";
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
export declare type PreferencesCreateFormInputValues = {
  hideProtein?: boolean;
  hideSteps?: boolean;
};
export declare type PreferencesCreateFormValidationValues = {
  hideProtein?: ValidationFunction<boolean>;
  hideSteps?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type PreferencesCreateFormOverridesProps = {
  PreferencesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  hideProtein?: PrimitiveOverrideProps<SwitchFieldProps>;
  hideSteps?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PreferencesCreateFormProps = React.PropsWithChildren<
  {
    overrides?: PreferencesCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: PreferencesCreateFormInputValues,
    ) => PreferencesCreateFormInputValues;
    onSuccess?: (fields: PreferencesCreateFormInputValues) => void;
    onError?: (
      fields: PreferencesCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: PreferencesCreateFormInputValues,
    ) => PreferencesCreateFormInputValues;
    onValidate?: PreferencesCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function PreferencesCreateForm(
  props: PreferencesCreateFormProps,
): React.ReactElement;
