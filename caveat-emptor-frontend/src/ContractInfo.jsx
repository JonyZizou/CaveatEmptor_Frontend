import './App.css';
import React, {Component} from 'react';
import { Grid, Typography } from '@mui/material';

import ModifierInfo from './ModifierInfo';

class ContractInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contract: props.contract,
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
      <Typography variant="h4">Contract: {this.state.contract.name} {
        this.state.contract.main ? <>(Main Contract)</> : <>(Seen in {(100 * this.state.contract.percent_seen).toFixed(0)}% of Saved Smart Contracts)</>
      }</Typography>
      <Grid container spacing={1}>
        {
          this.state.contract.modifiers.map((x, i) => <>
            <Grid item xs={this.state.zoomedContract === i ? 12 : 4}>
              <ModifierInfo key={i} contractId={`mod-${i}`} modifier={x} setZoomedContract={this.setZoomedContract}/>
            </Grid>
          </>)
        }
      </Grid>
    </>
  }
}

export default ContractInfo;