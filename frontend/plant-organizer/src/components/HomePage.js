import React from 'react'
import { Button, Card } from "react-bootstrap"
import { serviceConfig } from '../appSettings.js'
import '../css/HomePage.css'
import plant from '../icons/plant.svg'
import newicon from '../icons/new.svg'

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
                    <h1>div1</h1>
                    <button className="btnAddNew" onClick={this.changePath.bind(this,"add")} title="Add new plant">
                        <div className="iconsBtn">
                            <img src={plant} className="logo" style={{ height: '62px', width: 'auto', cursor: "pointer" }} alt='Unavailable icon' />
                            <img src={newicon} className="logo" style={{ height: '45px', width: 'auto',  cursor: "pointer" }} alt='Unavailable icon' />

                        </div>
                    
                    </button>
                </div>
                <div className="div2">
                    <h1>div2</h1>
                </div>
                <div className="div3">
                    <h1>div3</h1>
                </div>
            </div>
        )
    }
}

export default HomePage