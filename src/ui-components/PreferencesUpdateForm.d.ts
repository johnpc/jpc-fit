import * as React from "react";
import { GridProps, SwitchFieldProps } from "@aws-amplify/ui-react";
import { Preferences } from "./graphql/types";
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
export declare type PreferencesUpdateFormInputValues = {
  hideProtein?: boolean;
  hideSteps?: boolean;
};
export declare type PreferencesUpdateFormValidationValues = {
  hideProtein?: ValidationFunction<boolean>;
  hideSteps?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type PreferencesUpdateFormOverridesProps = {
  PreferencesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  hideProtein?: PrimitiveOverrideProps<SwitchFieldProps>;
  hideSteps?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type PreferencesUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: PreferencesUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    preferences?: Preferences;
    onSubmit?: (
      fields: PreferencesUpdateFormInputValues,
    ) => PreferencesUpdateFormInputValues;
    onSuccess?: (fields: PreferencesUpdateFormInputValues) => void;
    onError?: (
      fields: PreferencesUpdateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: PreferencesUpdateFormInputValues,
    ) => PreferencesUpdateFormInputValues;
    onValidate?: PreferencesUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function PreferencesUpdateForm(
  props: PreferencesUpdateFormProps,
): React.ReactElement;
