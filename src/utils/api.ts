import axios, { AxiosInstance, AxiosResponse } from 'axios';

const getApiClient = (options = {}): AxiosInstance => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
};

export const getIngredients = (): Promise<Ingredient[]> => {
  return getApiClient()
    .get('ingredients/')
    .then((response: AxiosResponse) => <Ingredient[]> response.data);
};

export const getFormulations = (): Promise<Formulation[]> => {
  return getApiClient()
    .get('formulations/')
    .then((response: AxiosResponse) => <Formulation[]> response.data);
};
