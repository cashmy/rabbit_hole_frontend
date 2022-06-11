import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'


const Select = (props) => {
    const { name, label, value, error = null, onChange, options } = props

    return (
        <FormControl variant='outlined' fullWidth
            {...(error && { error: true })}
        >
            <InputLabel>{label || 'Select Label'}</InputLabel>
            <MuiSelect
                variant="filled"
                label={label || 'select label'}
                name={name}
                value={value || ''}
                onChange={onChange}
                fullWidth
            >
                <MenuItem key='999' value="None">None</MenuItem>
                {options &&
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select