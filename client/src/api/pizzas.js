import axios from 'axios'
import { verify } from '../checkType/verify'

export const getPizzas = async () => await axios.get("http://localhost:3000/api/pizzas")
export const getPizzaDetalle = async (id) => await axios.get(`http://localhost:3000/api/pizzas/${id}/detalle`)
export const getPizza = async (id) => axios.get(`http://localhost:3000/api/pizzas/${id}`)

export const createPizza = async (pizza) => {
    const basicToken = localStorage.getItem('basicToken');
    const token = localStorage.getItem('token');
    const headers = {
        Accept: 'application/json',
        Authorization: verify(basicToken, token)
    };
    return await axios.post('http://localhost:3000/api/pizzas', pizza, {headers});
};

export const addIngrediente = async (pizzaId, ingredienteId) => await axios.post(`http://localhost:3000/api/pizzas/${pizzaId}/ingredientes/${ingredienteId}`)

export const updatePizza = async (id, pizza) => {
    const basicToken = localStorage.getItem('basicToken');
    const token = localStorage.getItem('token');
    const headers = {
        Accept: 'application/json',
        Authorization: verify(basicToken, token)
    };

    return await axios.patch(`http://localhost:3000/api/pizzas/${id}`, pizza, { headers });
};