
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  panel: {
    display: 'flex',
    flexFlow: 'column wrap',
    width: '100%',
  },
  historyContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  historyDescription: {
    width: '80%',
    wordBreak: 'break-all'
  },
  recipeDescription: {
    wordBreak: 'break-all'
  },
  mt20: {
    marginTop: 20
  }
}));