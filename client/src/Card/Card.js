import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    const { average, name, temperature } = this.props; 

    return (
      <a className="card" href="#">
        <span className="card-header">
          <span className="card-title">
            <h3>{name}</h3>
          </span>
        </span>
        <span className="card-summary">
          Temperature: {temperature}
        </span>
        <span className="card-meta">
          Average temp: {average}
        </span>
      </a>
    );
  }
}

export default Card;
