import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const decorate = withStyles(({ spacing }) => ({
  root: {},
  formControl: {
    margin: spacing.unit,
    width: '100%'
  },
}));

interface Props {
  ingredients: Ingredient[];
  patientIngredient: FormulationIngredient | null;
  open: boolean;
  onClose: Function;
  onSave: Function;
}

const formatPercentage = (p: number): string => `${p.toFixed(2)}%`;

class PatientIngredientEditDialog extends React.Component<Props & WithStyles<'root' | 'formControl'>> {
  state = {
    ingredientId: -1,
    percentage: 0,
    errors: {
      ingredientId: false,
      percentage: false
    }
  };

  componentWillReceiveProps(nextProps: any) {
    const { patientIngredient } = nextProps;

    if (patientIngredient) {
      this.setState({
        ingredientId: patientIngredient.ingredient.id,
        percentage: patientIngredient.percentage,
        errors: {
          ingredientId: false,
          percentage: false
        }
      });
    } else {
      this.setState({
        ingredientId: -1,
        percentage: 0,
        errors: {
          ingredientId: false,
          percentage: false
        }
      });
    }
  }

  getIngredient = (): Ingredient | undefined => {
    const { ingredientId } = this.state;
    const { ingredients } = this.props;

    return ingredients.find((i: Ingredient) => i.id === ingredientId);
  }

  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [name]: event.currentTarget.value,
    });
  }

  handleClose = () => {
    const { onClose } = this.props;

    onClose();
  }

  isValid = (): boolean => {
    const { percentage } = this.state;
    const ingredient = this.getIngredient();
    const errors = {
      ingredientId: false,
      percentage: false
    };

    if (!ingredient) {
      errors.ingredientId = true;
      errors.percentage = false;
    } else {
      errors.ingredientId = false;
      errors.percentage = percentage < ingredient.minimum_percentage
        || percentage > ingredient.maximum_percentage;
    }

    this.setState({
      errors
    });

    return !errors.ingredientId && !errors.percentage;
  }

  handleSave = () => {
    if (!this.isValid()) {
      return;
    }

    const { percentage } = this.state;
    const { onSave, onClose } = this.props;
    const ingredient = this.getIngredient();

    onSave({
      ingredient,
      percentage
    });
    onClose();
  }

  render() {
    const { ingredientId, percentage, errors } = this.state;
    const { classes, open, ingredients, patientIngredient } = this.props;

    const ingredient = this.getIngredient();
    const title = `${patientIngredient ? 'Edit' : 'New'} Ingredient`;

    return (
      <Dialog
        aria-labelledby="patient-ingredient-edit-title"
        maxWidth="md"
        fullWidth
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle id="patient-ingredient-edit-title">{title}</DialogTitle>

        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
            <Select
              value={ingredientId}
              error={errors.ingredientId}
              onChange={this.handleChange('ingredientId')}
              inputProps={{
                name: 'ingredient',
                id: 'ingredient',
              }}
            >
              <MenuItem value={-1} disabled>
                <em>None</em>
              </MenuItem>

              {ingredients.map((i: Ingredient) => (
                <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {ingredient ? ingredient.description : 'Please select ingredient'}
            </FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="percentage">Ingredient</InputLabel>
            <Input
              value={percentage}
              error={errors.percentage}
              onChange={this.handleChange('percentage')}
              inputProps={{
                name: 'ingredient',
                id: 'ingredient',
                type: 'number',
                step: 0.01,
              }}
            />

            <FormHelperText>
              {ingredient &&
                `Min: ${formatPercentage(ingredient.minimum_percentage)} -
                Max: ${formatPercentage(ingredient.maximum_percentage)}`}
            </FormHelperText>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave} variant="raised" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default decorate(PatientIngredientEditDialog);
