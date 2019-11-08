import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import Form from "./Form";

const AddRecipe = ({ createRecipe }) => {
  const history = useHistory();

  const onSubmit = async data => {
    await createRecipe(data);
    history.push("/");
  };

  return (
    <Container>
      <Typography style={{ marginTop: 30 }} variant="h3">
        Add recipe
      </Typography>

      <Form onSubmit={onSubmit} />
    </Container>
  );
};

AddRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired
};

export default AddRecipe;
