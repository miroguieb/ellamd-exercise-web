import { observable, computed, action, extendObservable } from 'mobx';

export class PatientFormStore {
  @observable
  public formulations: Formulation[];

  @observable
  public ingredients: Ingredient[];

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

  @computed
  get selectableIngredients() {
    return this.ingredients.filter((ingredient: Ingredient) =>
      this.patientIngredients.findIndex((patientIngredient: PatientIngredient) =>
        patientIngredient.ingredient_id === ingredient.id
      ) === -1
    );
  }

  @action
  loadIngredients = () => {
    // TODO: Load ingredients
    this.ingredients = [];
  }

  @action
  loadFormulations = () => {
    // TODO: Load formulations
    this.formulations = [];
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
