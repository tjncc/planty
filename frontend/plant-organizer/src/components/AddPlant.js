import React from 'react'
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from "react-bootstrap";
import { serviceConfig } from '../appSettings.js'
import '../css/AddPlant.css'
import background from '../icons/bcgrnd.png'
import axios from 'axios'
import { store } from 'react-notifications-component'

class AddPlant extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addPlant = this.addPlant.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.removeImage = this.removeImage.bind(this);

        this.state = {
            name: '',
            family: '',
            wateringTime: '',
            info: '',
            file: '',
            image: '',
            wateringValues: []
        }
    }

    componentWillMount(){
        this.getWateringTime();

    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    getWateringTime(){
        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/plantrequest/watering`, options).then(
                    (response) => { 
                        this.setState({ wateringValues: response.data, wateringTime: response.data[0]});
                    },
                    (response) => {
                        store.addNotification({
                            title: "Error",
                            message: "Cannot load watering time.",
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

    handleImageUpload(e) {   
        e.preventDefault();
        if(e.target.files[0] !== undefined){
            let reader = new FileReader();
            let file = e.target.files[0];    
            
            reader.onload = () => {
            this.setState({
                file: file,
                image: reader.result
            });
            }
        
            reader.readAsDataURL(file)
        }
      }


    addPlant(e){
        e.preventDefault();

        let token = localStorage.getItem('token');
        let self = this;    

        var plant = {  
            name: this.state.name,
            family: this.state.family,
            wateringTime: this.state.wateringTime.toUpperCase(),
            info: this.state.info,
            image: this.state.image 
        }
        console.log(plant)
        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            
            axios.post(`${serviceConfig.baseURL}/plantrequest`, plant, options).then(
                    (response) => { 
                        store.addNotification({
                            title: "Successfully added",
                            message: "Admin will review your plant request soon.",
                            type: "success",
                            insert: "right",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 1600,
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
                            message: "Something gone wrong while creating plant.",
                            type: "danger",
                            insert: "right",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 1600,
                                pauseOnHover: true
                              },
                            onRemoval: () => {
                                window.location.reload();
                              },
                          })
                    }
            );
        }
    }

    removeImage(){
        this.setState({
            file: '',
            image: ''
          });
    }


    render() {
        return (
            <div className="mainDivAddPlant">
                <img src={background} id="bg" alt=""></img>

                <div>

                    <div className="formAddPlant">
                        <Form className="formRLogin" onSubmit={this.addPlant}>
                            <div className="bigForm">
                            <div className="leftForm">
                            <Form.Group as={Col}>
                                <Form.Label >Name:</Form.Label>
                                <Form.Control type="text" style={{ background: "rgb(250, 255, 255)" }} placeholder="What is this plant's name?" id="name" name="name" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Family:</Form.Label>
                                <Form.Control type="text" style={{ background: "rgb(250, 255, 255)" }} placeholder="Which family does it belong?" id="family" name="family" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>How often should this plant be watered?</Form.Label>
                                <Form.Control as="select" id="wateringTime" name="wateringTime" 
                                value={this.state.wateringTime}
                                onChange={this.handleChange} required>
                                    { this.state.wateringValues.map(opt => (<option>{ opt }</option>)) }
                                    </Form.Control>                
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Info</Form.Label>
                                    <Form.Control placeholder="Write some useful information about this plant" 
                                    as="textarea" rows="5"
                                    className="textareaAddPlant"
                                    id="info" name="info" onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} style={{margin: '0 auto', textAlign:'center'}}>
                                <button className="submitPlantBtn" type="submit">
                                    Add plant
                            </button>
                            </Form.Group>
                                </div>
                                <div className="rightForm">

                                <Form.Group as={Col}>
                                    <input className="fileInput" 
                                    type="file" 
                                    accept=".jpg,.jpeg,.png"
                                    style={{display: 'none'}}
                                    onChange={this.handleImageUpload}
                                    ref={fileInput => this.fileInput = fileInput} />
                                <button className="addImageBtn" type="button" onClick={() => this.fileInput.click()}>Upload image</button>

                                 <div className="imgPreview">
                                    {
                                        this.state.image !== "" &&
                                        <div>
                                        <img className="uploadedImage" src={this.state.image} />
                                        <button className="removeImageBtn" onClick={this.removeImage}>Remove image</button>
                                        </div>
                                    }
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} className="formGroupSmallerBtn" style={{margin: '0 auto', textAlign:'center'}}>
                                    <button className="submitPlantBtn1" type="submit">
                                        Add plant
                                    </button>
                                </Form.Group>
                                </div>
                                </div>
                        </Form>

                    </div>
                    </div>
                </div>
        )
    }
}

export default AddPlant