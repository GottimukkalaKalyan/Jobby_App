import {Switch, Route, Redirect} from 'react-router-dom'

import Authorization from './components/Authenticate'

import Home from './components/Home'
import Login from './components/LoginPage'
import Jobs from './components/JobsPage'
import JobFullDeatils from './components/JobFullDeails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Authorization exact path="/" component={Home} />
    <Authorization exact path="/jobs" component={Jobs} />
    <Authorization exact path="/jobs/:id" component={JobFullDeatils} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
