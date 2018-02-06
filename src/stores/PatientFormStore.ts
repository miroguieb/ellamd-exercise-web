import { observable, computed, action, extendObservable } from 'mobx';

import { getIngredients, getFormulations } from '../utils/api';

export class PatientFormStore {
  @observable
  public ingredients: Ingredient[];

  @observable
  public formulations: Formulation[];

  @observable
  public patient: Patient;

  @observable
  public patientIngredients: FormulationIngredient[];

  constructor() {
    this.patient = {
      name: '',
      address: '',
      dob: ''
    };
    this.patientIngredients = [];
    this.ingredients = [];
    this.formulations = [];
  }

  public getIngredientById = (id: number) =>
    this.ingredients.find((ingredient: Ingredient) => ingredient.id === id)

  public getFormulationById = (id: number) =>
    this.formulations.find((formulation: Formulation) => formulation.id === id)

  @computed
  get selectableIngredients() {
    return this.ingredients.filter((ingredient: Ingredient) =>
      this.patientIngredients.findIndex((patientIngredient: FormulationIngredient) =>
        patientIngredient.ingredient.id === ingredient.id
      ) === -1
    );
  }

  @action
  setIngredients = (ingredients: Ingredient[]) => {
    this.ingredients = ingredients;
  }

  @action
  loadIngredients = () => {
    getIngredients()
      .then((ingredients: Ingredient[]) => {
        this.setIngredients(ingredients);
      });
  }

  @action
  setFormulations = (formulations: Formulation[]) => {
    this.formulations = formulations;
  }

  @action
  loadFormulations = () => {
    getFormulations()
      .then((formulations: Formulation[]) => {
        this.setFormulations(formulations);
      });
  }

  @action
  loadIngredientIntoForm = (formulation: Formulation) => {
    // Shallow copy before assigning
    this.patientIngredients = formulation.formulation_ingredients.slice();
  }

  @action
  updatePatient = (patient: Patient) => {
    extendObservable(this.patient, patient);
  }

  @action
  addPatientIngredient = (patientIngredient: FormulationIngredient) => {
    this.patientIngredients.push(patientIngredient);
  }

  @action
  updatePatientIngredient = (index: number, patientIngredient: FormulationIngredient) => {
    const pi = this.patientIngredients[index];

    if (pi) {
      extendObservable(pi, patientIngredient);
    }
  }

  @action
  deletePatientIngredient = (index: number) => {
    const pi = this.patientIngredients[index];

    if (pi) {
      this.patientIngredients.splice(0, index);
    }
  }
}

export default PatientFormStore;
