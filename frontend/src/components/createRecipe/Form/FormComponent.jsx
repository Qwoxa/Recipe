import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';

const FormComponent = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required")
    })}
    onSubmit={onSubmit}
    style={{ marginTop: 10 }}
  >
    {({ errors, touched }) => {
      return (
        <Form>
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
                label="Description"
              />
            )}
          </Field>

          <Button type="submit" style={{ padding: 10, marginTop: 10, marginBottom: 10 }} fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      );
    }}
  </Formik>
);

FormComponent.defaultProps = {
  initialValues: {
    name: "",
    description: ""
  }
};

FormComponent.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
};

export default FormComponent;
