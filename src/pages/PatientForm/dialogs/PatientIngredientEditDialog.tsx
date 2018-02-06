import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const decorate = withStyles(({ spacing }) => ({
  root: {},
}));

interface Props {
  patientIngredient: FormulationIngredient | null;
  open: boolean;
  onClose: Function;
  onSave: Function;
}

class PatientIngredientEditDialog extends React.Component<Props & WithStyles<'root'>> {
  handleClose = () => {
    const { onClose } = this.props;

    onClose();
  }

  render() {
    const { open, patientIngredient } = this.props;
    const title = `${patientIngredient ? 'Edit' : 'New'} Ingredient`;

    return (
      <Dialog
        aria-labelledby="patient-ingredient-edit-title"
        maxWidth="md"
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle id="patient-ingredient-edit-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} variant="raised" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default decorate(PatientIngredientEditDialog);
