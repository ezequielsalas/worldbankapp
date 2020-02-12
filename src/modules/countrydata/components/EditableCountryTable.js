import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import React from "react";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class EditableCountryTable extends React.Component {


    render() {
        const countries = this.props.dropdownData.countries.map((country)=>{
           return {"value": country, "label": country}});

        const indicators = this.props.dropdownData.indicators.map((indicator)=>{
            return {"value": indicator, "label": indicator}});

        const columns = [{
            dataField: 'country',
            text: 'Country',
            filter: textFilter(),
            sort: true,
            editor: {
                type: "select",
                options: countries
        }}, {
            dataField: 'indicator',
            text: 'Indicator',
            filter: textFilter(),
            sort: true,
            editor: {
                type: "select",
                options: indicators
            }
        }, {
            dataField: 'year',
            text: 'Most Recent Year',
            filter: textFilter(),
            sort: true,
            validator: (newValue, row, column) => {
                if (isNaN(newValue.replace(/,/g,''))) {
                    return {
                        valid: false,
                        message: 'Year should be numeric'
                    };
                }
                if ( (parseInt(newValue) <= 1900) ||  (parseInt(newValue) > 2100)) {
                    return {
                        valid: false,
                        message: 'Year must be between 1900 and 2100'
                    };
                }
                return true;
            }
        }, {
            dataField: 'value',
            text: 'Most Recent Value',
            filter: textFilter(),
            sort: true,
            formatter: cell => `${cell}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            ,
            validator: (newValue, row, column) => {

            if (isNaN(newValue.replace(/,/g,''))) {
                return {
                    valid: false,
                    message: 'Value should be numeric'
                };
            }

            return true;
        }
        }];

        return (
            <div>
                <div className="table-note">Note: Change the texts by clicking and press enter to save.</div>
                <BootstrapTable
                    data={this.props.data}
                    cellEdit={cellEditFactory({
                        mode: 'click',
                        autoSelectText: true,
                        blurToSave: true
                    })}
                    onTableChange={this.props.onTableChange}
                    keyField='id'
                    columns={columns}
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    remote={{
                        cellEdit: true
                    }}
                />

            </div>
        );
    }
};

export default EditableCountryTable;