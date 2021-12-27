import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { 
  GroceriesList, 
  GroceriesInsert, 
  GroceriesUpdate, 
  NotFound
} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/groceries/list" exact element={<GroceriesList/>} />
                <Route path="/groceries/create" exact element={<GroceriesInsert/>} />
                <Route
                    path="/groceries/update/:id"
                    exact
                    element={<GroceriesUpdate/>}
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App