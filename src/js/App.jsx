import React, { Component } from "react";
import moment from 'moment';

import data from './constants/data.js';
import ChartContainer from "./components/ChartComponent.jsx";
import Filters from './components/Filters.jsx';
import PriceValuesTable from './components/PriceValuesTable.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      priceSeries: null,
      activeFilters: {
        startDate: null,
        endDate: null,
        maxValue: null,
        minValue: null,
        instruments: null,
      },
    };

    this.generateTableData = this.generateTableData.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.normalizeAndApplyFilters = this.normalizeAndApplyFilters.bind(this);
  }

  componentDidMount() {
    this.normalizeAndApplyFilters();
  }

  setFilters(filters) {
    this.setState({
      priceSeries: null,
      activeFilters: {
        ...this.state.activeFilters,
        ...filters
      },
    }, () => {
      this.normalizeAndApplyFilters();
    });
  }

  normalizeAndApplyFilters() {
    const {
      startDate,
      endDate,
      minValue,
      maxValue,
      instruments: selectedInstruments,
    } = this.state.activeFilters;
    const normalizeValues = (data) => {
      const baseValue = data[0] ? data[0][1] : 0;
      const noramalized = [];
      data.forEach((entry) => {
        const normalizedValue = ( entry[1] / baseValue ) * 100;

        // Check if value in filter range
        if (
          (!minValue || normalizedValue >= minValue)
          && (!maxValue || normalizedValue <= maxValue)
        ) {
          noramalized.push([entry[0], normalizedValue]);
        }
      });

      return noramalized;
    }

    const series = [];

    data.mktData.forEach((instrument) => {
      const _data = [];

      // Filter data
      instrument.timeSeries.entries.forEach(({d, v}) => {
        if (
          // Filter by date
          (!startDate || moment(d) >= startDate)
          && (!endDate || moment(d) <= endDate)
        ) {
          _data.push([moment(d).valueOf(), v]);
        }
      });

      const _instrument = {
        name: `Instrument #${instrument.instrumentId}`,
        data: _data && normalizeValues(_data),
      };

      if (
        !selectedInstruments
        || selectedInstruments.length === 0
        || selectedInstruments.indexOf(instrument.instrumentId.toString()) > -1
      ) {
        series.push(_instrument);
      }
    });

  
    this.setState({
      priceSeries: series,
    });
  }

  generateTableData() {
    const { priceSeries } = this.state;
    const _data = {};
    priceSeries && priceSeries.forEach((series, idx) => {
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

  render() {
    const { priceSeries } = this.state;
    const firstDate =  moment(data.mktData[0].timeSeries.entries[0].d);
    const lastDate =  moment(data.mktData[0].timeSeries.entries[data.mktData[0].timeSeries.entries.length - 1].d);

    return (
      <div className="container">
        <h1>Demo App: Financial Instruments</h1>

        <div className="row gutter-top">
          <div className="filters-container col-sm-12 col-md-4 col-lg-3">
            <Filters
              onApply={this.setFilters}
              firstDate={firstDate}
              lastDate={lastDate}
              instruments={data.mktData.map(instrument => instrument.instrumentId)}
            />
          </div>

          <div className="col-sm-12 col-md-8 col-lg-9">
            <ChartContainer data={priceSeries} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            { priceSeries && 
              <PriceValuesTable data={this.generateTableData()} />
            }
          </div>
        </div>
      </div>
    );
  }
}
export default App;