import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientes } from "../../api/ingrediente";

export const fetchIngredientes = createAsyncThunk(
  "ingredientes/fetchIngredientes",
  async () => {
    const response = await getIngredientes();
    return response.data;
  }
);

const ingredientesSlice = createSlice({
    name: "ingredientes",
    initialState: [],
    reducers: {},
    extraReducers: (builded) => {
        builded.addCase(fetchIngredientes.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default ingredientesSlice.reducer;