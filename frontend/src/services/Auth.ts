import IUser from "@/model/User.interface";
import axios from "axios";
import { nextTick } from "vue/types/umd";

axios.defaults.baseURL = "http://localhost/api/";
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/**
 * Login on API -> Larevel Sanctum
 * @param email User email
 * @param password User password
 */
export const onLogin = (user: IUser): Promise<any> => {
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
export const onSingup = (user: any): Promise<any> => {
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