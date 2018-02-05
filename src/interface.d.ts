interface PatientFormState { }

interface Ingredient {
  id: number;
  name: string;
  minimum_percentage: number;
  maximum_percentage: number;
  description: string;
  classes: string[];
}

interface FormulationIngredient {
  id: number;
  formulation_id: number;
  ingredient_id: number;
  percentage: number;
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

interface PatientIngredient {
  ingredient_id: number;
  percentage: number;
}
