import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import RouterURL from "./components/RouterURL";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

function App(props) {

  const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      position: 'fixed',
      top: 0, 
      left: 0,
      zIndex: 999
    }
  }))
  const classes = useStyles()

  const initPathname = window.location.pathname;
  if(initPathname) {
    props.sendInitPathname(initPathname);
  }

  return (
    <Router>
        {
          props.statusLoading ? (
            <div className={classes.root}>
              <LinearProgress color="secondary" />
            </div>
          ) : ''
        }
        <Navbar />
          <RouterURL />
        <Footer />
    </Router>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    sendInitPathname: initPathname => dispatch({type: "SEND_INIT_PATHNAME", initPathname}),
  }
}
const mapStateToProps = state => {
  return {
    codeProduct: state.codeProduct,
    statusLoading: state.statusLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);