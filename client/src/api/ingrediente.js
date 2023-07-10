import axios from "axios";
import { verify } from "../checkType/verify";

export const getIngredientes = async () => await axios.get('http://localhost:3000/api/ingredientes');

export const getIngrediente = async (id) => await axios.get(`http://localhost:3000/api/ingredientes/${id}`);

export const updatedIngrediente = async (id, values) => {
    const basicToken = localStorage.getItem('basicToken');
    const token = localStorage.getItem('token');
    const headers = {
        Accept: 'application/json',
        Authorization: verify(basicToken, token)
    };
    return await axios.patch(`http://localhost:3000/api/ingredientes/${id}`, values, {headers});
};

export const deleteIngredient = async (id) => {
 const basicToken = localStorage.getItem('basicToken');
 const token = localStorage.getItem('token');
 const headers = {
    Accept: 'application/json',
    Authorization: verify(basicToken, token)
 };
 return await axios.delete(`http://localhost:3000/api/ingredientes/${id}`, { headers} );
}; 