import React, {Component} from 'react';
import ShotChart from "./ShotChart";
import CounterSlider from "./CounterSlider"
import _ from "lodash";
import {Radio, Row, Col, Switch, Icon} from 'antd';

class DataViewContainer extends Component {

  state = {
    minCount: 2,
    chartType: 'hexbin',
    displayTooltip: true
  }

  onCounterSliderChange = (data) => {
    console.log(data);
    this.setState({
      minCount: data
    })
  }

  onChangeChartType = e => {
    console.log(e.target);
    this.setState({
      chartType: e.target.value,
    });
  };

  onToolTipChange = (value) => {
    console.log(value);
    this.setState({
      displayTooltip: value
    })
  }

  render() {
    return (
      <div className='data-view'>
        <ShotChart playerId={this.props.playerId}
                   minCount={this.state.minCount}
                   chartType={this.state.chartType}
                   displayTooltip={this.state.displayTooltip}

        />
        <div className='filter'>
          {this.state.chartType === "hexbin" ?
            <CounterSlider value={this.state.minCount}
                           onCounterSliderChange={_.debounce(this.onCounterSliderChange, 500)}/>
                           : null}

          <br/>
          <Row>
            <Col span={9}>
              <Radio.Group onChange={this.onChangeChartType} value={this.state.chartType}>
                <Radio value='hexbin'>Hexbin</Radio>
                <Radio value='scatter'>Scatter</Radio>
              </Radio.Group>
            </Col>
            <Col span={4}>
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                onChange={this.onToolTipChange}
                defaultChecked />
            </Col>

          </Row>

        </div>
      </div>
    );
  }
}

export default DataViewContainer;