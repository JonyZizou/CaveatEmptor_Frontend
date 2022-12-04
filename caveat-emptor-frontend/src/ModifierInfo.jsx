import './App.css';
import React, {Component} from 'react';
import { Card, CardActions, CardContent, ListItem, ListItemButton, ListItemText, Pagination, Typography } from '@mui/material';

const MAX_ITEMS = 5;

class ModifierInfo extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      page: 1,
      name: props.modifier.name,
      functions: props.modifier.functions
    }
  }

  render() {
    return <>
      <Card variant="outlined" color="secondary" sx={{ maxWidth: 450 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>{this.state.name}</Typography>
          {this.state.functions.map((x, i) => <>
            {i >= (this.state.page-1) * MAX_ITEMS && i < this.state.page * MAX_ITEMS
            ? <ListItem key={i} component="div" disablePadding>
                <ListItemButton key={i}>
                  <ListItemText key={i} primary={x}/>
                </ListItemButton>
              </ListItem>
            : <></>}
          </>)}
        </CardContent>
        <CardActions>
          {this.state.functions.length > MAX_ITEMS
            ? <Pagination
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

const _ModifierInfo = props => <>
  <Card variant="outlined" color="secondary" sx={{ maxWidth: 450 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>{props.modifier.name}</Typography>
      {props.modifier.functions.map((x, i) => <>
        <ListItem key={i} component="div" disablePadding>
          <ListItemButton key={i}>
            <ListItemText key={i} primary={x}/>
          </ListItemButton>
        </ListItem>
      </>)}
    </CardContent>
  </Card>
</>;

export default ModifierInfo;