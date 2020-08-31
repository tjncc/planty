import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal } from "react-bootstrap";
import '../css/Header.css'
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'


class RegisterPage extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.SendRegisterRequest = this.SendRegisterRequest.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,

            email: '',
            password: '',
            username: '',

            repeatedPassword: '',


        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }



    SendRegisterRequest(e) {
        e.preventDefault();

        if(this.state.password.length < 1){

            alert('Password is too short!');
            return;

        } else if(this.state.password != this.state.repeatedPassword){

            alert('Repeated password does not match!');
            return;
        } else {
            console.log(this.state)

            axios.post(`${serviceConfig.baseURL}/auth/register`,this.state).then(
                (resp) => { 
                    alert('success')
                    window.location.href = "http://localhost:3000/" 
                },
                (resp) => { alert('error') }
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

                <a className="btnHeaderReg" onClick={this.handleShow}>
                    Register
                </a>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
            <Modal.Header style={{background: "rgba(215, 242, 243,0.6)"}}>
                <h2 className="regAtitle">Registration</h2>
            </Modal.Header>

            <Modal.Body style={{background: "rgba(215, 242, 243,0.6)"}}>

            <Form className="formRLogin" onSubmit={this.SendRegisterRequest}>


                <Form.Group as={Col}>
                    <Form.Label >Email:</Form.Label>
                    <Form.Control type="email" style={{background: "rgb(250, 255, 255)"}} placeholder="Enter email" id="email" name="email" onChange={this.handleChange} required/>
                </Form.Group>

                
                <Form.Group as={Col}>
                    <Form.Label >Username:</Form.Label>
                    <Form.Control type="text" style={{background: "rgb(250, 255, 255)"}} placeholder="Enter username" id="username" name="username" onChange={this.handleChange} required/>
                </Form.Group>

                <Form.Row >
                    <Form.Group as={Col} style={{margin: "0 5px 0 15px"}}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" style={{background: "rgb(250, 255, 255)"}} placeholder="Password" id="password" name="password" onChange={this.handleChange} required/>
                        <legend className="legendPass">Password should contain 8 characters minimum.</legend>
                    </Form.Group>

                    <Form.Group as={Col} style={{marginRight: "15px"}}>
                        <Form.Label>Repeat password:</Form.Label>
                        <Form.Control type="password" style={{background: "rgb(244, 245, 249)"}} placeholder="Repeat your password" id="repeatedPassword" name="repeatedPassword" onChange={this.handleChange} required/>
                    </Form.Group>
                </Form.Row>

                <Button variant="outline-secondary" className="btnReg" style={{float: "right", margin: "4% 39% 1% 0"}} onClick={this.handleClose}>
                    Close
                </Button>

                <Button variant="outline-success" type="submit" style={{ margin: "4% 1% 1% 39%"}}>
                    Register
                </Button> 
                

                
            </Form>
            </Modal.Body>
            </Modal>
        </div>

        )
    }
}

export default RegisterPage