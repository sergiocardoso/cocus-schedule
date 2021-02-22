import ISchedule from "@/model/Schedule.interface";
import axios from "axios";

axios.defaults.baseURL = "http://localhost/api/";
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/**
 * Get all schedules from this user
 */
export const list = (): Promise<ISchedule[]> => {
    return new Promise((resolve, reject) => {

        const data = localStorage.getItem('LoggedUser') ?? "";
        if(!data){
            reject({"message": "TOKEN INVALID - no token"});
        }

        const dataTemp = JSON.parse(data);

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataTemp.token}`
        }

        axios.get('schedule/list', {headers})
        .then(response => {
            console.log('ver --> schedule', response);
        })
        .catch(error => reject(error));
    })
}