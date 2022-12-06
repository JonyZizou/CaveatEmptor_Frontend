import './App.css';
import React, {Component} from 'react';
import { Grid, Typography } from '@mui/material';

import ModifierInfo from './ModifierInfo';

class ContractInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomedContract: -1
    }
  }

  setZoomedContract = x => {
    if (x !== this.state.zoomedContract)
      this.setState({zoomedContract: x})
    else
      this.setState({zoomedContract: -1})  
  }

  render() {
    return <>
      <Typography variant="h4">Contract: {this.props.contract.name} {
        this.props.contract.main ? <>(Main Contract)</> : <>(Detected {(100 * this.props.contract.percent_seen).toFixed(0)}%)</>
      }</Typography>
      <Grid container spacing={1}>
        {
          this.props.contract.modifiers.map((x, i) => <>
            <Grid item xs={this.props.zoomedContract === i ? 12 : 4}>
              <ModifierInfo key={i} contractId={`mod-${i}`} modifier={x} setZoomedContract={this.setZoomedContract}/>
            </Grid>
          </>)
        }
      </Grid>
    </>
  }
}

export default ContractInfo;