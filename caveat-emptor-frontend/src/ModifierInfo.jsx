import './App.css';
import React, {Component} from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardContent, Pagination, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

const MAX_ITEMS = 5;

class ModifierInfo extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      page: 1,
    }
  }

  zoomHere() {
    this.props.setZoomedContract(parseInt(this.props.contractId.slice(4)));
  }

  render() {
    let numMainSpaces = 0;
    while (this.props.modifier.source_code[0][numMainSpaces] === ' ') numMainSpaces += 1;

    let numStartingSpaces = [];
    this.props.modifier.functions.forEach((x, i) => {
      let numSpaces = 0;
      while (x.source_code[0][numSpaces] === ' ') numSpaces += 1;
      numStartingSpaces.push(numSpaces);
    });
    return <>
      <Card variant="outlined" color="secondary" sx={{ margin: 1 }}>
        <CardContent>
          <Accordion style={{background: "#1e8f8e"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography variant="p" sx={{fontSize: 28}}>{this.props.modifier.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography align="left" sx={{
                fontFamily: "monospace",
                whiteSpace: "break-spaces",
                fontSize: "10pt"
              }}>
                {this.props.modifier.source_code.map((code, _) => <>
                  {code.slice(numMainSpaces)}<br/>
                </>)}
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          {this.props.modifier.functions.length > 0 ? this.props.modifier.functions.map((x, i) => <>
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
                    {x.source_code.map((code, _) => <>
                      {code.slice(numStartingSpaces[i])}<br/>
                    </>)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            : <></>}
          </>) : <Typography variant="p">No associated functions found!</Typography>}
        </CardContent>
        <CardActions>
          <MultipleStopIcon
            style={{display: "block", float: "left", cursor: "pointer"}}
            fontSize="large"
            onClick={e => this.zoomHere()}/>
          {this.props.modifier.functions.length > MAX_ITEMS
            ? <Pagination
                  style={{margin: "auto"}}
                  count={Math.ceil(this.props.modifier.functions.length / MAX_ITEMS)}
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