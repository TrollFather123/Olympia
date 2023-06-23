import { Typography } from '@mui/material'
import React from 'react'

export default function ErrorText(props) {
    const {text} = props
  return (
   <Typography variant='body1' color={"red"}>{text}</Typography>
  )
}
