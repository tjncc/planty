import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/RenderPlants.css'
import planticon from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import axios from 'axios'

class RenderPlants extends React.Component {
    constructor(props) {
        super(props);

        this.renderCards = this.renderCards.bind(this);

        this.state = {
            plants: [],

        }
    }

    componentDidMount(){
        this.getAllPlants();
    }

    getAllPlants(){
        let token = localStorage.getItem('token');
        let self = this;

        if(token !== null){
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            axios.get(`${serviceConfig.baseURL}/plant`, options).then(
                    (response) => { 
                        this.setState({ plants: response.data });
                    },
                    (response) => {alert('Error while loading plants.')}
            );
        }
    }

    renderCards(){
        return this.state.plants.map((plant, index) => {
            

            return(
                <div className="cardDiv">
                    <Card key={plant.id} className="cardContainerAll" >

                    <Card.Img variant="top" src={plant.image} />
                    {
                        plant.image === "" &&
                        <Card.Img variant="top" style={{padding: '80px', backgroundColor: 'rgb(244, 250, 249)'}} src={planticon} /> 
                    }
                    <Card.Body className = "cardBodyAll">

                        <Card.Title className="cardTitle"> {plant.name}
                        <br/>
                        Family: {plant.family}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
            )
            
            
        })    
    }


    render(){
        return(
            <div className="renderAllPlants">
                {this.renderCards()}
            </div>
        )
    }
}

export default RenderPlants