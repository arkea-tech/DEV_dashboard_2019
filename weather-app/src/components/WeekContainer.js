import React from 'react';

import DayCard from './DayCard'
import Widget from './Widget'
import DegreeToggle from './DegreeToggle'

//import '../styles/WeekContainer.css'
//import APIConfig from './APIKeys';

class WeekContainer extends React.Component {

    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }

    componentDidMount() {
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=c4baff6330c90bb6acacd0bce0f41235`;

        fetch(weatherURL).then(res => res.json())
        .then(dataJson => {
            const dailyData = dataJson.list.filter(reading =>
            reading.dt_txt.includes("18:00:00"));
            this.setState({
                fullData: dataJson.list,
                dailyData: dailyData
            }, () => console.log(this.state));
        });
    }

    updateForecastDegree = event => {
        this.setState({
          degreeType: event.target.id
        }, () => console.log(this.state));
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType}/>)
    }

    callDegreeToggle = () => {
        return (<DegreeToggle degreType={this.state.degreeType}
        updateForecastDegree = {this.updateForecastDegree}/>)
    }

    render() {
        return (
                <div className="WeekContainer">
                    <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
                    <h5 className="display-5 text-muted">New York, US</h5>
                    {this.callDegreeToggle()}
                    <div className="row justify-content-center">
                        {this.formatDayCards()}
                    </div>
                </div>
        )
    }
}

export default WeekContainer;
