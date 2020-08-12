import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/Header.css'
import logo from '../icons/leaf.svg'
import Login from './LoginPage'
import Register from './RegisterPage'

class Header extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

        }
    }

    render(){
        return(
            <div className="headerDiv">
                <img src={logo} style={{height:'45px', width: 'auto', margin: "2px 0 0 47%"}} alt='Unavailable icon' />
                <div className="headerBtns">
                    <Register />
                    <Login />
                </div>
            </div>
        )
    }
}

export default Header