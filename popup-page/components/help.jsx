import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Util } from '../../src/utils/api';
import Db from '../../src/utils/db';

const util = new Util()
const db = new Db()

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
  },
});

class FullWidthTabs extends React.Component {
  state = {
    modelNo: 4,
  };
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    db.get("modelNo")
      .then(res=>{
        console.log(res);
        this.setState({modelNo: res.modelNo|| 4})
      })
      .catch(e=>{})
  }

  handleChange = (event) => {
    this.setState({ modelNo:event.target.value});
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-helper">Jiofi Model no.</InputLabel>
          <Select
            value={this.state.modelNo}
            onChange={this.handleChange}
            input={<Input name="age" id="age-helper" />}
          >
            <MenuItem value={6}>Jiofi 6</MenuItem>
            <MenuItem value={5}>Jiofi 5</MenuItem>
            <MenuItem value={4}>Jiofi 4</MenuItem>
            <MenuItem value={3}>Jiofi 3</MenuItem>
            <MenuItem value={2}>Jiofi 2</MenuItem>
            <MenuItem value={1}>Jiofi 1</MenuItem>
          </Select>
          <FormHelperText>Select your Jiofi model</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
