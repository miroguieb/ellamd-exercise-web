interface Ingredient {
  id: number;
  name: string;
  minimum_percentage: number;
  maximum_percentage: number;
  description: string;
  classes: string[];
}

interface FormulationIngredient {
  percentage: number;
  ingredient: Ingredient;
}

interface Formulation {
  id: number;
  name: string;
  formulation_ingredients: FormulationIngredient[];
}

interface Patient {
  name: string;
  address: string;
  dob: string;
}
