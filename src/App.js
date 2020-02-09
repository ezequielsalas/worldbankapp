import React from 'react';
import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.customEvent !== undefined) {
      this.props.customEvent();
    }
  }

  render() {
    return (
      <div>
        <label>Data</label>
        <div className="switch">
          <label>
            <input type="checkbox" onChange={this.handleClick} />
            <span className="slider round" />
          </label>
        </div>
        <label>Charts</label>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 0, value1: 431, value2: 981},
        {id: 1, value1: 432, value2: 982},
        {id: 2, value1: 433, value2: 983},
        {id: 3, value1: 434, value2: 984},
        {id: 4, value1: 435, value2: 985},
        {id: 5, value1: 436, value2: 986},
        {id: 6, value1: 437, value2: 987},
        {id: 7, value1: 438, value2: 988},
        {id: 8, value1: 439, value2: 989}
      ]
    };
    this.dataToggle = this.dataToggle.bind(this);
  }

  dataToggle() {
    console.log('Esto');
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Country',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'value1',
      text: 'Most Recent Year',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'value2',
      text: 'Most Recent Value',
      filter: textFilter(),
      sort: true
    }];

    return (
      <div className="app-container">
        <div className="app-body">
          <h1>The world’s most populous countries</h1>

          <div className="app-button-bar"><ToggleButton customEvent={this.dataToggle} /></div>
          <div className="app-data-container">
            <BootstrapTable
              bordered={false}
              keyField='id'
              data={this.state.data}
              columns={columns}
              pagination={ paginationFactory() }
              filter={ filterFactory()}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
