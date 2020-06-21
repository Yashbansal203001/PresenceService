import React, { Component } from 'react';
import './App.css';
import {  Route, Switch, Redirect } from 'react-router-dom'; 
import Up from './signup';
import Login from './login';
import Idea from './idea';
import {auth} from './Services/firebase';
import NF from './nf';

function PrivRoute({component : Component, auth, logout, ...rest }) {
  return (
    //private route setting only to idea component
    //alongwith checking the auth
    <Route
      {...rest}
      render = {props => 
        auth===true ? (
          <Component {...props}/>
        ) : ((logout===true ? <Redirect
          to={{ pathname: "login", state: { from: props.location } }}
          /> :<Redirect
          to={{ pathname: "notallowd", state: { from: props.location } }}
          />
        ))
      }
    />
  );
}


function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    //public route form login and signup components
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/idea" />
          )
      }
    />
  );
}



class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth : false,
        loading : true,
        logout : false
      };
    }

    componentDidMount() {
      auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({auth:true, loading:false,logout:true});
        } 
        else {
          this.setState({auth:false, loading:false});
        }
      });
    }

    render() {
      return this.state.loading===true ? (
        <div>
          Loading...
        </div>
      ) : (
        <div className="App">
          <Switch>
            <PrivRoute path='/idea' auth={this.state.auth} logout={this.state.logout} component={Idea}/>
            <PublicRoute path="/signup" authenticated={this.state.auth} component={Up}/>
            <PublicRoute path="/login" authenticated={this.state.auth} component={Login}/>
            <Route path='/notallowd' component={NF}/>
            <Route path='*' component={() => "404 Not Found--------GOTO /login"}/>
          </Switch>
        </div>
      );  
    }
}

export default App;