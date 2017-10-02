import React, { Component } from 'react';
import './Card.css';
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLabel } from 'victory';

class Card extends Component {
  constructor() {
    super();
  }

  formatTemp = (temp) => {
    return temp ? temp.toFixed(2) + '°C' : 'Unknown';
  }

  criticalClass = (temp) => {
    return Math.abs(temp) >= 40 ? "card critical-temp" : "card";
  }

  getData = (historical) => {
    return historical ? historical.map((temp, i) => {
      return {
        x: i - historical.length,
        y: temp
      }
    }) : [];
  };

  render() {
    const { average, name, temperature, historical } = this.props;
    return (
        <div className={this.criticalClass(temperature)}>
          <span className="card-header">
            <span className="card-title">
              <h3>{name}</h3>
            </span>
          </span>
          <span className="card-summary">
            Temperature: {this.formatTemp(temperature)}
          </span>
          <span className="card-meta">
            Average temp: {this.formatTemp(average)}
          </span>
          <VictoryChart>
            <VictoryArea
              domain={{x: [-10, 0], y: [-60, 60]}}
              data={this.getData(historical)}
              interpolation="natural"
              style={{ 
                parent: { border: "1px solid #ccc" },
                data: { fill: "#97BBCD", fillOpacity: 0.5, stroke: "#97BBCD", strokeWidth: 3 }
              }}
            />
            <VictoryAxis
              style={{ parent: { border: "1px solid #000" } }}
              orientation="bottom"
            />
            <VictoryAxis dependentAxis
              style={{ parent: { border: "1px solid #000" }, axisLabel: { fontSize: 18, padding: -30 } }}
              label="Temperature (°C)"
              padding={40}
            />
            
          </VictoryChart>
        </div>
    );
  }
}

export default Card;
