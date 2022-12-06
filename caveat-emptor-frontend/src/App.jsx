import './App.css';
import React, {Component} from 'react';
import {styled} from '@mui/material/styles';
import {Button, TextField, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ContractInfo from './ContractInfo';

import axios from 'axios';

const PROD_URL = 'https://api.caveatemptor.info';
const TEST_URL = `http://${window.location.hostname}:8000`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      contractAddress: "0x0eb638648207d00b9025684d13b1cb53806debe4",
      contracts: null
    }
  }

  queryContract() {
    axios.get(`${process.env.NODE_ENV === "production" ? PROD_URL : TEST_URL}/analyze?token=${this.state.contractAddress}`)
      .then(x => {
        console.log(x.data.report);
        this.setState({contracts: x.data.report.contracts})
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    return <>
      <div className="App">
        <Typography variant="h2">Caveat Emptor</Typography>
        <br/>
        <SearchTextField
          sx={{ minWidth: 450 }}
          id="contract-address"
          label="Contract Address"
          variant="outlined"
          color="secondary"
          placeholder="0x..."
          value={this.state.contractAddress}
          onChange={e => this.setState({contractAddress: e.target.value})}/>

        <Button
          variant="contained"
          className="search-icon"
          color="secondary"
          onClick={() => this.queryContract()}>
          <SearchIcon fontSize="large"/>
        </Button>
        <br/>
        <br/>

        {
        this.state.contracts ? 
          this.state.contracts.map((x, i) => {
            return <ContractInfo key={i} contract={x}/>
          }) :
          <></>
        }
      </div>
    </>
  }
}

const SearchTextField = styled(TextField)({
  '& label': {
    color: "#8ff3f1"
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "#1e8f8e"
    },
    '&:hover fieldset': {
      borderColor: "#8ff3f1"
    },
    '&.Mui-focused fieldset': {
      borderColor: "#5bc0be"
    },
  },
  '& input': {
    color: "#ffffff"
  }
});

export default App;
