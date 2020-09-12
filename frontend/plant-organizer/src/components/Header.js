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
                        console.log(this.state) 

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