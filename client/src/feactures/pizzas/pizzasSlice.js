import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getPizzas, getPizzaDetalle, addIngrediente} from "../../api/pizzas";
import {createSelector} from "reselect";

export const fetchPizzas= createAsyncThunk(
    "pizzas/fetchPizzas",
    async () => {
        const res = await getPizzas();
        return res.data.pizzas;
    }
);

export const fetchPizzaDetalle = createAsyncThunk(
    "pizzas/fetchPizzaDetalle",
    async (id) => {
        const res =  await getPizzaDetalle(id);
        return res.data;
    }
);

export const createPizza = createAsyncThunk(
    "pizzas/createPizza",
    async (pizzaData) => {
        const res = await createPizza(pizzaData);
        return res.data;
    }
);

export const addIngredientes = createAsyncThunk(
    "pizzas/addIngrediente",
    async (pizzaId, ingredienteId) => {
        const res = await addIngrediente(pizzaId, ingredienteId);
        return res.data;
    }
);

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState: {},
    reducers: {},
    extraReducers: (builded) => {
        builded.addCase(fetchPizzas.fulfilled, (state, action) => {
            return action.payload;
        });
        builded.addCase(createPizza.fulfilled, (state, action) => {
            console.log(actionl.payload);
        });
        builded.addCase(fetchPizzaDetalle.fulfilled, (state, action) => {
            return {...state, pizzaDetalle: action.payload};
        });
    },
    immer: false,
});

export default pizzasSlice.reducer;

export const selectPizzaDetalle = createSelector(
    (state) => state.pizzas,
    (pizzas) => pizzas.pizzaDetalle
);

