import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const PriceValuesTable = ({ data }) => {
   /**
   * Generates data stracture in order to be passed to table component.
   *
   * @returns {Array} Table data
   */
  const generateTableData = () => {
    const _data = {};
    data && data.forEach((series, idx) => {
      series && series.data.forEach(sdata => {
        if (!sdata) {
          return;
        }

        if (sdata && typeof _data[sdata[0]] === 'undefined') {
          _data[sdata[0]] = {};
        }

        _data[sdata[0]][idx] = {
          name: series.name,
          value: sdata[1],
        };
      });
    });

    const _arrayData = Object.keys(_data).map(date => ({ date, ..._data[date]}) );
    return _arrayData;
  }

  const generatedTableData = generateTableData();
  const tableOptions = {
    page: 1,
    sizePerPageList: [
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
      { text: '200', value: 200 },
      { text: 'All', value: generatedTableData.length },
    ],
    sizePerPage: 20,
  };

  return (
    <BootstrapTable
      data={generateTableData()}
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

      { generatedTableData[0] && Object.keys(generatedTableData[0]).map((value) => (
         generatedTableData[0][value].name && <TableHeaderColumn
          key={value}
          dataSort
          dataField={value}
          dataFormat={cell => cell ? cell.value : '-'}
        >
          {generatedTableData[0][value].name} value
        </TableHeaderColumn>
      ))}
    </BootstrapTable>
  );
};

PriceValuesTable.propTypes = {
  data: PropTypes.array,
};
PriceValuesTable.defaultProps = {
  data: null,
};
export default PriceValuesTable;