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
  public patientIngredients: PatientIngredient[];

  constructor() {
    this.patient = {
      name: '',
      address: '',
      dob: ''
    };
    this.patientIngredients = [];
  }

  public getIngredientById = (id: number) =>
    this.ingredients.find((ingredient: Ingredient) => ingredient.id === id)

  public getFormulationById = (id: number) =>
    this.formulations.find((formulation: Formulation) => formulation.id === id)

  @computed
  get selectableIngredients() {
    return this.ingredients.filter((ingredient: Ingredient) =>
      this.patientIngredients.findIndex((patientIngredient: PatientIngredient) =>
        patientIngredient.ingredient_id === ingredient.id
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
    // TODO: Load formulation into form
  }

  @action
  updatePatient = (patient: Patient) => {
    extendObservable(this.patient, patient);
  }

  @action
  addPatientIngredient = (patientIngredient: PatientIngredient) => {
    this.patientIngredients.push(patientIngredient);
  }

  @action
  updatePatientIngredient = (index: number, patientIngredient: PatientIngredient) => {
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
