import React, { Component } from "react";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import moment from "moment";

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      minValue: null,
      maxValue: null,
      instruments: null,
    };

    this.handleApplyFilters = this.handleApplyFilters.bind(this);
  }

  componentDidMount() {
    const { firstDate, lastDate } = this.props;
    this.setState({
      startDate: moment(firstDate),
      endDate: moment(lastDate),
    });
  }

  handleApplyFilters(e) {
    e.preventDefault();
    this.props.onApply({ ...this.state });
  }

  render() {
    const { startDate, endDate } = this.state;
    const { instruments } = this.props;

    return (
      <div className="filters floating-effect">
        <h2>Filters:</h2>
        <div className="col-sm-12">
          <form name="filters">
            <div className="form-group row">
              <div className="col-6">
                <label>Start Date</label>
                <DatePicker
                  name="startData"
                  className="form-control form-control-sm"
                  selected={startDate}
                  onChange={date => this.setState({ startDate: date })}
                  maxDate={endDate}
                  autoComplete="no"
                />
              </div>
              <div className="col-6">
                <label>End Date</label>
                <DatePicker
                  name="endDate"
                  className="form-control form-control-sm"
                  selected={endDate}
                  onChange={date => this.setState({ endDate: date })}
                  autoComplete="no"
                  minDate={startDate}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-6">
                <label>Min. Value</label>
                <input
                  type="nunmber"
                  className="form-control form-control-sm"
                  autoComplete="no"
                  placeholder="ie: 85.4"
                  onChange={e => 
                    this.setState({
                      minValue: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-6">
                <label>Max. Value</label>
                <input
                  type="nunmber"
                  className="form-control form-control-sm"
                  autoComplete="no"
                  placeholder="ie: 105.2"
                  onChange={e => 
                    this.setState({
                      maxValue: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Instruments</label>
              <select
                className="form-control"
                multiple
                onChange={e => {
                  const options = e.target.options;
                  const value = [];
                  for (let i = 0, l = options.length; i < l; i++) {
                    if (options[i].selected) {
                      value.push(options[i].value);
                    }
                  }
                  this.setState({
                    instruments: value,
                  });
                }}
              >
                { instruments.map(instrument => (
                  <option key={instrument} value={instrument}>
                    Intrument #{instrument}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <button
                onClick={this.handleApplyFilters}
                className="btn btn-secondary btn-block"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  firstDate: PropTypes.object,
  lastDate: PropTypes.object,
  onApply: PropTypes.func.isRequired,
  instruments: PropTypes.array.isRequired,
};
Filters.defaultProps = {
  firstDate: null,
  lastDate: null,
};
export default Filters;