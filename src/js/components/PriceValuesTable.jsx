import React, { Component } from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class PriceValuesTable extends Component {
  constructor() {
    super();
  }

  render() {
    const { data } = this.props;
    const tableOptions = {
      page: 1,
      sizePerPageList: [
        { text: '20', value: 20 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },
        { text: '200', value: 200 },
        { text: 'All', value: data.length },
      ],
      sizePerPage: 20,
    };

    return (
      <BootstrapTable
        data={data}
        pagination
        options={ tableOptions }
        striped
        hover
      >
        <TableHeaderColumn
          isKey={true}
          dataField="date"
          dataFormat={(cell) => moment.unix(cell/1000).format('ll')}
          dataSort
        >
          Date
        </TableHeaderColumn>
        { data[0] && Object.keys(data[0]).map((value) => (
           data[0][value].name && <TableHeaderColumn
            key={value}
            dataSort
            dataField={value}
            dataFormat={cell => cell ? cell.value : '-'}
          >
            {data[0][value].name} value
          </TableHeaderColumn>
        ))
      }

    </BootstrapTable>
    );
  }
}

PriceValuesTable.propTypes = {
  data: PropTypes.array,
};
PriceValuesTable.defaultProps = {
  data: null,
};
export default PriceValuesTable;