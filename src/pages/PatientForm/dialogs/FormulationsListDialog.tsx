import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

import FormulationViewDialog from './FormulationViewDialog';

const decorate = withStyles(({ spacing }) => ({
  table: {
    minWidth: 700,
  },
  button: {
    margin: spacing.unit
  },
  rightIcon: {
    marginLeft: spacing.unit,
  }
}));

interface Props {
  formulations: Formulation[];
  open: boolean;
  onClose: Function;
  onLoadFormulation: Function;
}

class FormulationsListDialog extends React.Component<Props & WithStyles<'table' | 'button' | 'rightIcon'>> {

  state = {
    formulation: null,
    formulationViewDialogOpen: false
  };

  handleFormulationViewDialogClose = () => {
    this.setState({
      formulationViewDialogOpen: false
    });
  }

  openFormulationViewDialog = (formulation: Formulation) => () => {
    this.setState({
      formulation,
      formulationViewDialogOpen: true
    });
  }

  loadFormulation = (formulation: Formulation) => () => {
    const { onClose, onLoadFormulation } = this.props;

    onClose();
    if (typeof onLoadFormulation === 'function') {
      onLoadFormulation(formulation);
    }
  }

  handleClose = () => {
    const { onClose } = this.props;

    onClose();
  }

  render() {
    const { formulation, formulationViewDialogOpen } = this.state;
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
            {formulations.map((f: Formulation, index: number) => {
              return (
                <TableRow key={f.id}>
                  <TableCell padding="dense" numeric>{index + 1}</TableCell>
                  <TableCell padding="dense">{f.name}</TableCell>
                  <TableCell padding="dense" numeric>{f.formulation_ingredients.length}</TableCell>
                  <TableCell padding="dense">
                    <Button
                      className={classes.button}
                      variant="raised"
                      size="small"
                      onClick={this.openFormulationViewDialog(f)}
                    >
                      View
                      <Icon className={classes.rightIcon}>menu</Icon>
                    </Button>

                    <Button
                      className={classes.button}
                      variant="raised"
                      color="secondary"
                      size="small"
                      onClick={this.loadFormulation(f)}
                    >
                      Load
                      <Icon className={classes.rightIcon}>file_download</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {formulation && <FormulationViewDialog
          formulation={formulation}
          open={formulationViewDialogOpen}
          onClose={this.handleFormulationViewDialogClose}
        />}
      </Dialog>
    );
  }
}

export default decorate(FormulationsListDialog);
