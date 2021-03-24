import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";

// #firebase :
import app from "../../firebase";

// #contexts :
import { useAuth } from "../../contexts/AuthContext";

// #hooks :
import { useSnackbar } from "notistack";

// #validations :
import { validationSchema } from "./CreateReviewFormValidation";

// #material-ui :
import clsx from "clsx";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { MuiDistributor } from "../../muiTheme/MuiDistributor";
import {
  FormControl,
  InputAdornment,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Button,
  TextareaAutosize,
  Paper,
  Box,
  Toolbar,
  IconButton,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import CloseIcon from "@material-ui/icons/Close";

const CreateReview = (props) => {
  const { currentUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { classes, handleCloseModel, width } = props;
  const [loading, setLoading] = useState(false);

  // #handlers : Create review

  const initialValues = {
    reviewTitle: "",
    reviewBody: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const { reviewTitle, reviewBody } = values;
    setLoading(true);
    const db = app.firestore();
    const newReview = {
      reviewID: uuidv4(),
      reviewer: currentUser.displayName,
      reviewerID: currentUser.uid,
      reviewerPhotoUrl: currentUser.photoURL,
      reviewCreatedAt: new Date().toISOString(),
      reviewModifiedAt: "",
      reviewTitle: reviewTitle,
      reviewBody: reviewBody,
      reviewLikeCount: 0,
      reviewCommentCount: 0,
      //check if edited
      reviewIsEdited: false,
    };

    try {
      await db
        .doc(`reviews/${newReview.reviewID}`)
        .set(newReview)
        .then(() => {
          enqueueSnackbar("Review created successfully", {
            variant: "success",
          });
          handleCloseModel(false);
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      className={clsx(classes.ScuiMainContainer, classes.ScuiModalBG)}
    >
      <CssBaseline />
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Box>
          <Toolbar className={classes.ScuiModalClose}>
            <IconButton onClick={() => handleCloseModel(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
      <Grid item xs={12} xl={6} lg={8} md={8} sm={10}>
        <Box
          className={clsx({
            [classes.ScuiMiddle]: true,
            [classes.ScuiBoxFullHeight]: width === "xl",
            [classes.ScuiCenter]: width === "lg",
          })}
        >
          <Paper className={classes.ScuiPaperLarge}>
            <Card className={classes.ScuiCardLarge}>
              <CardHeader
                title={<Typography variant="h2">Create a Review</Typography>}
                subheader={
                  <Typography variant="h4" color="secondary">
                    Anything in your mind?
                  </Typography>
                }
              />
              <Divider className={classes.ScuiDividerT24} />
              {/* // #action : */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                  } = props;

                  return (
                    <Form>
                      <CardContent className={classes.ScuiCardLargeMainArea}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.reviewTitle &&
                                Boolean(errors.reviewTitle)
                              }
                              fullWidth
                            >
                              <TextField
                                InputProps={{
                                  startAdornment:
                                    touched.reviewTitle &&
                                    Boolean(errors.reviewTitle) ? (
                                      <InputAdornment position="start">
                                        <TitleIcon style={{ color: "red" }} />
                                      </InputAdornment>
                                    ) : (
                                      <InputAdornment position="start">
                                        <TitleIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                autoComplete="reviewTitle"
                                name="reviewTitle"
                                variant="outlined"
                                id="reviewTitle"
                                label="Title"
                                fullWidth
                                placeholder="This will not be used right now. Can be empty."
                                value={values.reviewTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl
                              error={
                                touched.reviewBody && Boolean(errors.reviewBody)
                              }
                              fullWidth
                            >
                              <TextareaAutosize
                                className={classes.ScuiTextAreaLarge}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <TitleIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                label="review Body"
                                variant="outlined"
                                rowsMin={26}
                                aria-label="maximum height"
                                placeholder="Give me a nice cool review. (max 500 words)"
                                name="reviewBody"
                                variant="outlined"
                                fullWidth
                                id="reviewBody"
                                value={values.reviewBody}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider className={classes.ScuiDividerTB8} />
                      <CardContent>
                        <Grid item xs={12} className={classes.ScuiGridFooter}>
                          <Typography
                            variant="h6"
                            onClick={() => handleCloseModel(false)}
                          >
                            <Link
                              to={"/dashboard"}
                              className={classes.ScuiLinkUnderLineRemove}
                            >
                              Not Now
                            </Link>
                          </Typography>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                          >
                            <Typography variant="h5">Review Now</Typography>
                          </Button>
                        </Grid>
                      </CardContent>
                    </Form>
                  );
                }}
              </Formik>
            </Card>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={false} xl={3} lg={2} md={2} sm={1} />
    </Grid>
  );
};

export default withWidth()(withStyles(MuiDistributor)(CreateReview));
