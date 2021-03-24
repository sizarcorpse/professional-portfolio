import React from "react";

import Contents from "./Contents";
import Profile from "../Profile/Profile";
import UserProfile from "../Profile/UserProfile";
import Footer from "../Footer/Footer";

import { Grid, Hidden, Box, CssBaseline } from "@material-ui/core";
import bgsvg from "../../assets/bgsvg.svg";
import vb from "../../assets/background.svg";

const Landing = (props) => {
  const username = props.match.params.username;

  return (
    <Grid
      container
      component="main"
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        /* backgroundImage: `url(${bgsvg})`, */
        background:
          "linear-gradient(180deg, rgba(249,247,247,1) 90%, rgba(225,229,236,1) 100%)",
      }}
    >
      <CssBaseline />
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <img
          src={vb}
          alt=""
          style={{ height: 200, width: "100%", objectFit: "cover" }}
        />
      </Grid>

      <Grid item xs={12} xl={3} lg={4} md={5} sm={12}>
        <Box display="flex" justifyContent="flex-end">
          {!username ? <Profile /> : <UserProfile username={username} />}
        </Box>
      </Grid>

      <Grid item xs={12} xl={9} lg={8} md={7} sm={false}>
        <Contents />
      </Grid>
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Landing;
