import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import withRoot from './withRoot';
import PatientForm from './pages/PatientForm';

const styles = {
  root: {
    width: '100%',
  },
};

class App extends React.Component<WithStyles<'root'>> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Patient Prescription Form
            </Typography>
          </Toolbar>
        </AppBar>
        <PatientForm />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(App));
