import React from 'react';
import '../css/countrydata.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {LineChart} from 'react-chartkick';

import ToggleButton from './ToggleButton';
import {getCountryData} from "../actions";
import {connect} from "react-redux";
import "chart.js"

class CountryDataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isChartEnabled: false};
        this.dataToggle = this.dataToggle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.getMapFromArray = this.getMapFromArray.bind(this);
    }

    dataToggle(state) {
        this.setState({
            isChartEnabled: state
        });
        //this.refreshData();
    }

    componentDidMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.dispatch(getCountryData());
    }


    getMapFromArray = (data) =>
        data.reduce((acc, cur) => {
            const index = acc.findIndex(x => x.name === cur.country.name);
            if (index > -1) {
                acc[index].data = {...acc[index].data, ...{[cur.year]: cur.value}}
            } else {
                acc.push({name: cur.country.name, data: {[cur.year]: cur.value}})
            }
            return acc
        }, []);


    render() {


        const columns = [{
            dataField: 'country',
            text: 'Country',
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'indicator',
            text: 'Indicator',
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'year',
            text: 'Most Recent Year',
            filter: textFilter(),
            sort: true
        }, {
            dataField: 'value',
            text: 'Most Recent Value',
            filter: textFilter(),
            sort: true
        }];


        let currentComponent = null;

        if (this.state.isChartEnabled) {

            let dataChart = this.getMapFromArray(this.props.countryData);

            currentComponent = <LineChart thousands="," decimal="." data={dataChart}/>
        } else {
            let dataTable = [];

            this.props.countryData.map((data) =>
                dataTable.push({
                    id: data.id,
                    country: data.country.name,
                    indicator: data.indicator.name,
                    year: data.year,
                    value: data.value
                })
            );
            currentComponent = <BootstrapTable
                bordered={false}
                keyField='id'
                data={dataTable}
                columns={columns}
                pagination={paginationFactory()}
                filter={filterFactory()}/>
        }

        return (
            <div className="data-container">

                <h1>The world’s most populous countries</h1>

                <div className="data-button-bar"><ToggleButton customEvent={this.dataToggle}/></div>
                <div className="data-content">
                    {currentComponent}
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    countryData: state.countryData.countryDataList
});

export default connect(mapStateToProps)(CountryDataContainer);
