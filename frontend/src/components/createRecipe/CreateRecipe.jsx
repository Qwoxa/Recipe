import React from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Container
} from '@material-ui/core';


const AddRecipe = ({ addRecipe }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          name: '',
          description: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Name is required'),
          description: Yup.string()
            .required('Description is required'),
        })}
        onSubmit={async ({ name, description }) => {

        }}

      >
        {({ errors, touched }) => {
          return (
            <Form >
              <Field name="name">
                {({ field }) => (
                  <TextField
                    {...field}
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                    margin="normal"
                    type="name"
                    fullWidth
                    label="Name"
                  />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    error={errors.description && touched.description}
                    helperText={touched.description && errors.description}
                    variant="outlined"
                    margin="normal"
                    type="description"
                    fullWidth
                    label="description"
                  />
                )}
              </Field>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Recipe
            </Button>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

AddRecipe.propTypes = {
  addRecipe: PropTypes.func.isRequired
};

export default AddRecipe;