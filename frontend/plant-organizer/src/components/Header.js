import React from 'react'
import { Button } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/Header.css'
import logo from '../icons/leaf.svg'
import Login from './LoginPage'
import Register from './RegisterPage'
import axios from 'axios'

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

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
                    (response) => {alert('Please log in.')}
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



    render() {
        return (

            <div className="header" id="myTopnav">
                 <img src={logo} className="logo" style={{ height: '45px', width: 'auto', margin: "2px 0 0 47%", float: "left" }} alt='Unavailable icon' />

                { !this.state.isLoggedIn && 
                <div className="header-right">
                    <Login />
                    <Register />
                </div>
                }
                {
                    this.state.isLoggedIn && this.state.user.role === "ADMIN" &&
                    <button className="logoutBtn" onClick={this.logout}>Log out</button>
                }

            </div>
        )
    }
}

export default Header