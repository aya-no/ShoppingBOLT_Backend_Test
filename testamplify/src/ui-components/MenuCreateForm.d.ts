/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MenuCreateFormInputValues = {
    date?: string;
};
export declare type MenuCreateFormValidationValues = {
    date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MenuCreateFormOverridesProps = {
    MenuCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MenuCreateFormProps = React.PropsWithChildren<{
    overrides?: MenuCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MenuCreateFormInputValues) => MenuCreateFormInputValues;
    onSuccess?: (fields: MenuCreateFormInputValues) => void;
    onError?: (fields: MenuCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MenuCreateFormInputValues) => MenuCreateFormInputValues;
    onValidate?: MenuCreateFormValidationValues;
} & React.CSSProperties>;
export default function MenuCreateForm(props: MenuCreateFormProps): React.ReactElement;
