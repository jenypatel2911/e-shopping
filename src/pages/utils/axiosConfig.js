import { getTokenFromLocalStorage } from "./localStorageUtils";
export const base_url = "http://localhost:4000/api/";

const token = getTokenFromLocalStorage();
const newToken = JSON.parse(token);

export const config = {
  headers: {
    Authorization: newToken ? `Bearer ${newToken}` : "",
    Accept: "application/json",
  },
};
