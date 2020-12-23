import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import RouterURL from "./components/RouterURL";
import { connect } from 'react-redux';

function App(props) {

  const initPathname = window.location.pathname;
  if(initPathname) {
    props.sendInitPathname(initPathname);
  }

  return (
    <Router>
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
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);