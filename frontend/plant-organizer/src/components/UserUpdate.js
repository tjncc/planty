import React from 'react'
import { Button, Card, Form, Row, Col } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/UserUpdate.css'
import RenderPlants from './RenderPlants'
import editicon from '../icons/edit.svg'
import axios from 'axios'
import { store } from 'react-notifications-component'

class UserUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.updateInfo = this.updateInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            editMode: false,
            username: '',
            email: ''
            }
        }
    

    componentDidMount(){
        console.log(this.props.content)
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    updateInfo(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');
        let self = this; 

        var username, email;
        if(this.state.username !== ''){
            username= this.state.username
        } else {
            username = this.props.content.username
        }

        if(this.state.email !== ''){
            email = this.state.email
        } else {
            email = this.props.content.email
        }

        var userInfo = {
            oldUsername: this.props.content.username,
            username: username,
            email: email
        }
        console.log(userInfo)
        
        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };
            
            axios.post(`${serviceConfig.baseURL}/user/update`, userInfo, options).then(
                    (response) => { 
                        store.addNotification({
                            title: "Successfully updated",
                            message: "Your profile info is changed.",
                            type: "success",
                            insert: "right",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                pauseOnHover: true
                              },
                            onRemoval: () => {
                                window.location.reload();
                              },
                          })
                    },
                    (response) => {
                        store.addNotification({
                            title: "Error",
                            message: "Username or email are already taken.",
                            type: "danger",
                            insert: "right",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                pauseOnHover: true
                              }
                          })
                    }
            );
        }
    }

    render(){
        return(
            <div>
                <div className="profileUpdateTitle">
                    <h2 style={{marginRight: "5%"}}>Profile info</h2>
                    <img src={editicon} style={{width: "24px", cursor: "pointer", marginTop: "-3%"}} title="Edit" onClick={() => this.setState({ editMode: !this.state.editMode }) } />
                    <br />
                </div>
               <Form className="formUpdateUser" onSubmit={this.updateInfo}>
                   <Form.Group as={Col}>
                        <Form.Label className="userTitleInfo">Username: </Form.Label>
                        
                        {
                            this.state.editMode &&
                            <Form.Control type="text" style={{background: "rgb(250, 255, 255)"}} defaultValue ={this.props.content.username} id="username" name="username" onChange={this.handleChange}></Form.Control>
                        }
                        {
                            !this.state.editMode &&  
                            <div>
                               <Form.Label className="userInfo">{this.props.content.username}</Form.Label> 
                            </div>
                            
                        }
                   </Form.Group>
                   <Form.Group as={Col}>
                        <Form.Label className="userTitleInfo">Email: </Form.Label>

                        {
                            this.state.editMode &&
                            <Form.Control type="text" style={{background: "rgb(250, 255, 255)"}} defaultValue ={this.props.content.email} id="email" name="email" onChange={this.handleChange}></Form.Control>
                        }
                        {
                            !this.state.editMode &&
                            <div>
                                <Form.Label className="userInfo">{this.props.content.email}</Form.Label>
                            </div>
                        }                   
                        </Form.Group>
                        {
                            this.state.editMode &&
                            <div style={{textAlign: "center"}}>
                                <Button variant="outline-info" type="submit" style={{top: "50%"}}>Update</Button>
                            </div>
                        }
                        
               </Form>
            </div>
        )
    }
}

export default UserUpdate