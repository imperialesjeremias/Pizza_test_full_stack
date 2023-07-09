import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientes } from "../../api/ingrediente";

export const fetchIngredientes = createAsyncThunk("ingredientes/fetchIngredientes", async () => {
    const response = await getIngredientes();
    return response.data;
})