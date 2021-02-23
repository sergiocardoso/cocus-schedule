import axios from "axios";

axios.defaults.baseURL = "http://localhost/api/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('LoggedUser') || "").token
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
 * Is Logged ?
 */
export const isLogged = (): Promise<boolean | any> => {
  return new Promise((resolve, reject) => {
    axios.get('user/get', {headers})
    .then(response => resolve(response))
    .catch(error => reject(error));
  })
}