import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Card from './Card/Card';

const appConfig = {
  api: '//localhost:3000/api/city/all'
}

class App extends Component {
  //todo: get data :)
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  boraDrljaca = () => {
    fetch(appConfig.api).then(data => data.json()).then((data) => {
      this.setState({ data });
    }).catch(error => console.log('Boro erorodrljo', error));
    setTimeout(this.boraDrljaca, 6000);
  }

  componentWillMount() {
    this.boraDrljaca();
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div className="cards">
            { 
              data.map((city, i) => {
                const { id, averageTemperature, currentTemperature, name } = city;
                return <Card
                  key={ id }
                  cityId={ id }
                  average={ averageTemperature }
                  name={ name }
                  temperature={ currentTemperature }
                />
              }) 
            }
        </div>
      </div>
    );
  }
}

export default App;