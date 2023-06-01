const BASE_URL = 'https://plantmama-backend-dcpvdmziha-od.a.run.app';

export const { REACT_APP_WEATHER_API_KEY } = process.env
export const { REACT_APP_PLANT_API_KEY } = process.env

export const API_URL = (slug) => `${BASE_URL}/${slug}`