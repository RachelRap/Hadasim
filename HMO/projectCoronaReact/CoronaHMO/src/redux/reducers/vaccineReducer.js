import {createSlice} from '@reduxjs/toolkit'

const initialState={
    listVaccine:[],
    currentListVaccine:[]
}

export const vaccineSlice=createSlice({
    name:"vaccine",
    initialState,
    reducers:{
        getVaccine:(state,action)=>{
            state.listVaccine=(action.payload);
        },
        postVaccineByCoronaId:(state,action)=>{
            state.currentListVaccine.push(action.payload);
            state.listVaccine.push(action.payload)
        }
    }
})

export const{getVaccine,postVaccineByCoronaId}=vaccineSlice.actions
export default vaccineSlice.reducer