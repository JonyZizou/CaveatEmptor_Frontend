import './App.css';
import React, {Component} from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardContent, Pagination, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const MAX_ITEMS = 5;

class ModifierInfo extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      page: 1,
      name: props.modifier.name,
      functions: props.modifier.functions,
      contractId: props.contractId
    }
  }

  zoomHere() {
    this.props.setZoomedContract(parseInt(this.state.contractId.slice(4)));
  }

  render() {
    let numStartingSpaces = [];
    this.state.functions.forEach((x, i) => {
      let numSpaces = 0;
      while (x.source_code[0][numSpaces] === ' ') numSpaces += 1;
      numStartingSpaces.push(numSpaces);
    });
    return <>
      <Card variant="outlined" color="secondary" sx={{ margin: 1 }}>
        <CardContent>
          <Typography variant="p" sx={{fontSize: 28}} gutterBottom>{this.state.name}</Typography>
          <OpenInFullIcon
            style={{display: "block", float: "right", cursor: "pointer"}}
            onClick={e => this.zoomHere()}/>
          {this.state.functions.map((x, i) => <>
            {i >= (this.state.page-1) * MAX_ITEMS && i < this.state.page * MAX_ITEMS
              ? <Accordion key={i+100}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}>
                  <Typography>{x.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography align="left" sx={{
                    fontFamily: "monospace",
                    whiteSpace: "break-spaces",
                    fontSize: "10pt"
                  }}>
                    {x.source_code.map((code, j) => <>
                      {code.slice(numStartingSpaces[i])}<br/>
                    </>)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            : <></>}
          </>)}
        </CardContent>
        <CardActions>
          {this.state.functions.length > MAX_ITEMS
            ? <Pagination
                  style={{margin: "auto"}}
                  count={Math.ceil(this.state.functions.length / MAX_ITEMS)}
                  color="primary"
                  page={this.state.page}
                  onChange={(e, v) => this.setState({page: v})}/>
            : <></>}
        </CardActions>
      </Card>
    </>;
  }
}

export default ModifierInfo;