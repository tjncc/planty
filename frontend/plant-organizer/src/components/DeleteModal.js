import React from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col, Modal } from "react-bootstrap";
import {serviceConfig} from '../appSettings.js'
import axios from 'axios'
import { store } from 'react-notifications-component'

class DeleteModal extends React.Component{
    constructor(props){
        super(props);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    deletePlant(){
        
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.delete(`${serviceConfig.baseURL}/plant/${this.props.content}`, options).then(
            (resp) => {
                store.addNotification({
                    title: "Successfully deleted!",
                    message: "Plant is deleted.",
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
                        window.location.href = "http://localhost:3000/" 
                      },
                  })
                
            },
            (resp) => {
                store.addNotification({
                    title: "Error",
                    message: "Unsuccessful removing plant.",
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


    render(){
        return(
            <div>
                <button className="userLikeBtn" onClick={this.handleShow}>
                    Delete
                </button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                    outline="none"
                >
                <Modal.Header style={{background: "rgba(242, 252, 255,0.6)", textAlign: "center"}}>
                    <h2 className="regAtitle">Are you sure that you want to delete this plant?</h2>
                </Modal.Header>

                <Modal.Body style={{background: "rgba(242, 252, 255,0.6)"}}>
                    <div style={{textAlign: "center"}}>
                        <Button variant="outline-success" 
                            style={{width: "18%", marginRight: "20%"}}
                            onClick={this.deletePlant.bind(this)}>Yes
                        </Button>

                        <Button variant="outline-danger"
                            style={{width: "18%"}}
                            onClick={this.handleClose}>No
                        </Button>
                    </div>
                </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default DeleteModal
