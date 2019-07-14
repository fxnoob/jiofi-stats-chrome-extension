import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Db from '../../src/utils/db';

const db = new Db()

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
  },
  helpText: {
    marginTop: '20px'
  }
});

class HelpComponent extends React.Component {
  state = {
    modelNo: 5,
  };
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    db.get(["modelNo"])
      .then(res=>{
        console.log({compDidMount: res});
        this.setState({modelNo: res.modelNo})
      })
      .catch(e=>{})
  }

  handleChange = (event) => {
    if(this.props.showLinearProgressBar === false) {
      this.props.toggleLinearLoading()
    }
    db.set({modelNo:event.target.value})
    this.setState({ modelNo:event.target.value})
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
            input={<Input name="version" id="version-helper" />}
          >
            <MenuItem value={4}>Jiofi 4</MenuItem>
            <MenuItem value={5}>Jiofi 5</MenuItem>
          </Select>
          <FormHelperText>Select your Jiofi model</FormHelperText>
        </FormControl>
        <Paper className={classes.helpText} elevation={1}>
          <Typography component="h3">
            You have selected Model No: {this.state.modelNo}
          </Typography>
          <Typography component="p">
            Currently supports JioFi 4 & 5 only.
          </Typography>
        </Paper>
      </form>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HelpComponent);
