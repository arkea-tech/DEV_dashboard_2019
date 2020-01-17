import React, { Component } from 'react';

class DegreeToggle extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="form-check form-check-inline">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="degree-type"
                    id="celsius"
                    value="metric"
                    onChange={this.props.updateForecastDegree}
                    />
                    <label class="form-check-label" for="celsius">Celsius</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="degree-type"
                    id="farenheit"
                    value="imperial"
                    onChange={this.props.updateForecastDegree}
                    />
                    <label class="form-check-label" for="farenheit">Farenheit</label>
                </div>
            </React.Fragment>
        )
    }
}

export default DegreeToggle;
