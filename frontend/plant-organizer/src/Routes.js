import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom"
import HomePage from './components/HomePage'
import Header from './components/Header'
import AddPlant from './components/AddPlant'

class Routes extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Switch>
                 <Route exact path='/' render={props =>
                    <div>
                        <Header />
                        <HomePage />
                    </div>
                    } />
                    <Route exact path='/add' render={props =>
                    <div>
                        <Header />
                        <AddPlant />
                    </div>
                    } />


            </Switch>
        )
    }
}

export default withRouter(Routes)