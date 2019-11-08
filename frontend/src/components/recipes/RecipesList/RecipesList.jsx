import React from 'react';
import PropTypes from 'prop-types';
import HistoryIcon from '@material-ui/icons/History';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from './useStyles';
import {
  Button,
  Divider,
  IconButton,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ModifyModal from '../ModifyModal/ModifyModal';


const formatDate = dateStr => {
  const date = new Date(dateStr)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const RecipesList = ({ recipes, modifyRecipe, removeRecipe }) => {
  const classes = useStyles();
  const [dialogIsOpen, setOpenDialog] = React.useState(false);
  const [modifiedRecipe, setModifiedRecipe] = React.useState({});

  return (
    <>
      {recipes.length !== 0 &&
        recipes.map(({ _id, versions, createdDate }) => {
          const current = versions[0];
          const history = versions.slice(1);
          const theLast = versions.slice(-1);
          console.log(theLast);

          return (
            <div key={_id} className={classes.root}>
              <ModifyModal
                modifiedRecipe={modifiedRecipe}
                modifyRecipe={modifyRecipe}
                setOpen={setOpenDialog}
                open={dialogIsOpen}
              />

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<HistoryIcon />}
                >
                  <div className={classes.panel}>
                    <Typography variant="h6">{current.name}</Typography>
                    <Typography className={classes.recipeDescription}>
                      {current.description}
                    </Typography>
                  </div>
                </ExpansionPanelSummary>

                {/* HISTORY */}
                <ExpansionPanelDetails className={classes.panel}>
                  <Divider />

                  {/* Actions */}
                  <div className={classes.actionButtons}>
                    <Typography>Remove recipe: <IconButton className={classes.action} onClick={() => removeRecipe(_id)}><DeleteIcon /></IconButton ></Typography>
                    <Typography>Modify recipe: <IconButton className={classes.action} onClick={() => {
                      setModifiedRecipe({ id: _id, ...current });
                      setOpenDialog(true);
                    }}><EditIcon /></IconButton ></Typography>
                  </div>
                  <Divider />

                  {/* History elements */}
                  {history.map((snapshot, i) => {
                    const isLast = i === 0;
                    const prev = isLast ? current : history[i - 1];
                    const changedName = snapshot.name === prev.name ? '' : snapshot.name;
                    const changedDesc = snapshot.description === prev.description ? '' : snapshot.description;
                    return (
                      <React.Fragment key={snapshot._id}>
                        <div className={classes.historyContainer}>
                          <Typography className={classes.historyDescription}>
                            <>
                              {formatDate(snapshot.changed)}<br />
                              {changedName && (
                                <><i>New name:</i> {changedName}<br /></>
                              )}
                              {changedDesc && (
                                <><i>New description:</i> {changedDesc}<br /></>
                              )}
                              {!changedName && !changedDesc && (
                                <><i>Changed:</i> {'Nothing'}<br /></>
                              )}
                            </>
                          </Typography>
                          {!isLast && <Button onClick={() => modifyRecipe({ name: snapshot.name, description: snapshot.description, id: _id })} variant="outlined">Revert</Button>}
                          {isLast && <Button disabled variant="outlined">Current</Button>}
                        </div>
                        <Divider />
                      </React.Fragment>
                    );
                  })}

                  {/* First element (element created notification) */}
                  <div className={classes.historyContainer}>
                    <Typography>
                      {formatDate(createdDate)}<br />
                      <i>Recipe created</i>
                    </Typography>
                    {history.length === 0 && <Button disabled variant="outlined">Current</Button>}
                    {history.length !== 0 && <Button onClick={() => modifyRecipe({ name: theLast.name, description: theLast.description, id: _id })} variant="outlined">Revert</Button>}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          );
        })
      }

      {recipes.length === 0 && (
        <Typography className={classes.mt20} variant="subtitle1">No recipes...</Typography>
      )}
    </>
  );
};

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      versions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          changed: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired
};

export default RecipesList;