import ISchedule from "@/model/Schedule.interface";
import axios from "axios";

axios.defaults.baseURL = "http://localhost/api/";
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/**
 * Get Token
 */
export const getToken = (): {} | boolean => {
        
        const data = localStorage.getItem('LoggedUser') ?? "";
        if(!data){
            return false
        }
        const dataTemp = JSON.parse(data);

        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataTemp.token}`
        }
}

/**
 * Get all schedules from this user
 */
export const list = (): Promise<ISchedule[]> => 
{
    return new Promise((resolve, reject) => {

        const headers = getToken();

        axios.get('schedule/list', {headers})
            .then(response => resolve(response.data.data))
            .catch(error => reject(error));
    })
}

/** 
 * Delete Schedule Item 
 * */
export const deleteItem = (item: number): Promise<any> => 
{
    return new Promise((resolve, reject) => {

        const headers = getToken();

        axios.delete('schedule/delete/' + item, {headers})
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
}

/**
 * Add new schedule
 * @param data Data -> Schedule Interface
 */
export const addItem = (data: ISchedule): Promise<any> =>
{
    return new Promise((resolve, reject) => {
        const headers = getToken();

        axios.post('schedule/new', {
            title: data.title, 
            description: data.description, 
            date: data.date 
        }, {headers})
            .then(response => resolve(response))
            .catch(error => reject(error));
    })
}
