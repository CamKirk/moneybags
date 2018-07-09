import React, { Component } from "react";
import "./App.css";
import Walkthrough from "./components/Walkthrough";
import AppNavbar from "./components/AppNavbar";
import PieGraph from "./components/PieGraph";
import LineGraph30day from "./components/LineGraph30day";
import { BrowserRouter as Router, Route } from "react-router-dom";
import dashboard from './Pages/dashboard';
import NavTabs from './components/NavTabs';
// import Baseline from './components/UserDashboard/Baseline';



class App extends Component {
render() {
return (
// <div className="App">
// <AppNavbar />
// <Walkthrough />
// <DataBody />
// </div>
<Router>
<div>
<NavTabs/>
<Route path="/" component={PieGraph} />
<Route path="/" component={LineGraph30day} />
<Route exact path="/" component={AppNavbar} />
<Route exact path="/" component={Walkthrough} />
<Route exact path="/dashboard" component={dashboard} />
{/* <Baseline/> */}


</div>
</Router>
);
}
}
export default App;


