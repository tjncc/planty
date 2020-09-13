import React from 'react'
import { Button, Card, Form, Pagination } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/RenderPlants.css'
import planticon from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import axios from 'axios'
import { store } from 'react-notifications-component'

class RenderPlants extends React.Component {
    constructor(props) {
        super(props);

        this.renderCards = this.renderCards.bind(this);
        this.renderCardsRequests = this.renderCardsRequests.bind(this);

        this.state = {
            plants: [],
            requests: [],
            totalPages: 0,
            pageNumber: 0,
            size: 8,
            search: '',
        }
    }

    componentDidMount(){

        this.getAllPlants();
    }

    getAllPlants(){
        let token = localStorage.getItem('token');
        let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            var sizePage = 6;

            if(this.props.content === "COLLECTION"){
                var urlPath = `${serviceConfig.baseURL}/plant/liked?page=${this.state.pageNumber}&size=${sizePage}&search=${this.state.search}`
            }
            else if (this.props.content === "MYPLANTS"){
                var urlPath = `${serviceConfig.baseURL}/plant/my?page=${this.state.pageNumber}&size=${sizePage}&search=${this.state.search}`
            }
            else if (this.props.content === "MYREQUESTS"){
                this.getAllRequests();
                return;
            }
            else {
                var urlPath = `${serviceConfig.baseURL}/plant?page=${this.state.pageNumber}&size=${this.state.size}&search=${this.state.search}`
            } 

            axios.get(urlPath, options).then(
                    (response) => { 
                        this.setState({ 
                            plants: response.data.content,
                            totalPages: response.data.totalPages,
                            pageNumber: response.data.pageable.pageNumber 
                        });
                    },
                    (response) => {
                        store.addNotification({
                            title: "Error",
                            message: "Something gone wrong while loading plants!",
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


    getAllRequests(){
        let token = localStorage.getItem('token');
        let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };

            var sizePage = 4;

            axios.get(`${serviceConfig.baseURL}/plantrequest/my?page=${this.state.pageNumber}&size=${sizePage}`, options).then(
                    (response) => { 
                        console.log(response.data)
                        this.setState({ 
                            requests: response.data.content,
                            totalPages: response.data.totalPages,
                            pageNumber: response.data.pageable.pageNumber 
                        });
                    },
                    (response) => {
                        store.addNotification({
                            title: "Error",
                            message: "Something gone wrong while loading requests!",
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

    changePage(e, num){
        if(num > this.state.totalPages - 1 || num < 0 || num === this.state.pageNumber)
            return
 
        this.setState({pageNumber: num}, this.getAllPlants);

    }

    renderPagination(){
        let paginationElements = [];

        for (let index = 0; index < this.state.totalPages; index++) {
            if(index === this.state.pageNumber)
                paginationElements.push(<Pagination.Item key={index} active>{index+1}</Pagination.Item>)
            else
                paginationElements.push(<Pagination.Item key={index} onClick={(e) => this.changePage(e, index)}>{index+1}</Pagination.Item>)
                      
        }

        return paginationElements;
    }


    view(id){
        window.location.href= `http://localhost:3000/plant/${id}`
    }

    renderCards(){
        if(this.state.plants.length > 0){
        return this.state.plants.map((plant, index) => {
            

            return(
                <div className="cardDiv">
                    <Card key={plant.id} onClick={this.view.bind(this,plant.id)} className="cardContainerAll" >

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
    }

    renderCardsRequests(){
        if(this.state.requests.length > 0){
            return this.state.requests.map((plant, index) => {

                return(
                    <div className="cardDivRequests">
                        <Card key={plant.id} className="cardContainerAllReqs" >
                            <Card.Title className="cardHeaderReqs" style={{fontSize: "27px", padding: "2% 0"}}>{plant.name}</Card.Title>
    
                            <Card.Body className = "cardBodyAllReqs">
    
                                <div className="cardBodyMaindiv">
                                    <div className="cardBody1div">
                                    <label style={{color: "rgb(176,47,99)"}}>Request status:</label>
                                        <label>Family:</label>
                                        <label>Watering time:</label>
                                        <label>Info:</label>
                                    </div>
                                    <div className="cardBody2div">
                                    <label style={{color: "rgb(176,47,99)"}}>{plant.requestStatus}</label>
                                        <label>{plant.family}</label>
                                        <label>{plant.wateringTime}</label>
                                        <label>{plant.info}</label>
                                    </div>
    
                                </div>
    
                            </Card.Body>
                            <Card.Img variant="bottom"  style={{maxHeight: "200px", maxWidth: "200px", margin: "2% auto"}} src={plant.image} />
                            {
                                plant.image === "" &&
                                <Card.Img variant="bottom" style={{padding: '80px', backgroundColor: 'rgb(244, 250, 249)'}} src={planticon} /> 
                            }
    
                    </Card>
                </div>
                )
                
                
            }) 
    }   
    }

    search(e){
        this.state.search = e.target.value; 
        this.forceUpdate();
        this.getAllPlants();
    }


    render(){
        return(
            <div>
                <div>
                    {
                        this.props.content !== "MYREQUESTS" &&
                        <Form.Control 
                        name="search"
                        placeholder="Search by name or family"
                        style={{width: "50%", margin: "2% auto 0 auto", border: "1px solid rgb(106,148,158)"}}
                        onChange={this.search.bind(this)}
                        ></Form.Control>
                    }
                    
                </div>
                {
                    this.props.content === "MYREQUESTS" &&
                    <div className="renderAllPlants">
                    {this.renderCardsRequests()}
                    </div>
                }
                {
                    this.props.content !== "MYREQUESTS" &&
                    <div className="renderAllPlants">
                    {this.renderCards()}
                    </div>
                }
                <div>
                <Pagination className="paginationPlants">
                    <Pagination.First onClick={(e) => this.changePage(e, 0)}/>
                    <Pagination.Prev onClick={(e) => this.changePage(e, this.state.pageNumber - 1)}/>
                        {this.renderPagination()}
                    <Pagination.Next  onClick={(e) => this.changePage(e, this.state.pageNumber + 1)}/>
                    <Pagination.Last  onClick={(e) => this.changePage(e, this.state.totalPages - 1)}/>
                </Pagination>
            </div>
            </div>
        )
    }
}

export default RenderPlants