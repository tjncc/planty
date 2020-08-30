import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/HomePage.css'
import plant from '../icons/flower.svg'
import newicon from '../icons/new.svg'
import RenderPlants from './RenderPlants'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    changePath(path){
        window.location.href=`http://localhost:3000/${path}`

    }


    render(){
        return(
            <div className="mainDiv">
                <div className="div1">
                    <button className="btnAddNew" onClick={this.changePath.bind(this,"add")}>
                    Add new plant
                    </button>
                </div>
                <div className="div2">
                    <RenderPlants />
                </div>
            </div>
        )
    }
}

export default HomePage