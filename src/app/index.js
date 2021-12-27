import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { GroceriesList, GroceriesInsert, GroceriesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/groceries/list" exact component={GroceriesList} />
                <Route path="/groceries/create" exact component={GroceriesInsert} />
                <Route
                    path="/groceries/update/:id"
                    exact
                    component={GroceriesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App