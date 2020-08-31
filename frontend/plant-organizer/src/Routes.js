import React from 'react'
import { Route, withRouter, Switch } from "react-router-dom"
import HomePage from './components/HomePage'
import Header from './components/Header'
import AddPlant from './components/AddPlant'
import PlantView from './components/PlantView'
import AdminProfile from './components/AdminProfile'
import UserProfile from './components/UserProfile'

class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                <Route path='/plant/:id' render={props =>
                    <div>
                        <Header />
                        <PlantView id={props.match.params.id} />
                    </div>
                } />
                <Route path='/profile/admin' render={props =>
                    <div>
                        <Header />
                        <AdminProfile />
                    </div>
                } />
                <Route path='/profile/:username' render={props =>
                    <div>
                        <Header />
                        <UserProfile username={props.match.params.username}/>
                    </div>
                } />


            </Switch>
        )
    }
}

export default withRouter(Routes)