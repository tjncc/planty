import React from 'react'
import { Button, Card, Pagination } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/RenderPlantRequests.css'
import planticon from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import axios from 'axios'

class RenderPlantRequests extends React.Component {
    constructor(props) {
        super(props);

        this.renderCards = this.renderCards.bind(this);

        this.state = {
            requests: [],
            totalPages: 0,
            pageNumber: 0,
            size: 6,
        }
    }

    componentDidMount(){
        this.getAllRequests();
    }

    getAllRequests(){
        let token = localStorage.getItem('token');
        let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };
            console.log(this.props.content)
            axios.get(`${serviceConfig.baseURL}/plantrequest?page=${this.state.pageNumber}&size=${this.state.size}&status=${this.props.content}`, options).then(
                    (response) => { 
                        this.setState({ 
                            requests: response.data.content,
                            totalPages: response.data.totalPages,
                            pageNumber: response.data.pageable.pageNumber 
                        });
                        console.log(response.data)
                    },
                    (response) => {alert('Error while loading requests.')}
            );
        
    }

    acceptRequest(reqId){
        let token = localStorage.getItem('token');
        let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };
            var request = { reqId: reqId }
            console.log(request)
            axios.post(`${serviceConfig.baseURL}/plantrequest/accept`, request, options).then(
                    (response) => { 
                        alert('Accepted!')
                    },
                    (response) => {alert('Error while accepting request.')}
            );

    }

    declineRequest(reqId){
        let token = localStorage.getItem('token');
        let self = this;
  
            const options = {
                headers: { 'Authorization': 'Bearer ' + token}
            };
            var request = { reqId: reqId }

            axios.post(`${serviceConfig.baseURL}/plantrequest/decline`, request, options).then(
                    (response) => { 
                        alert('Accepted!')
                    },
                    (response) => {alert('Error while accepting request.')}
            );

    }

    changePage(e, num){
        if(num > this.state.totalPages - 1 || num < 0 || num === this.state.pageNumber)
            return
 
        this.setState({pageNumber: num}, this.getAllRequests);

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


    renderCards(){
        if(this.state.requests.length > 0){
        return this.state.requests.map((plant, index) => {
            

            return(
                <div className="cardDivRequests">
                    <Card key={plant.id} className="cardContainerAllReqs" >
                        <Card.Title className="cardHeaderReqs" style={{fontSize: "27px", padding: "2% 0"}}>{plant.name}</Card.Title>

                        <Card.Body className = "cardBodyAllReqs">

                            <div className="cardBodyMaindiv">
                                <div className="cardBody1div">
                                    <label>Family:</label>
                                    <label>Watering time:</label>
                                    <label>Info:</label>
                                </div>
                                <div className="cardBody2div">
                                    <label>{plant.family}</label>
                                    <label>{plant.wateringTime}</label>
                                    <label>{plant.info}</label>
                                </div>

                            </div>

                        </Card.Body>
                        {
                            this.props.content === "PENDING" &&
                        <Card.Footer style={{padding: "2.6% 10%", backgroundColor: "rgb(231, 243, 241)", border: "none"}}>
                            <Button variant="outline-success" onClick={this.acceptRequest.bind(this,plant.id)} style={{float: "left", fontSize:"22px"}}>Accept</Button>
                            <Button variant="outline-dark" onClick={this.declineRequest.bind(this,plant.id)} style={{float: "right", fontSize:"22px"}}>Decline</Button>
                        </Card.Footer>
                        }
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


    render(){
        return(
            <div>
            <div className="renderAllReqs">
                {this.renderCards()}
                </div>
                <div>
                <Pagination className="paginationReqs">
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

export default RenderPlantRequests