import React from 'react'
import { Button, Card, Row, Tab, Col, Nav } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/AdminProfile.css'
import plant from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import RenderPlants from './RenderPlants'
import axios from 'axios'
import RenderPlantRequests from './RenderPlantRequests'

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
                    (response) => {alert('Please log in.')}
            );
        }

    }


    changePath(path){
            window.location.href=`http://localhost:3000/${path}`
    }


    render(){
        return(
            <div className="mainDivAdminPrfl">
                <h2 className="userTitle">Plant requests</h2>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="tabs" className="flex-column">
                        <Nav.Item className="nav1">
                        <Nav.Link eventKey="first">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Accepted</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="third">Cancelled</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                        <RenderPlantRequests content={"PENDING"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                        <RenderPlantRequests content={"ACCEPTED"} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                        <RenderPlantRequests content={"CANCELLED"} />
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default HomePage