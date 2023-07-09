import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feactures/auth/authSlice";
import pizzaReducer from "../feactures/pizzas/pizzasSlice";
import ingredientesReducer from "../feactures/ingredientes/ingredientesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        pizzas: pizzaReducer,
        ingredientes: ingredientesReducer
    }
});