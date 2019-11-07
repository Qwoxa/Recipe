import React from 'react';
import PropTypes from 'prop-types';

const ModifyModal = ({ modifyRecipe, name, description }) => {
  return (
    <div>

    </div>
  );
};

ModifyModal.propTypes = {
  modifyRecipe: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ModifyModal;
