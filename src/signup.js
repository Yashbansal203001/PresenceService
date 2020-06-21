import React, { Component } from 'react';
import './Up.css';
import s from './Logos.png';
import { Link } from 'react-router-dom';
import { signup , inwithGoogle } from './fun/fauth';
import {db} from './Services/firebase';


class Up extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error : null,
            Email : "",
            Pass : "",
            loading : false
        };

        this.cp = this.cp.bind(this);
        this.googin = this.googin.bind(this);
    }
    ctxt = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    async cp(e) {
        e.preventDefault();
        this.setState({error : '', loading : true});
        try {
            //signinig up and then writing the user to history data
            await signup(this.state.Email, this.state.Pass);
            await db.ref("history").push({
                email : this.state.Email,
                timestamp: Date.now(),
            });
            this.setState({loading : false})
        }
        catch (error) {
            this.setState({error : error.message, loading : false});
        }
    }

    async googin() {
        //google signin
        try {
            await inwithGoogle();
        }
        catch(error) {
            this.setState({error:error.message});
        }
    }

    render() {
        let st = {
            height : '1.5px',
            background : 'rebeccapurple'
        };
        return this.state.loading===true ? (
            <div>
              Loading...
            </div>
          ) :  (
            <div className="Up">
                <svg data-layer="0231232b-fb31-475c-b440-45dea1d473e7" preserveAspectRatio="none" viewBox="-4036.749267578125 555.230224609375 237.295654296875 774.084716796875" className = "path2"><defs><pattern id="img-path2" patternContentUnits="userSpaceOnUse" width="100%" height="100%"><image src="./path2.png" x="0" y="0" width="235.55px" height="772.33px" /></pattern></defs><path d="M -4035.999267578125 1328.2548828125 C -4035.999267578125 1328.2548828125 -3916.44921875 1322.055786132813 -3919.064453125 1328.2548828125 C -3921.6806640625 1334.4541015625 -3797.878662109375 858.871337890625 -3800.494140625 677.53369140625 C -3803.10986328125 496.1957092285156 -4035.999267578125 571.4683837890625 -4035.999267578125 571.4683837890625 L -4035.999267578125 1328.2548828125 Z" fill="url(#img-path2)" /></svg>
                <img src = {s} alt = "Future awaits you !!" title = "Future awaits you !!"/>
                <p>
                    Kick start your journey by registering here
                </p>
                <hr style = {st} width='550px'/>
                <br/><br/>
                <form onSubmit={this.cp} className="lp" >
                    
                    <input type = 'email' className="em" placeholder='Email' name='Email' onChange={this.ctxt} required/><br/><br/>
                    <input type = 'password' className="pw" placeholder='Password' name='Pass' onChange={this.ctxt} required/>
                    <input type = 'submit' className = 'tu' value='Sign Up'/>
                </form>
                <br/><br/><br/><br/><br/>
                {this.state.error ? <p>{this.state.error}</p> : null}
                <h3> Already have an account ? <Link to='/login'>Login Here</Link></h3>
                <p>Or</p>
                <button onClick={this.googin}> Sign Up with Google</button>
                <br/><br/>
            </div>
        );
    }
}

export default Up;