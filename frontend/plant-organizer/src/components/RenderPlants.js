import React from 'react'
import { Button, Card, Pagination } from "react-bootstrap"
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

        this.state = {
            plants: [],
            totalPages: 0,
            pageNumber: 0,
            size: 8,
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

            axios.get(`${serviceConfig.baseURL}/plant?page=${this.state.pageNumber}&size=${this.state.size}`, options).then(
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


    render(){
        return(
            <div>
            <div className="renderAllPlants">
                {this.renderCards()}
                </div>
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