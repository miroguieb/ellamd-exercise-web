import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Chip from 'material-ui/Chip';

const decorate = withStyles(({ spacing }) => ({
  table: {
    minWidth: 700,
  },
  chip: {
    margin: spacing.unit,
  },
}));

interface Props {
  ingredients: Ingredient[];
  open: boolean;
  onClose: Function;
}

class IngredientsDialog extends React.Component<Props & WithStyles<'table' | 'chip'>> {
  handleClose = () => {
    const { onClose } = this.props;

    onClose();
  }

  render() {
    const { classes, open, ingredients } = this.props;

    return (
      <Dialog
        aria-labelledby="ingredients-dialog-title"
        maxWidth="md"
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle id="ingredients-dialog-title">Ingredients</DialogTitle>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="dense" numeric>No.</TableCell>
              <TableCell padding="dense">Name</TableCell>
              <TableCell padding="dense" numeric>Min. Percentage (%)</TableCell>
              <TableCell padding="dense" numeric>Max. Percentage (%)</TableCell>
              <TableCell padding="dense">Description</TableCell>
              <TableCell padding="dense">Classes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ingredients.map((ingredient: Ingredient, index: number) => (
              <TableRow key={ingredient.id}>
                <TableCell padding="dense" numeric>{index + 1}</TableCell>
                <TableCell padding="dense">{ingredient.name}</TableCell>
                <TableCell padding="dense" numeric>{ingredient.minimum_percentage}</TableCell>
                <TableCell padding="dense" numeric>{ingredient.maximum_percentage}</TableCell>
                <TableCell padding="dense">{ingredient.description}</TableCell>
                <TableCell padding="dense">
                  {ingredient.classes.map((c: string) => <Chip key={c} label={c} className={classes.chip} />)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Dialog>
    );
  }
}

export default decorate(IngredientsDialog);
