import React, {Component} from 'react';
import axios from 'axios';

export default class WeatherDisplay extends Component{

    state = {
        data :{},
    };
    componentDidMount() {
        axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=9869d9ecde764babd2adf4150d94f862`)
            .then(res => {
                const data = res.data;
                this.setState({data});
                console.log(this.state)
            })
    }

    render(){
        const d = new Date();

        if(this.state.data.weather === undefined){
            return (
                <div>
                    <h1>Today's Weather</h1>
                    <p>{ d.toDateString()}</p>
                    <p>Loading...</p>
                </div>
            )
        }
        else{
            let temp = Math.round(this.state.data.main.temp);
            let iconCode = this.state.data.weather[0].icon;
            let iconLink = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            let description = this.state.data.weather[0].description;

            return (
                <div className="container d-flex justify-content-center">
                    <div className="weather">
                        <div className="card">
                            <span className="icon">
                                <img alt="Weather Icon" className="img-fluid" src={iconLink}/>
                            </span>
                            <div className="title">
                                <h3>{this.state.data.name} Weather</h3>
                            </div>
                            <div className="temp">{temp}<sup>&deg;C</sup></div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="header">Date</div>
                                    <div className="value">{d.toDateString()}</div>
                                </div>
                                <div className="col-6">
                                    <div className="header">Description</div>
                                    <div className="value">{description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}
