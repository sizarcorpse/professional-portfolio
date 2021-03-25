import React from "react";
import { Link } from "react-router-dom";

import { navMui } from "./muiNav";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Box, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
const PublicUI = (props) => {
  const { classes } = props;

  // const history = useHistory();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link
          variant="button"
          to={"/dashboard"}
          className={classes.toolbarTitle}
        >
          <HomeIcon style={{ color: "#132743" }} />
        </Link>
        <Box style={{ marginRight: 20, display: "flex" }}>
          <Link to={"/login"} className={classes.LinkUnderlineRemove}>
            <Button color="primary">
              <Typography variant="h5" className={classes.ButtonText}>
                Sign In
              </Typography>
            </Button>
          </Link>
          <Link to={"/signup"} className={classes.LinkUnderlineRemove}>
            <Button color="primary">
              <Typography variant="h5" className={classes.ButtonText}>
                Sign Up
              </Typography>
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </>
  );
};

export default withStyles(navMui)(PublicUI);
