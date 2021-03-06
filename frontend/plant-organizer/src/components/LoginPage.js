import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal } from "react-bootstrap";
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import '../css/Header.css'
import { store } from 'react-notifications-component'

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            
            username: '',
            password: '',          
        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    componentDidMount(){
        let ws = new WebSocket(`ws://localhost:8081/socket`);
        ws.onopen = () => {
            console.log('connected')
        }

        ws.onmessage = evt => {
                // listen to data sent from the websocket server

                setTimeout(() => {     
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
            
            }, 1000)
                
        }
        
        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
        
        } 
    }

    
    login(e) {
        e.preventDefault();

        axios.post(`${serviceConfig.baseURL}/auth/login`,this.state).then(
            (resp) => { 
                let self = this;
                localStorage.setItem('token', resp.data.accessToken)

                const options = {
                    headers: { 'token': resp.data.accessToken}
                };

                store.addNotification({
                    title: "Welcome",
                    message: "Logged in successfully!",
                    type: "success",
                    insert: "right",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 1800,
                        pauseOnHover: true
                      },
                    onRemoval: () => {
                        window.location.reload();
                      },
                  })
            },
            (resp) => { 
                store.addNotification({
                    title: "Error",
                    message: "Username or password is incorrect!",
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
             }, this.readMessages()
        );

    }

    readMessages(){
        let token = localStorage.getItem('token');

        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };


            axios.get(`${serviceConfig.baseURL}/user/username`, options).then(
                    (response) => { },
                    (response) => { }
                );

        
        }
    }
    

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    render(){
        return(
            <div>
                <a className="btnHeaderLogin" onClick={this.handleShow}>
                    Log in
                </a>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                    outline="none"
                >
                <Modal.Header style={{background: "rgba(215, 242, 243,0.6)"}}>
                    <h2 className="regAtitle">Log in</h2>
                </Modal.Header>

                <Modal.Body style={{background: "rgba(215, 242, 243,0.6)"}}>

                <Form className="formRLogin" onSubmit={this.login}>

                    <Form.Group as={Col}>
                        <Form.Label >Username:</Form.Label>
                        <Form.Control type="text" style={{background: "rgb(250, 255, 255)"}} placeholder="Enter username" id="username" name="username" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" style={{background: "rgb(250, 255, 255)"}} placeholder="Enter password" id="password" name="password" onChange={this.handleChange} />
                    </Form.Group>

                    
                <Button variant="outline-secondary" style={{float: "right", margin: "2% 32% 1% 0", width: "15%"}} onClick={this.handleClose}>
                    Close
                </Button>

                <Button variant="outline-success" type="submit" style={{ margin: "2% 1% 1% 32%"}}>
                    Log in
                </Button> 


                </Form>
                
                </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default LoginPage;