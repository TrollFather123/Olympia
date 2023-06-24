import { Slider } from '@mui/material'
import React from 'react'

export default function RangeSlider({value,handleChange}) {
  
  
  return (
    <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={10}
        max={1000}
        // getAriaValueText={valuetext}
      />
  )
}
