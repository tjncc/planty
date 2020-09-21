import React from 'react'
import { Button, Card, Form } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/PlantView.css'
import plant from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import RenderPlants from './RenderPlants'
import axios from 'axios'
import { store } from 'react-notifications-component'
import heart from '../icons/heart.svg'
import btnheart from '../icons/likebtn.svg'
import heartbreak from '../icons/heartbreak.svg'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            user: [],
            isLoggedIn: false,
            plant: [],
            isLiked: false,
            likes: 0,
            editMode: false,

            wateringValues: [],

            name: '',
            family: '',
            wateringTime: '',
            info: '',
            image: '',

            file: '',
            notRemovedImage: true
        }
    }

    componentDidMount(){
        this.getRole();
        this.getPlant();
        this.checkPlant();
        if(this.state.editMode){
            this.getWateringTime();
        }
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
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
                    plant: resp.data,
                    likes: resp.data.likes,
                    
                    name: resp.data.name,
                    family: resp.data.family,
                    image: resp.data.image,
                    wateringTime: resp.data.wateringTime,
                    info: resp.data.info
                    
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

    checkPlant() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/plant/check/${this.props.id}`, options).then(
            (resp) => {
                this.setState({
                    isLiked: resp.data,               
                })
                console.log(this.state.isLiked)
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

    addToCollection() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/plant/like/${this.props.id}`, options).then(
            (resp) => {
                this.setState({
                    isLiked: true,
                    likes: this.state.likes + 1              
                })
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

    removeFromCollection() {
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`${serviceConfig.baseURL}/plant/dislike/${this.props.id}`, options).then(
            (resp) => {
                this.setState({
                    isLiked: false,
                    likes: this.state.likes - 1           
                })
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

    editPlant(){
        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        var newPlant = {
            name: this.state.name,
            family: this.state.family,
            image: this.state.image,
            wateringTime: this.state.wateringTime.toUpperCase(),
            info: this.state.info
        }
        console.log(newPlant)
        axios.put(`${serviceConfig.baseURL}/plant/${this.props.id}`, newPlant, options).then(
            (resp) => {
                this.setState({
                    plant: resp.data            
                })
                store.addNotification({
                    title: "Success!",
                    message: "Plant is edited.",
                    type: "success",
                    insert: "right",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 1900,
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
                    message: "Something gone wrong with editing plant.",
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

      removeImage(){
        this.setState({
            file: '',
            image: '',
            notRemovedImage: false,
          });
    }


    changePath(path){
            window.location.href=`http://localhost:3000/${path}`
    }


    render(){
        return(
            <div className="mainDivPlantView">
                {
                    !this.state.editMode &&
                    <div className="div1PlantView">
                    <label className="plantName">{this.state.plant.name}</label>
                    <label className="plantFam">Family: {this.state.plant.family}</label>
                    <img src={this.state.plant.image} className="plantImg" />
                </div>
                }
                {
                    this.state.editMode &&
                     <div className="div1PlantViewEdit">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" style={{background: "rgb(250, 255, 255)"}} defaultValue ={this.state.plant.name} id="name" name="name" onChange={this.handleChange}></Form.Control>
                    <Form.Label>Family: </Form.Label>
                    <Form.Control type="text" style={{background: "rgb(250, 255, 255)"}} defaultValue ={this.state.plant.family} id="family" name="family" onChange={this.handleChange}></Form.Control>
                    <br />
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
                                        <img className="uploadedImage" style={{width: '300px'}} src={this.state.image} />
                                        <button className="removeImageBtn" onClick={this.removeImage}>Remove image</button>
                                        </div>
                                    }
                                    {
                                        this.state.image === "" && this.state.notRemovedImage &&
                                        <div>
                                        <img className="uploadedImage" style={{width: '300px'}} src={this.state.plant.image} />
                                        <button className="removeImageBtn" onClick={this.removeImage}>Remove image</button>
                                        </div>
                                    }
                                    </div>
                </div>
                }   

                {
                    !this.state.editMode &&
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
                }
                {
                    this.state.editMode &&
                    <div className="div2PlantViewEdit">
                        <Form.Label>Watering: </Form.Label>
                        <Form.Control as="select" id="wateringTime" name="wateringTime" 
                                value={this.state.wateringTime}
                                onChange={this.handleChange} 
                                required
                                style={{width: '50%'}}>
                                    { this.state.wateringValues.map(opt => (<option>{ opt }</option>)) }
                        </Form.Control>
                        <Form.Label>Info: </Form.Label>
                        <Form.Control type="text"
                         className="formControlArea"
                         as="textarea" rows="8" 
                         style={{background: "rgb(250, 255, 255)"}} 
                         defaultValue ={this.state.plant.info} id="info" name="info" 
                         onChange={this.handleChange}></Form.Control>

                    </div>
                }
                
                

                <div className="div3PlantView">
                    <div>
                        <img src={heart} style={{width: "30px", margin: "2% 3% 4% 0"}} />
                        <label className="likeNum">{this.state.likes}</label>
                    </div>
                    
                {
                    this.state.user.role === "USER" && !this.state.isLiked && !this.state.editMode &&
                    <button className="userLikeBtn" onClick={this.addToCollection.bind(this)}>
                        <img src={btnheart} style={{width: "30px", margin: "0 3% 0 0"}} />
                        Add to my collection</button>
                }
                                {
                    this.state.user.role === "USER" && this.state.isLiked && !this.state.editMode &&
                    <button className="userLikeBtn" onClick={this.removeFromCollection.bind(this)}>
                         <img src={heartbreak} style={{width: "30px", margin: "0 3% 0 0"}} />
                        Remove</button>
                }
                {
                    this.state.user.username === this.state.plant.creator && !this.state.editMode &&
                    <button onClick={() => this.setState({ editMode: !this.state.editMode }, this.getWateringTime()) } className="userLikeBtn">Edit</button>
                }
                {
                    this.state.user.username === this.state.plant.creator && this.state.editMode &&
                    <div>
                    <button onClick={this.editPlant.bind(this)} className="userLikeBtn">Save</button>
                    <button onClick={() => this.setState({ editMode: !this.state.editMode }, this.getWateringTime()) } className="userLikeBtn">Cancel</button>
                    </div>
                }
                {
                    (this.state.user.role === "ADMIN" || this.state.user.username === this.state.plant.creator) && !this.state.editMode &&
                    <button onClick={this.deletePlant.bind(this)} className="userLikeBtn">Delete</button>
                }
                </div>
            </div>
        )
    }
}

export default HomePage