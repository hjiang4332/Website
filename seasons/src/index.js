import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: ''};

    componentDidMount(){    //called one time - initial data loading
        //console.log('My component was rendered ot the screen');
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            //err => console.log(err) //failure callback - if user declines
            err => this.setState({errorMessage: err.message})
        )
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }
        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>
        }
        return (
            <div><Spinner message="Please accept location request"/></div>
        )
    }
    //have to define render
    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

this.setState({time: new Date().toLocaleTimeString()})