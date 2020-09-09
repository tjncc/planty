import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/UserProfile.css'
import plant from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import RenderPlants from './RenderPlants'
import axios from 'axios'
import { store } from 'react-notifications-component'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            isLoggedIn: false
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


    changePath(path){
            window.location.href=`http://localhost:3000/${path}`
    }


    render(){
        return(
            <div className="mainDiv">
                <h2>Hi {this.state.user.username}</h2>
            </div>
        )
    }
}

export default HomePage