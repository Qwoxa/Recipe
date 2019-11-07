import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CustomLink from "./CustomLink.jsx";

const useStyles = makeStyles({
  root: { flexGrow: 1 },
  heading: { flexGrow: 1 },
  headingLink: { textDecoration: "none", color: "inherit" }
});

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.heading}>
            <Link to="/" className={classes.headingLink}>
              Dyson
            </Link>
          </Typography>

          <CustomLink to="/">Recipes</CustomLink>

          <CustomLink to="/add">Add recipe</CustomLink>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
