import { observable, computed, action, extendObservable } from 'mobx';
import * as fileDownload from 'react-file-download';

import { getIngredients, getFormulations, createReport } from '../utils/api';

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

  public getSelectableIngredients(except: FormulationIngredient | null): Ingredient[] {
    return this.ingredients.filter((i: Ingredient) =>
      (except && except.ingredient.id === i.id) ||
      this.patientIngredients.findIndex((pi: FormulationIngredient) => pi.ingredient.id === i.id) === -1
    );
  }

  @computed
  get isFormValid() {
    return this.patient.name && this.patient.address && this.patient.dob && this.patientIngredients.length > 0;
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
      this.patientIngredients.splice(index, 1);
    }
  }

  @action
  createReport = () => {
    if (!this.isFormValid) {
      return;
    }

    createReport(this.patient, this.patientIngredients)
      .then((data: any) => {
        fileDownload(data, 'report.pdf');
      });
  }
}

export default PatientFormStore;
