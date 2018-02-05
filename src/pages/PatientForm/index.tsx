import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import withRoot from '../../withRoot';

const styles: StyleRulesCallback<'root' | 'container' | 'textField'> = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class PatientForm extends React.Component<WithStyles<'root' | 'container' | 'textField'>, PatientFormState> {
  state = {
    name: '',
    address: '',
    dob: ''
  };

  handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.currentTarget.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center" spacing={0} className={classes.root}>
        <Grid item xs={12} md={8}>
          <form noValidate autoComplete="off" className={classes.container}>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
            />

            <TextField
              id="address"
              label="Address"
              className={classes.textField}
              value={this.state.address}
              onChange={this.handleChange('address')}
              margin="normal"
              fullWidth
            />

            <TextField
              id="date"
              label="Birthday"
              className={classes.textField}
              type="date"
              value={this.state.dob}
              onChange={this.handleChange('dob')}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              fullWidth
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(PatientForm));
