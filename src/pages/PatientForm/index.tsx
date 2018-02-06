import * as React from 'react';
import { observer, inject } from 'mobx-react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import withRoot from '../../withRoot';
import { PATIENT_FORM_STORE } from '../../constants/stores';
import { PatientFormStore } from '../../stores';
import IngredientsDialog from './dialogs/IngredientsDialog';
import FormulationsDialog from './dialogs/FormulationsDialog';
import PatientIngredientEditDialog from './dialogs/PatientIngredientEditDialog';

const styles: StyleRulesCallback<'root' | 'patient' | 'ingredients' | 'addButton' | 'button' | 'textField'> = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
  patient: {
    marginTop: theme.spacing.unit * 5
  },
  ingredients: {
    marginTop: theme.spacing.unit * 5,
    position: 'relative'
  },
  addButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

@inject(PATIENT_FORM_STORE)
@observer
class PatientForm extends React.Component<
WithStyles<'root' | 'patient' | 'ingredients' | 'addButton' | 'button' | 'textField'>
> {

  state = {
    name: '',
    address: '',
    dob: '',
    patientIngredient: null,
    ingredientsDialogOpen: false,
    formulationsDialogOpen: false,
    patientIngredientEditDialogOpen: false,
  };

  handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.currentTarget.value,
    });
  }

  // Ingredients dialog handlers
  openIngredientsDialog = () => {
    this.setState({
      ingredientsDialogOpen: true
    });
  }

  handleIngredientsDialogClose = () => {
    this.setState({
      ingredientsDialogOpen: false
    });
  }

  // Formulations dialog handlers
  openFormulationsDialog = () => {
    this.setState({
      formulationsDialogOpen: true
    });
  }

  handleFormulationsDialogClose = () => {
    this.setState({
      formulationsDialogOpen: false
    });
  }

  handleLoadFormulation = (formulation: Formulation) => {
    const patientFormStore = this.props[PATIENT_FORM_STORE] as PatientFormStore;

    patientFormStore.loadIngredientIntoForm(formulation);
  }

  // PatientIngredient edit dialog handlers
  openPatientIngredientEditDialog = (patientIngredient: FormulationIngredient | null) => () => {
    this.setState({
      patientIngredient,
      patientIngredientEditDialogOpen: true
    });
  }

  handlePatientIngredientEditDialogClose = () => {
    this.setState({
      patientIngredientEditDialogOpen: false
    });
  }

  handleSavePatientIngredient = (patientIngredient: FormulationIngredient) => {
    // TODO: Handle saving patient ingredient
  }

  render() {
    const {
      ingredientsDialogOpen,
      formulationsDialogOpen,
      patientIngredientEditDialogOpen,
      patientIngredient
    } = this.state;
    const { classes } = this.props;
    const patientFormStore = this.props[PATIENT_FORM_STORE] as PatientFormStore;
    const { ingredients, formulations, patientIngredients } = patientFormStore;

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

          <div className={classes.patient}>
            <Typography variant="headline" color="inherit">
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
          </div>

          <div className={classes.ingredients}>
            <Typography variant="headline" color="inherit">
              Patient Ingredients
            </Typography>

            <Button
              variant="fab"
              aria-label="add"
              color="primary"
              className={classes.addButton}
              onClick={this.openPatientIngredientEditDialog(null)}
            >
              <Icon>add</Icon>
            </Button>

            {patientIngredients.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense" numeric>No.</TableCell>
                    <TableCell padding="dense">Ingredient</TableCell>
                    <TableCell padding="dense" numeric>Percentage (%)</TableCell>
                    <TableCell padding="dense">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {patientIngredients.map(({ percentage, ingredient }, index: number) => (
                    <TableRow key={ingredient.id}>
                      <TableCell padding="dense" numeric>{index + 1}</TableCell>
                      <TableCell padding="dense">{ingredient.name}</TableCell>
                      <TableCell padding="dense" numeric>{percentage}</TableCell>
                      <TableCell padding="dense">
                        <Button
                          variant="fab"
                          color="secondary"
                          mini
                          aria-label="edit"
                          className={classes.button}
                        >
                          <Icon>edit_icon</Icon>
                        </Button>

                        <Button
                          variant="fab"
                          aria-label="delete"
                          mini
                          className={classes.button}
                        >
                          <Icon>delete</Icon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <Typography variant="subheading" color="error">
                  No ingredients
                </Typography>
              )}
          </div>

          <IngredientsDialog
            ingredients={ingredients}
            open={ingredientsDialogOpen}
            onClose={this.handleIngredientsDialogClose}
          />

          <FormulationsDialog
            formulations={formulations}
            open={formulationsDialogOpen}
            onClose={this.handleFormulationsDialogClose}
            onLoadFormulation={this.handleLoadFormulation}
          />

          <PatientIngredientEditDialog
            patientIngredient={patientIngredient}
            open={patientIngredientEditDialogOpen}
            onClose={this.handlePatientIngredientEditDialogClose}
            onSave={this.handleSavePatientIngredient}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(PatientForm));
