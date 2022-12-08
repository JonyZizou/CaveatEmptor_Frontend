import './App.css';
import React, {Component} from 'react';
import {styled} from '@mui/material/styles';
import {Button, Link, TextField, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

import ContractInfo from './ContractInfo';

import axios from 'axios';
import InfoDialog from './InfoDialog';

const PROD_URL = 'https://api.caveatemptor.info';
const TEST_URL = `http://${window.location.hostname}:8000`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      contractAddress: "",
      contractName: "",
      lastAddress: "",
      contracts: null,
      infoOpen: false,
      waiting: false,
      errored: false,
      hasData: false
    }
  }

  queryContract() {
    axios.get(`${process.env.NODE_ENV === "production" ? PROD_URL : TEST_URL}/analyze?token=${this.state.contractAddress}`)
      .then(x => {
        let hasData = false;
        for (let i=0; i<x.data.report.contracts.length && !hasData; i++) {
          hasData = x.data.report.contracts[i].modifiers.length > 0;
        }
        this.setState({
          contractName: x.data.report.name,
          lastAddress: x.data.report.address,
          contracts: x.data.report.contracts,
          waiting: false,
          errored: false,
          hasData
        });
      })
      .catch(e => {
        this.setState({contracts: null, errored: true, hasData: false})
      });
    this.setState({
      contracts: null,
      contractName: "",
      lastAddress: "",
      waiting: true,
      errored: false,
      hasData: false
    });
  }

  toggleInfo() {
    this.setState({infoOpen: !this.state.infoOpen})
  }

  render() {
    let viewCode = <Link href={`https://www.etherscan.io/token/${this.state.lastAddress}#code`} target='_blank'>View Contract Code</Link>
    return <>
      <div className="App">
        <Typography variant="h2">Caveat Emptor</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={e => this.toggleInfo()}
          style={{
            display: "block",
            float: "right",
            cursor: "pointer",
            marginTop: -64,
            marginRight: 16
          }}>
          <InfoIcon
            fontSize="large"
            style={{
              marginTop: 8
            }}/>
        </Button>
        <InfoDialog open={this.state.infoOpen} toggleInfo={() => this.toggleInfo()}/>
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
        this.state.contracts && this.state.hasData && !this.state.waiting && !this.state.errored ? <>
            <Typography variant="h3">{this.state.contractName}</Typography>
            {viewCode}
            {this.state.contracts.map((x, i) => {
              return <ContractInfo key={i} contract={x}/>
            })}
          </> : this.state.waiting && !this.state.errored ? 
          <><Typography variant="p">Loading...</Typography><br/><br/></> : this.state.errored ?
          <><Typography variant="p">
            Error processing contract, please ensure that the smart contract
            address you pasted is valid, and if so, feel free to open an issue
            on our GitHub listed below!<br/>
            {viewCode}
          </Typography><br/><br/></> : !this.state.hasData && this.state.contracts ?
          <><Typography variant="p">Contract contains no modifiers!<br/>{viewCode}</Typography><br/><br/></> :
          <><Typography variant="p">No contract loaded!</Typography><br/><br/></>
        }
        <Typography variant="p">
          DISCLAIMER: No information from this website should be taken as
          financial advice.<br/>
          The algorithm for this project is open
          source, and can be accessed <Link target="_blank" color="secondary" href="https://github.com/jonathanebrahimian/THEAlgorithm">
            here
          </Link>.
        </Typography>
      </div>
    </>
  }
}

const SearchTextField = styled(TextField)({
  '& label': {
    color: "#5bc0be"
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "#8ff3f1"
    },
    '&:hover fieldset': {
      borderColor: "#5bc0be"
    },
    '&.Mui-focused fieldset': {
      borderColor: "#1e8f8e"
    },
  },
  '& input': {
    color: "#ffffff"
  }
});

export default App;
