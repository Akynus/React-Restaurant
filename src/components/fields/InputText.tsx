import * as React from "react";
import {FormControl, FormHelperText, InputLabel, OutlinedInput} from "@material-ui/core";
import {Controller, FieldErrors} from "react-hook-form";
import {Control} from "react-hook-form/dist/types/form";

export default function TextField(props: IProps): React.ReactElement<IProps> {
    return (<FormControl disabled={props.disabled} fullWidth={true} variant={"outlined"} size={"small"}
                         error={Boolean(props.errors[props.name])}>
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
        <Controller id={props.name} control={props.control} name={props.name}
                    render={(_props) => <OutlinedInput multiline={props.multiline} label={props.label} type={props.type}
                                                       inputProps={{
                                                           maxLength: props.maxLength,
                                                           placeholder: props.placeholder,
                                                           onChange: _props.onChange,
                                                           value: _props.value,
                                                           onBlur: _props.onBlur,
                                                           autofocus: props.autofocus
                                                       }}/>}/>
        {props.errors[props.name] && <FormHelperText>{props.errors[props.name].message}</FormHelperText>}
    </FormControl>)
}

interface IProps {
    name: string;
    label?: string;
    control: Control;
    type?: string;
    errors: FieldErrors;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    multiline?: boolean;
    autofocus?: boolean;
}