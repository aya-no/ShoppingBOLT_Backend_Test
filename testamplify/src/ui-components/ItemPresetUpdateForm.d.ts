/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ItemPreset } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ItemPresetUpdateFormInputValues = {
    item?: string;
    unit?: string;
    corner?: string;
};
export declare type ItemPresetUpdateFormValidationValues = {
    item?: ValidationFunction<string>;
    unit?: ValidationFunction<string>;
    corner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemPresetUpdateFormOverridesProps = {
    ItemPresetUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    item?: PrimitiveOverrideProps<TextFieldProps>;
    unit?: PrimitiveOverrideProps<TextFieldProps>;
    corner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemPresetUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItemPresetUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    itemPreset?: ItemPreset;
    onSubmit?: (fields: ItemPresetUpdateFormInputValues) => ItemPresetUpdateFormInputValues;
    onSuccess?: (fields: ItemPresetUpdateFormInputValues) => void;
    onError?: (fields: ItemPresetUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemPresetUpdateFormInputValues) => ItemPresetUpdateFormInputValues;
    onValidate?: ItemPresetUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItemPresetUpdateForm(props: ItemPresetUpdateFormProps): React.ReactElement;
