import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

  formatTemp = (temp) => {
    return temp ? temp.toFixed(2) + '°C' : 'Unknown';
  }

  criticalClass = (temp) => {
    return Math.abs(temp) >= 40 ? "card critical-temp" : "card";
  }

  pera = () => {
    const { cityId } = this.props;
    console.log('gradic id', cityId);
  }

  render() {
    const { average, name, temperature } = this.props;

    return (
      <div className={this.criticalClass(temperature)} onClick={this.pera}>
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
      </div>
    );
  }
}

export default Card;
