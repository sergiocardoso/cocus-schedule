import axios from "axios";
import { getToken } from './Schedule';

axios.defaults.baseURL = "http://localhost/api/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const userJSON = localStorage.getItem('LoggedUser');
let headers = {};

if(userJSON){
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: 'Bearer ' + JSON.parse(userJSON).token
  }
}

else {
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}



import IUser from "@/model/User.interface";

/**
 * Login on API -> Larevel Sanctum
 * @param email User email
 * @param password User password
 */
export const onLogin = (user: IUser): Promise<any> => 
{
  return new Promise((resolve, reject) => {
    axios
      .post("login", { email: user.email, password: user.password })
      .then((response) => {
        axios.defaults.headers.common = {
          Authorization: `bearer ${response.data.access_token}`,
        };

        const data = {
          token: response.data.access_token,
          user: response.data.user
        }

        localStorage.setItem('LoggedUser', JSON.stringify(data));
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

/**
 * Sign In
 * @param user User object
 */
export const onSingup = (user: any): Promise<any> => 
{
  return new Promise((resolve, reject) => {
    axios
      .post(
        "signin",
        { name: user.name, email: user.email, password: user.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

/**
 * Logout
 */
export const onLogout = (): Promise<any> =>
{
  return new Promise((resolve, reject) => {
    const headers = getToken();
    axios.get('user/logout', {headers})
    .then(response => resolve(response))
    .catch(error => reject(error));
  })
}

/**
 * Update User data information
 * @param data User Interface
 */
export const onUpdate = (data: IUser): Promise<any> => 
{
  return new Promise((resolve, reject) => {
    const headers = getToken();

    axios.put('user/edit', {name: data.name, email: data.email, password: data.password}, {headers})
    .then(response => resolve(response))
    .catch(error => reject(error));
  })
}


/**
 * Is Logged ?
 */
export const isLogged = (): Promise<boolean | any> => {
  return new Promise((resolve, reject) => {
    axios.get('user/get', {headers})
    .then(response => resolve(response))
    .catch(error => reject(error));
  })
}