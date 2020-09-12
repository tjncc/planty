import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/PlantView.css'
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
            isLoggedIn: false,
            plant: []
        }
    }

    componentDidMount(){
        this.getRole();
        this.getPlant();
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
                            message: "Please log in.",
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

    getPlant() {

        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/plant/${this.props.id}`).then(
            (resp) => {
                this.setState({
                    plant: resp.data
                    
                })
                console.log(this.state)
                
            },
            (resp) => {
                store.addNotification({
                    title: "Error",
                    message: "Cannot load plant.",
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

    deletePlant(){
        
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.delete(`${serviceConfig.baseURL}/plant/${this.props.id}`, options).then(
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


    changePath(path){
            window.location.href=`http://localhost:3000/${path}`
    }


    render(){
        return(
            <div className="mainDivPlantView">
                <div className="div1PlantView">
                    <label className="plantName">{this.state.plant.name}</label>
                    <label className="plantFam">Family: {this.state.plant.family}</label>
                    <img src={this.state.plant.image} className="plantImg" />
                </div>

                <div className="div2PlantView">
                <label className="plantWater1">Watering:</label>
                <label className="plantWater">{this.state.plant.wateringTime}</label>
                <br />
                <label className="plantInfo1">More info:</label>
                <label className="plantInfo">{this.state.plant.info}</label>
                <br />
                <label className="plantInfo1">Creator:</label>
                <label className="plantInfo">{this.state.plant.creator}</label>
                </div>
                

                <div className="div3PlantView">
                {
                    this.state.user.role === "USER" &&
                    <button className="userLikeBtn">Add to my collection</button>
                }
                {
                    (this.state.user.role === "ADMIN" || this.state.user.username === this.state.plant.creator) &&
                    <button onClick={this.deletePlant.bind(this)} className="userLikeBtn">Delete</button>
                }
                </div>
            </div>
        )
    }
}

export default HomePage