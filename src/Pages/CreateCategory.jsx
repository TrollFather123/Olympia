import React, { useState } from 'react'
import Wrapper from '../Layout/Wrapper'
import { CreateCategorySchema } from '../Validation/Login.schema';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router';
import { Createcategory } from '../Redux/CategorySlice';
import styled from '@emotion/styled';
import { Box, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import ErrorText from '../Validation/ErrorText';
import { Button } from '@mui/base';


const FormWrapper = styled(Box)``;

export default function CreateCategory() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([])
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateCategorySchema),
  });

  const FormSubmit = (data) => {
    dispatch(Createcategory({...data,images:images}))
      .unwrap()
      .then((data) => {data && alert("Category created successfully");setTimeout(()=>{navigate("/dashboard")},4000)})
      .catch((err) => alert(err?.message));
    reset();
  };
  return (
    <Wrapper>
    <FormWrapper>
      <Container fixed>
        <Grid container spacing={3}>
         
          <Grid item xs={12}>
            <Box className="form_group">
              <TextField
                label=""
                variant="outlined"
                placeholder="name"
              
                fullWidth
                {...register("name")}
              />
              <ErrorText text={errors?.name?.message} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="form_group">
            <input type="file" onChange={(e)=>setImages("images",e.target.files[0])}/>
              <ErrorText text={errors?.image?.message} />
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
  </Wrapper>
  )
}
