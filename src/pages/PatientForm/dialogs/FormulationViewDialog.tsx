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
  formulation: Formulation;
  open: boolean;
  onClose: Function;
}

class FormulationViewDialog extends React.Component<Props & WithStyles<'table'>> {
  handleClose = () => {
    this.props.onClose();
  }

  render() {
    const { classes, open, formulation } = this.props;
    const ingredients = formulation.formulation_ingredients.map(
      (fi: FormulationIngredient) => ({
        name: fi.ingredient.name,
        percentage: fi.percentage
      }));

    return (
      <Dialog
        aria-labelledby="formulation-dialog-title"
        maxWidth="md"
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle id="formulation-dialog-title">{`Formulation: ${formulation.name}`}</DialogTitle>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="dense" numeric>No.</TableCell>
              <TableCell padding="dense">Ingredient</TableCell>
              <TableCell padding="dense" numeric>Percentage (%)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ingredients.map(({ name, percentage }, index) => {
              return (
                <TableRow key={index}>
                  <TableCell padding="dense" numeric>{index + 1}</TableCell>
                  <TableCell padding="dense">{name}</TableCell>
                  <TableCell padding="dense" numeric>{percentage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Dialog>
    );
  }
}

export default decorate(FormulationViewDialog);
