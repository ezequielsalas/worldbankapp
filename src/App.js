import React from 'react';
import './App.css';
import CountryDataContainer from './modules/countrydata/components/CountryDataContainer'




class App extends React.Component {

  render() {

    return (
      <div className="app-container">
        <div className="app-body">
          <CountryDataContainer/>
        </div>
      </div>
    );
  }
}

export default App;
