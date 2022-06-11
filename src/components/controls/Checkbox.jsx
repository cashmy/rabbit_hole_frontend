import React from 'react';
import { FormControl, FormControlLabel, FormHelperText, Checkbox as MuiCheckBox } from '@mui/material'


const Select = (props) => {
    const { name, label, value, error=null, onChange, labelPlacement, color, ...options} = props

    // Converts the "Checked" value to the Default Event parameter alleviating an error message
    const convertToDefEventParam = (name, value) => ({
        target: {
            name, value
        }
    })
    let checkedValue = false
    let defaultValues = { name: "checkbox", value: checkedValue }

    return (
        <FormControl variant='outlined' fullWidth
        {...(error && {error:true})}
        >
            <FormControlLabel
                labelPlacement={labelPlacement || "end"}
                control={
                <MuiCheckBox 
                    name = {name || defaultValues.name}
                    color = {color || "primary"}
                    checked={value || defaultValues.value}
                    onChange = {e => onChange(convertToDefEventParam(name, e.target.checked))}
                    {...options}
                />}
                label={label || "checkbox name"}
            ></FormControlLabel>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select