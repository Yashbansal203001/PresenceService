import React, { Component } from 'react';
import './App.css';
import s from './Logos.png';
import { Link } from 'react-router-dom';
import {login} from './fun/fauth';
import {auth, db} from './Services/firebase';


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error:null,
        User : "",
        Pass : "",
        loading : false
      };
      this.cp=this.cp.bind(this);
    }
    ctxt = (e) => {
      this.setState({[e.target.name] : e.target.value});
    }
    async cp(e) {
      e.preventDefault();
      this.setState({error:'', loading: true });
      try {
        await login(this.state.User,this.state.Pass);
        await db.ref('history').push({
          email : auth().currentUser.email,
          timestamp : Date.now() 
        });
        this.setState({loading : false});
      }
      catch(error) {
        this.setState({error : error.message, loading : false});
      }
    }
    render() {
      return this.state.loading===true ? (
        <div>
          Loading...
        </div>
      ) : (
        <div className="Login">
          <svg data-layer="7b99d1c4-d313-4f0b-8fb8-d47ef3a84a70" preserveAspectRatio="none" viewBox="-4036.749267578125 555.2301635742188 237.050048828125 773.8374633789062" className="path3"><defs><pattern id="img-path3" patternContentUnits="userSpaceOnUse" width="100%" height="100%"><image src="src/path3.png" x="0" y="0" width="235.55px" height="772.34px" /></pattern></defs><path d="M -3800.44921875 1328.257568359375 C -3800.44921875 1328.257568359375 -3920.0009765625 1322.058349609375 -3917.385986328125 1328.257568359375 C -3914.76953125 1334.456787109375 -4038.57373046875 858.872314453125 -4035.95849609375 677.5340576171875 C -4033.342529296875 496.1955261230469 -3800.44921875 571.4684448242188 -3800.44921875 571.4684448242188 L -3800.44921875 1328.257568359375 Z" fill="url(#img-path3)" /></svg>
          <img src = {s} alt = "Future awaits you !!" title="Future awaits you!!!" />
          <p>
            Login here
          </p>
          <hr width='400px' />
          <br/><br/>
          <form className="Fo" onSubmit = {this.cp}>
            <input name="User" type='Email' className = "us" onChange={this.ctxt} placeholder="Email" required/><br/><br/>
            <input name="Pass" type='password' className = "pa" onChange={this.ctxt} placeholder="Password" required/><br/><br/>
            <input type='submit' className = 'bu' value='Login'/><br/>
          </form>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <br/>
          <h3>No account ? <Link to="/signup">Sign Up</Link></h3>
          <br/><br/><br/><br/><br/><br/><br/>
        </div>
      );  
    }
}

export default Login;