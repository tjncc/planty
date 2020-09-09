import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/HomePage.css'
import plant from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import RenderPlants from './RenderPlants'
import axios from 'axios'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            isLoggedIn: false,
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
                        this.setState({ user: response.data, isLoggedIn: true });
                    },
                    (response) => { }
            );
        }

    }


    changePath(path){
            window.location.href=`http://localhost:3000/${path}`
    }


    render(){
        return(
            <div className="mainDiv">
                {
                    this.state.isLoggedIn && this.state.user.role === "USER" &&
                    <div className="div1">
                        <button className="btnAddNew" onClick={this.changePath.bind(this,"add")}>
                            Add new plant
                        </button>
                        <br />
                        <button className="btnAddNew">
                            My plants
                        </button>
                    </div>
                }
                {
                    this.state.isLoggedIn && this.state.user.role === "ADMIN" &&
                    <div className="div1">
                    <button className="btnAddNew" onClick={this.changePath.bind(this,"add")}>
                        Add new plant
                    </button>
                    </div>
                }
                
                <div className="div2">
                    <RenderPlants />
                </div>
            </div>
        )
    }
}

export default HomePage