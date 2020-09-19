import React from 'react'
import { Button, Card, Nav, Col, Tab,Tabs, Row } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/UserProfile.css'
import plant from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import RenderPlants from './RenderPlants'
import axios from 'axios'
import { store } from 'react-notifications-component'
import UserUpdate from './UserUpdate'
import heart from '../icons/likebtn.svg'

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
            <div className="mainDivProfile">
                <div className="div1Profile">
                    <div>
                    {
                        this.state.user.username !== undefined &&
                        <UserUpdate content={this.state.user}/>
                    }
                    </div>
                </div>

                <div className="div2Profile">
                    <h2>Your plants</h2>
                    <Tabs defaultActiveKey="first" transition={false} id="noanim-tab-example">
                        <Tab eventKey="first" title="Collection">
                            <img src={heart} style={{width: "25px", margin: "0.2% 0 -1% 0"}} />
                            <div style={{marginLeft: '6%'}}>
                                <RenderPlants content={"COLLECTION"} />
                            </div>
                        </Tab>
                        <Tab eventKey="second" title="My plants">
                        <div style={{marginLeft: '6%'}}>
                            <RenderPlants content={"MYPLANTS"} />
                            </div>
                        </Tab>
                        <Tab eventKey="third" title="My requests">
                        <RenderPlants content={"MYREQUESTS"} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default HomePage