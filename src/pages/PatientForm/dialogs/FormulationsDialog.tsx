import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const decorate = withStyles(({ spacing }) => ({
  table: {
    minWidth: 700,
  },
}));

interface Props {
  formulations: Formulation[];
  open: boolean;
  onClose: Function;
}

class FormulationsDialog extends React.Component<Props & WithStyles<'table'>> {
  handleClose = () => {
    this.props.onClose();
  }

  render() {
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
            </TableRow>
          </TableHead>

          <TableBody>
            {formulations.map((formulation: Formulation, index: number) => {
              return (
                <TableRow key={formulation.id}>
                  <TableCell padding="dense" numeric>{index + 1}</TableCell>
                  <TableCell padding="dense">{formulation.name}</TableCell>
                  <TableCell padding="dense" numeric>{formulation.formulation_ingredients.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Dialog>
    );
  }
}

export default decorate(FormulationsDialog);
