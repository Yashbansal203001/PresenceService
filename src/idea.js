import React, { Component } from 'react';
import './idea.css';
import {out} from './fun/fauth';
import {auth, db} from './Services/firebase';

class Idea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : auth().currentUser.email,
            itiha : [],
            live : [],
            loading : true,
            uid : auth().currentUser.uid,
            error : null,
            tmp : "",
            ti : null
        };
    }
    sout = () => {
        db.ref(this.state.tmp).set({
            status : 'offline'
        });
        out();
    }

    async componentDidMount() {
        this.setState({loading:false});
        try {
            //event handler so that live is pushed only one time
            // it is not working at all
            if(this.state.ti===null) {
                let a=db.ref('connected').push({
                    usr : this.state.user,
                    status : 'Online'
                });
                this.setState({tmp : a});
                this.setState({ti : true});
            }

            //reading history table
            db.ref('history').on('value', snap=> {
                let itiha=[];
                snap.forEach((sna) => {
                    itiha.push(sna.val());
                });
                this.setState({ itiha });
            });

            //reading live users data
            db.ref('connected').on('value',snap=>{
                let live = [];
                snap.forEach((sn) => {
                        live.push(sn.val());
                });
                this.setState({ live });
            });
        }
        catch (error) {
            console.log(error.message);
        }
    }
    
    //formatting timestamp
    time = (ts) =>{
        const d = new Date(ts);
        const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    render() {
        return this.state.loading === true ? (
            <div>
                Loading...
            </div>
        ) : (
            <div className = "Idea">
                Online users are :
                <p id = 'hi'>
                    {this.state.live.map((liv) => {
                        return <p>{(liv.status==='Online') ? <label className='on'>{liv.usr.split('@')[0]+','}</label> : <label></label>}</p>
                    })}
                </p>
                <hr/>
                <div className = 'firs'>
                    <p>Logged in as : {this.state.user}</p> 
                    <button onClick={this.sout}>Log Off</button>
                </div>
                <hr/>
                <br />
                <p id = 'hi'>History</p>
                <div className = "Sec">
                    <table className = "seca">
                        <tr id='pl'>
                            <th>Person</th>
                            <th>Last visit</th>
                        </tr>
                        {this.state.itiha.map(iti => {
                            return <tr id='pl'><td>{iti.email}</td><td>{this.time(iti.timestamp)}</td></tr>
                        })}
                    </table> 
                </div>
            </div>
        );
    }
}

export default Idea;