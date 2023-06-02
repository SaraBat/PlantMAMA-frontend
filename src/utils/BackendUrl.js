export const { REACT_APP_MONGO_URL } = process.env
export const { REACT_APP_WEATHER_API_KEY } = process.env
export const { REACT_APP_PLANT_API_KEY } = process.env

export const API_URL = (slug) => `${REACT_APP_MONGO_URL}/${slug}`