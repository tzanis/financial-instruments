import React, { Component } from "react";
import PropTypes from 'prop-types';
import Highcharts from 'Highcharts';
import ReactHighcharts from 'react-highcharts/ReactHighstock';


class ChartComponent extends Component {
  constructor() {
    super();
  }

  render() {
    const { data } = this.props;

    const config = {
      chart: {
        height: 450,
      },
      rangeSelector: {
        inputEnabled: false,
        buttonTheme: {
          visibility: 'hidden',
        },
        labelStyle: {
          visibility: 'hidden',
        }
      },
      turboThreshold: 0,
      series: data,
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 200
      },
      yAxis: {
        title: {
          text: 'Value',
        },
      },
    }

    return (
      <div className="floating-effect">
        <ReactHighcharts
          highcharts={Highcharts}
          constructorType={'stockChart'}
          config={config}
        />
      </div>
    );
  }
}

ChartComponent.propTypes = {
  data: PropTypes.array,
};
ChartComponent.defaultProps = {
  data: null,
};
export default ChartComponent;