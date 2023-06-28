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
export declare type RecipeItemCreateFormInputValues = {
    recipeItem?: string;
    quantity?: number;
    userName?: string;
};
export declare type RecipeItemCreateFormValidationValues = {
    recipeItem?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    userName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecipeItemCreateFormOverridesProps = {
    RecipeItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    recipeItem?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    userName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecipeItemCreateFormProps = React.PropsWithChildren<{
    overrides?: RecipeItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RecipeItemCreateFormInputValues) => RecipeItemCreateFormInputValues;
    onSuccess?: (fields: RecipeItemCreateFormInputValues) => void;
    onError?: (fields: RecipeItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecipeItemCreateFormInputValues) => RecipeItemCreateFormInputValues;
    onValidate?: RecipeItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function RecipeItemCreateForm(props: RecipeItemCreateFormProps): React.ReactElement;
