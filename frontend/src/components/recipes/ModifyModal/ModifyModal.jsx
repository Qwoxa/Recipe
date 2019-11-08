import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "../../createRecipe/Form";

const ModifyModal = ({ open, setOpen, modifyRecipe, currentRecipe }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{"Modify recipe"}</DialogTitle>
      <DialogContent>
        <Form
          initialValues={currentRecipe}
          onSubmit={async data => {
            await modifyRecipe(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

ModifyModal.propTypes = {
  modifyRecipe: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ModifyModal;
