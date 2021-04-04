import React from "react";
import Alert from 'react-bootstrap/Alert';
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard';
import RegionalDashboard from './Components/RegionalDashboard';
import Map from './Components/Map';
import ReactTooltip from "react-tooltip";
import Settings from './Components/Settings.js'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './main.css'; 
import "./styles.css";

import {ColourContext} from './Components/ColourContext'
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      mapData: [],
      content:'',
      regionalData: {
        name: 'Loading...',
        joy: 0,
        anger: 0,
        fear: 0,
        sadness: 0,
        confident: 0,
        analytical: 0,
        tentative: 0,
        trend1: 'Loading...',
        trend2: 'Loading...',
        trend3: 'Loading...',
        sample_size: 'Loading...'
      },

      dashboardData: {
        name: 'United Kingdom',
        joy: 0,
        anger: 0,
        fear: 0,
        sadness: 0,
        confident: 0,
        analytical: 0,
        tentative: 0,
        trend1: 'Loading...',
        trend2: 'Loading...',
        trend3: 'Loading...',
        trend4: 'Loading...',
        trend5: 'Loading...',
        happiest1: "Loading...",
        happiest2: "Loading...",
        happiest3: "Loading...",
        happiest4: "Loading...",
        happiest5: "Loading...",
        sample_size: "Loading..."
      },
      error: false, // notify server errors 
      modalClosed: false, // notify if intoduction modal is closed
    }

  }

  componentDidMount() {
    
    let fetchData = async () => {
      // fetch from "http://127.0.0.1:8020/api/recent" i.e. server
      const URL = "/api/recent"
      try {
        let result = await fetch(URL);
        if (!result.ok) {
          throw new Error(`HTTP error - status: ${result.status}`);
        }
        else{
          let json = await result.json();
          this.setState({
              mapData: json.anlysis,
              dashboardData : this.findRegionData(json.anlysis, "United Kingdom", true),
              error:false,
            });
        }
      } catch(error){
        console.log("Failed to fetch data from the server");
        // set error to true to display error alert
        this.setState({error:true})
      }
    }

    // Carry out an initial fetching of data before interval is set
    fetchData();

    // Fetch data from server every X milliseconds
    this.interval = setInterval(() => {
      console.log("Fetched new data")
      fetchData();
    }, 10000);
  }
  
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }

  // find JSON data relating to the specified region from the
  // data received from the server.
  // json - json array retrieved from json.anlysis from server
  // regionName - name of the region to search in the json array
  // forUK - boolean to alert if function is being used for the UK dashboard
  findRegionData = (json, regionName, forUK=false) => {
    // check if mapData has been assigned a value
    // if not, then that means data hasn't been fetched,
    // so return initial data template.
    if ((this.state.mapData) || forUK) {
      for(var i = 0; i < json.length; i++) {
        if(json[i].name === regionName){
          return json[i];
        }
        // If the city doesn't exist in the json data,
        // return the previous regionalData
        if(i===json.length-1){
          return this.state.regionalData;
        }
      }
    } else{
        return this.state.regionalData;
    }
  }

  // This method is passed into the map component as props
  // so that the child map component can change parent
  // app components state for the regional dashboard
  setCurrentRegion = (regionName) => {
    this.setState((prevState) => ({
      regionalData : this.findRegionData(prevState.mapData, regionName),
    }))
  }

  updateTooltip = (content) => {
    this.setState({content});
  }
  closeModal = () => {
    this.setState({modalClosed: true})
  }

  render(){

 

    return (
      
      <ColourContext.Consumer>
    {colours => (
      <div className="App">
        {this.state.error && <Alert variant="danger">Failed to fetch data from server</Alert>}
        {!this.state.modalClosed &&
        <div className="modal-container">
        <div className="intro-modal">
          <div className="modal-title">IBM Emotional Map</div>
          <div className="modal-text">
            <p>This product was made to show off the capabilities of the Watson Tone Analyser made by IBM.</p>
            <p>Click on a region in the map to see its current sentimental breakdown.</p>
          </div>
          <div className="close-button" onClick={() => this.closeModal()} onMouseEnter={this.style = {"color": "blue"}}>Close</div>
        </div>
        </div>
      }
        <div className="main-grid">
          
        <Router>
          
          <div className="header"><Navbar /></div>
          
        <Switch>
        <Route exact path="/">
        <div className="helper">
            <h3 style={{margin: ' auto auto'}}>Click on the Map!</h3>
          </div>
          <div className="map-container">
            <Map setTooltipContent={this.updateTooltip} mapData = {this.state.mapData} setCurrentRegion={this.setCurrentRegion} />
            <ReactTooltip>{this.state.content}</ReactTooltip>
          </div>
          
          <div className="regional-dashboard-container">
          {this.state.modalClosed &&
            <RegionalDashboard data={this.state.regionalData} colourCode={colours}/>
          }
          </div>
          <div className="main-dashboard">
            <div className="colour-key">
              <div className="coloured-colour-key" style={{"color": colours.Fear}}>
                <div className="coloured-circle" style={{"background": colours.Fear}}/>
                Fear
              </div>
              <div className="coloured-colour-key" style={{"color": colours.Confident}}>
                <div className="coloured-circle" style={{"background": colours.Confident}}/>
                  Confident
              </div>
              <div className="coloured-colour-key" style={{"color": colours.Anger}}>
                <div className="coloured-circle" style={{"background": colours.Anger}}/>
                  Anger
              </div>
              <div className="coloured-colour-key" style={{"color": colours.Joy}}>
                <div className="coloured-circle" style={{"background": colours.Joy}}/>
                  Joy
              </div>
              <div className="coloured-colour-key" style={{"color": colours.Sadness}}>
                <div className="coloured-circle" style={{"background": colours.Sadness}}/>
                  Sadness
              </div>
            </div>
            <Dashboard data={this.state.dashboardData} colourCode={colours}/>
          </div>
          </Route>
        <Route path="/settings">
          <Settings></Settings>
          </Route>
          </Switch>
        </Router>
        </div>
        
      </div>
    )
        }
        </ColourContext.Consumer>
        
    );
}
}

export default App;



