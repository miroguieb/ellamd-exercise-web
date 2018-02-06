import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';

import FormulationDialog from './FormulationDialog';

const decorate = withStyles(({ spacing }) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: spacing.unit
  }
}));

interface Props {
  formulations: Formulation[];
  open: boolean;
  onClose: Function;
}

class FormulationsDialog extends React.Component<Props & WithStyles<'table' | 'button'>> {

  state = {
    formulationOpened: null,
    formulationDialogOpen: false
  };

  handleFormulationDialogClose = () => {
    this.setState({
      formulationDialogOpen: false
    });
  }

  openFormulationDialog = (formulation: Formulation) => () => {
    this.setState({
      formulationOpened: formulation,
      formulationDialogOpen: true
    });
  }

  handleClose = () => {
    this.props.onClose();
  }

  render() {
    const { formulationOpened, formulationDialogOpen } = this.state;
    const { classes, open, formulations } = this.props;

    return (
      <Dialog
        aria-labelledby="formulations-dialog-title"
        maxWidth="md"
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle id="formulations-dialog-title">Formulations</DialogTitle>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="dense" numeric>No.</TableCell>
              <TableCell padding="dense">Name</TableCell>
              <TableCell padding="dense" numeric>No. of Ingredients</TableCell>
              <TableCell padding="dense">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {formulations.map((formulation: Formulation, index: number) => {
              return (
                <TableRow key={formulation.id}>
                  <TableCell padding="dense" numeric>{index + 1}</TableCell>
                  <TableCell padding="dense">{formulation.name}</TableCell>
                  <TableCell padding="dense" numeric>{formulation.formulation_ingredients.length}</TableCell>
                  <TableCell padding="dense">
                    <IconButton
                      className={classes.button}
                      aria-label="View"
                      onClick={this.openFormulationDialog(formulation)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {formulationOpened && <FormulationDialog
          formulation={formulationOpened}
          open={formulationDialogOpen}
          onClose={this.handleFormulationDialogClose}
        />}
      </Dialog>
    );
  }
}

export default decorate(FormulationsDialog);
