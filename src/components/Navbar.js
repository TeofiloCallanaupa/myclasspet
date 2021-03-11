import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Navbar = () => {
  //check for user state, if user -> student, add their points to navbar
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >

        {user.id ? (
          <div>
            <Tab label="Students" component={Link} to="/students" />
            <Tab label="Activities" component={Link} to="/activities" />
            <Tab label="Rewards" component={Link} to="/rewards" />
            <Tab label="Logout" onClick={() => dispatch(logout())} />
          </div>
        ) : (
          <div>
            <Tab label="Login" component={Link} to="/login" />
            <Tab label="Signup" component={Link} to="/signup" />

          </div>
        )}
      </Tabs>
    </Paper>
  );
};


export default Navbar;
