import React from 'react'
import { FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core'

function SelectField(props){
  const { label, options, value, setValue } = props

  return(
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => setValue(e.target.value)}
        input={<Input />}
      >
        {options.map((el) =>{
          if(typeof(el) === "string"){
            return (
              <MenuItem key={el} value={el} >
                {el}
              </MenuItem>
            )
          }else{
            return (
              <MenuItem key={el.name} value={el.name} >
                {el.name}
              </MenuItem>
            )
          }
        } 
        )}
      </Select>
    </FormControl>
  )
}

export default SelectField