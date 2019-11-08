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
    <header data-test="headerComponent" className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.heading}>
            <Link to="/" className={classes.headingLink}>
              Dyson
            </Link>
          </Typography>

          <CustomLink data-test="link" to="/">
            Recipes
          </CustomLink>

          <CustomLink data-test="link" to="/add">
            Add recipe
          </CustomLink>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
