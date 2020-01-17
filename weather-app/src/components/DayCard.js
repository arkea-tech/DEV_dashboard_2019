import React, { Component } from 'react';

class DayCard extends Component {
    render() {
        var moment = require('moment');
        let newDate = new Date();
        const weekday = this.props.reading.dt * 1000;
        newDate.setTime(weekday);
        const imgURL = `owf owf-${this.props.reading.weather[0].id} owf-5x`;
        const fahrenheit = Math.round(this.props.reading.main.temp);
        const celsius = Math.round((fahrenheit - 32) * 5/9);

        return (
            <div className="col-sm-2">
                <div className="card">
                    <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                    <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                    <i className={imgURL}></i>
                    <h2>{this.props.degreeType === "celsius" ? celsius + "°C" : fahrenheit + "°F"}</h2>
                    <div className="card-body">
                        <p className="card-text">{this.props.reading.weather[0].description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DayCard;
