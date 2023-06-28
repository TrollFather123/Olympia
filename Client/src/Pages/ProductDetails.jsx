import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductSchema, ProductUpdateSchema, UserSchema } from '../Validation/Login.schema';
import DashBoardWrapper from '../Layout/DashBoardWrapper';
import styled from '@emotion/styled';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import ErrorText from '../Validation/ErrorText';
import { CreateEachProduct, GetEachProduct, UpdateProduct } from '../Redux/ProductSlice';


const FormWrapper = styled(Box)`
`;


export default function ProductDetails() {
    const {productDetails} = useSelector((s)=>s.product)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
      handleSubmit,
      register,
      setValue,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(ProductUpdateSchema),
    });


    const FormSubmit = (product) =>{
       
        dispatch(UpdateProduct(product)).unwrap().then((res)=>{res && alert("Product Updated Successfully");navigate("/dashboard/products")}).catch((err)=>alert(err))
        reset()
    }

    useEffect(()=>{
        dispatch(GetEachProduct(id))
    },[id])

    useEffect(()=>{
        if(productDetails){
            setValue("title",productDetails?.title)
            setValue("price",productDetails?.price)
        }
    },[productDetails])


  return (
    <DashBoardWrapper>
    <FormWrapper>
     <Container fixed>
     <Grid container spacing={3}>
       <Grid item xs={12}>
         <Box className="form_group">
           <TextField label="" variant="outlined" placeholder="Title" fullWidth {...register("title")}/>
           <ErrorText text={errors?.title?.message}/>
         </Box>
       </Grid>
       <Grid item xs={12}>
         <Box className="form_group">
           <TextField
             label=""
             variant="outlined"
             placeholder="price"
       
             fullWidth
             {...register("price")}
           />
           <ErrorText text={errors?.price?.message}/>
         </Box>
       </Grid>
  
       <Grid item xs={12}>
         <Button variant="contained" onClick={handleSubmit(FormSubmit)}>
             Submit
         </Button>
         </Grid>
     </Grid>
     </Container>
   </FormWrapper>
</DashBoardWrapper>
  )
}
