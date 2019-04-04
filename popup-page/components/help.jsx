import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Util } from '../../src/utils/api';

const util = new Util()
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
  },
});

class FullWidthTabs extends React.Component {
  state = {
    modelNo: 'JioFi 4',
  };
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
  }

  handleChange = (event) => {
    console.log(util.versionList[event.target.value-1]);
    this.setState({ modelNo: util.versionList[event.target.value-1]});
    console.log(this.state.modelNo)
  };

  render() {
    const { classes, theme } = this.props;

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
