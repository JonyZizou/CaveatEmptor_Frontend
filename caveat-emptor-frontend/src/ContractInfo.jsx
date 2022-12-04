import './App.css';
import React, {Component} from 'react';
import { Grid, Typography } from '@mui/material';

import ModifierInfo from './ModifierInfo';

/*
class ContractInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      contractName: props.contract.name,
      modifiers: props.contract.modifiers
    }
  }

  render() {
    console.log(this.state);
    return <>
      <Typography variant="h4">Contract: {this.state.contractName}</Typography>
      {
        this.state.modifiers.map((x, i) => {
          return (i >= MAX_ITEMS * this.state.page && i < MAX_ITEMS * (this.state.page + 1))
            ? <ModifierInfo key={i} modifier={x}/>
            : <></>
        })
      }
    </>
  }
}
*/

const ContractInfo = props => <>
  <Typography variant="h4">Contract: {props.contract.name}</Typography>
  <Grid container spacing={2}>
    {
      props.contract.modifiers.map((x, i) => <>
        <Grid item xs={4}>
          <ModifierInfo key={props.contract.name + i} modifier={x}/>
        </Grid>
      </>)
    } 
  </Grid>
</>;

export default ContractInfo;