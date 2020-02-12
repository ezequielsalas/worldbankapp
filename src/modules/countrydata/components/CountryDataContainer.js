import React from 'react';
import '../css/countrydata.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LineChart} from 'react-chartkick';
import ToggleButton from './ToggleButton';
import {getCountryData, setCountryData, updateCountryData, loadDropDown} from "../actions";
import {connect} from "react-redux";
import "chart.js";
import EditableCountryTable from "./EditableCountryTable";

class CountryDataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isChartEnabled: false};
    }

    dataToggle = (state) => {
        this.setState({
            isChartEnabled: state
        });
    }

    componentDidMount = () => {
        this.refreshData()
        this.props.dispatch(loadDropDown());
    }

    refreshData = () => {
        this.props.dispatch(getCountryData());
    }

    transformCountryDataToChartDataSet = (data) =>
        data.reduce((acc, cur) => {
            const index = acc.findIndex(x => x.name === cur.country);
            if (index > -1) {
                acc[index].data = {...acc[index].data, ...{[cur.year]: cur.value}}
            } else {
                acc.push({name: cur.country, data: {[cur.year]: cur.value}})
            }
            return acc
        }, []);


    handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {

        setTimeout(() => {
            if (newValue === '' ) {
                return
            }
            const dataSet = data.map((row) => {
                if (row.id === rowId) {
                    const newRow = { ...row };
                    newRow[dataField] = newValue;
                    return newRow;
                }
                return row;
            });

            this.props.dispatch(updateCountryData(rowId,{[dataField]:newValue}))
            this.props.dispatch(setCountryData(dataSet));

        }, 500);
    }


    render() {

        let currentComponent = null;

        if (this.state.isChartEnabled) {

            let dataChart = this.transformCountryDataToChartDataSet(this.props.countryData);

            currentComponent = <LineChart thousands="," decimal="." data={dataChart}/>
        } else {
            let dataTable = [];

            this.props.countryData.map((data) =>
                dataTable.push({
                    id: data.id,
                    country: data.country,
                    indicator: data.indicator,
                    year: data.year,
                    value: data.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                })
            );

            currentComponent =  <EditableCountryTable dropdownData={this.props.dropdownData} data={ dataTable } onTableChange={ this.handleTableChange }/>
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
    countryData: state.countryData.countryDataList,
    dropdownData: state.countryData.dropdownData
});

export default connect(mapStateToProps)(CountryDataContainer);
