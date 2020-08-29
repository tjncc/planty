import React from 'react'
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Modal } from "react-bootstrap";
import { serviceConfig } from '../appSettings.js'
import '../css/AddPlant.css'
import background from '../icons/bcgrnd.png'
import axios from 'axios'

class AddPlant extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addPlant = this.addPlant.bind(this);

        this.state = {
            name: '',
            family: '',
            wateringTime: '',
            info: '',
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
                    (response) => {alert('Error while loading watering values.')}
            );
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
            info: this.state.info 
        }
        console.log(plant)
        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            
            axios.post(`${serviceConfig.baseURL}/plantrequest`, plant, options).then(
                    (response) => { 
                        alert('Successful added!');
                    },
                    (response) => {alert('Error while adding new plant.')}
            );
        }
    }




    render() {
        return (
            <div className="mainDivAddPlant">
                <img src={background} id="bg" alt=""></img>

                <div>

                    <div className="formAddPlant">
                        <Form className="formRLogin" onSubmit={this.addPlant}>

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

                                <Button variant="outline-success" type="submit" style={{ margin: "2.5% 0 0 40%" }}>
                                    Add plant
                            </Button>
                        </Form>

                    </div>
                    </div>
                </div>
        )
    }
}

export default AddPlant