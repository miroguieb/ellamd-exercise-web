import * as React from 'react';
import { observer, inject } from 'mobx-react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import withRoot from '../../withRoot';
import { PATIENT_FORM_STORE } from '../../constants/stores';
import { PatientFormStore } from '../../stores';
import IngredientsDialog from './dialogs/IngredientsDialog';
import FormulationsDialog from './dialogs/FormulationsDialog';

const styles: StyleRulesCallback<'root' | 'container' | 'textField' | 'button' | 'ingredients'> = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  ingredients: {
    marginTop: theme.spacing.unit * 10
  }
});

@inject(PATIENT_FORM_STORE)
@observer
class PatientForm extends React.Component<
WithStyles<'root' | 'container' | 'textField' | 'button' | 'ingredients'>,
PatientFormState
> {

  state = {
    name: '',
    address: '',
    dob: '',
    ingredientsDialogOpen: false,
    formulationsDialogOpen: false
  };

  handleIngredientsDialogClose = () => {
    this.setState({
      ingredientsDialogOpen: false
    });
  }

  openIngredientsDialog = () => {
    this.setState({
      ingredientsDialogOpen: true
    });
  }

  handleFormulationsDialogClose = () => {
    this.setState({
      formulationsDialogOpen: false
    });
  }

  openFormulationsDialog = () => {
    this.setState({
      formulationsDialogOpen: true
    });
  }

  handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.currentTarget.value,
    });
  }

  render() {
    const { ingredientsDialogOpen, formulationsDialogOpen } = this.state;
    const { classes } = this.props;
    const patientFormStore = this.props[PATIENT_FORM_STORE] as PatientFormStore;
    const { ingredients, formulations } = patientFormStore;

    return (
      <Grid container justify="center" spacing={0} className={classes.root}>
        <Grid item xs={12} md={8}>
          <div className="buttons">
            <Button
              variant="raised"
              color="primary"
              className={classes.button}
              onClick={this.openIngredientsDialog}
            >
              View Ingredients
            </Button>

            <Button
              variant="raised"
              color="primary"
              className={classes.button}
              onClick={this.openFormulationsDialog}
            >
              View Formulations
            </Button>
          </div>

          <form noValidate autoComplete="off" className={classes.container}>
            <Typography variant="title" color="inherit">
              Patient
            </Typography>

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

            <div className={classes.ingredients}>
              <Typography variant="title" color="inherit">
                Patient Ingredients
              </Typography>
            </div>
          </form>

          {ingredients && <IngredientsDialog
            ingredients={ingredients}
            open={ingredientsDialogOpen}
            onClose={this.handleIngredientsDialogClose}
          />}

          {formulations && <FormulationsDialog
            formulations={formulations}
            open={formulationsDialogOpen}
            onClose={this.handleFormulationsDialogClose}
          />}
        </Grid>
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(PatientForm));
