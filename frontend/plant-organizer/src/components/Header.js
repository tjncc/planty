import React from 'react'
import { Button } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/Header.css'
import logo from '../icons/leaf.svg'
import usericon from '../icons/user.svg'
import Login from './LoginPage'
import Register from './RegisterPage'
import axios from 'axios'
import { store } from 'react-notifications-component'
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

let socket = '';
let stompClient = '';
let ws = '';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        //this.changePath = this.changePath.bind(this);

        this.state = {
            isLoggedIn: false,
            user: [],
        }

    }

    componentDidMount(){
        this.getRole();
        //let ws = new WebSocket(`ws://localhost:8081/socket`);
        let token = localStorage.getItem('token');
        if(token !== null){

       
        // ws.onopen = () => {
        //     // on connecting, do nothing but log it to the console
        //     console.log('connected')
        //     console.log(this.state.user.username)
        //     ws.send(this.state.user.username);
        // }

        // ws.onmessage = evt => {
        //         // listen to data sent from the websocket server

        //     console.log(evt.data)
        // }
        
        // ws.onclose = () => {
        //     console.log('disconnected')
        //     // automatically try to reconnect on connection loss
        
        // } 
    }      
    }

    
    getRole(){

        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/auth/role`, options).then(
                    (response) => { 
                        this.setState({ user: response.data, isLoggedIn: true});
                        
                        let ws = new WebSocket(`ws://localhost:8081/socket`);
                        ws.onopen = () => {
                            // on connecting, do nothing but log it to the console
                            console.log('connected')
                            console.log(this.state.user.username)
                            ws.send(this.state.user.username);

                            //  axios.get(`${serviceConfig.baseURL}/user/username`, options).then(
                            //      (response) => { },
                            //      (response) => { }
                            //  )
                        }
                
                        ws.onmessage = evt => {
                                // listen to data sent from the websocket server
                
                                store.addNotification({
                                    message: evt.data,
                                    type: "info",
                                    insert: "right",
                                    container: "top-center",
                                    animationIn: ["animated", "fadeIn"],
                                    animationOut: ["animated", "fadeOut"],
                                    dismiss: {
                                        duration: 2500,
                                        pauseOnHover: true
                                      },
                                  })
                        }
                        
                        ws.onclose = () => {
                            console.log('disconnected')
                            // automatically try to reconnect on connection loss
                        
                        } 

                    },
                    (response) => {
                        store.addNotification({
                            message: "Please log in!",
                            type: "danger",
                            insert: "right",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 1600,
                                pauseOnHover: true
                              },
                          })
                    }
            );
        }

    }

    
    logout(){

        this.setState({
            isLoggedIn: false
        });

        localStorage.clear();
        window.location.href="http://localhost:3000/";
    }

    changePath(path){
        window.location.href=`http://localhost:3000/${path}`

    }



    render() {
        return (

            <div className="header" id="myTopnav">
                <a style={{float: 'left'}} className="homeBtn" onClick={this.changePath.bind(this,"")}>Home</a>
                 <img src={logo} onClick={this.changePath.bind(this,"")} className="logo" style={{ height: '45px', width: 'auto', margin: "2px 0 0 42%", float: "left", cursor: "pointer" }} alt='Unavailable icon' />
                    
                { 
                    !this.state.isLoggedIn && 
                    <div className="header-right">
                        <Login />
                        <Register />
                    </div>
                }
                {
                    this.state.isLoggedIn && this.state.user.role === "ADMIN" &&
                    <div className="header-right">
                    <button className="logoutBtn" onClick={this.logout}>Log out</button>
                    <img src={usericon} className="profileIcon" title="Profile" onClick={this.changePath.bind(this, "profile/" + this.state.user.username)} />
                    </div>
                }
                {
                    this.state.isLoggedIn && this.state.user.role === "USER" &&
                    <div className="header-right">
                    <button className="logoutBtn" onClick={this.logout}>Log out</button>
                    <img src={usericon} className="profileIcon" title="Profile" onClick={this.changePath.bind(this, "profile/" + this.state.user.username)} />

                    </div>
                }

            </div>
        )
    }
}

export default Header
