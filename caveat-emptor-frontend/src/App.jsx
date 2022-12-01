import './App.css';
import React, {Component} from 'react';
import {styled} from '@mui/material/styles';
import {Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contractAddress: ""
    }
  }

  queryContract() {
    axios.get(`http://${window.location.hostname}:8000/analyze?token=${this.state.contractAddress}`)
      .then(x => {
        this.processResponse(x.data.report);
      })
      .catch(e => {
        console.error(e);
      });
  }

  processResponse(response) {
    console.log(response);
    for (let i=0, l=response.contracts.length; i<l; i++) {
      console.log("Contract:", response.contracts[i]);
    }
  }

  render() {
    return <>
      <div className="App">
        <h1 color="primary">Caveat Emptor</h1>
        <br/>
        <SearchTextField
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
