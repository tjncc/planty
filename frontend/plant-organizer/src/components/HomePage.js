import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/HomePage.css'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render(){
        return(
            <div>
                <h1>HOME PAGE</h1>
            </div>
        )
    }
}

export default HomePage