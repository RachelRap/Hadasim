import {createSlice} from "@reduxjs/toolkit"

const initialState={
    listCorona:[],
    currentCorona:null
}

export const coronaSlice=createSlice({
    name:"corona",
    initialState,
    reducers:{
        getCorona:(state,action)=>{
            state.listCorona=(action.payload);
        },
        getCoronaById:(state,action)=>{
            state.currentCorona=(action.payload);
        },
        updateCorona:(state,action)=>{
            state.currentCorona=action.payload;
            listCorona.map((corona)=>{
                if(corona.id===currentCorona.id)
                    corona=currentCorona;
            })
        },
        deleteCorona:(state,action)=>{
            state.listCorona.filter((corona)=>{
                corona.id!=action.payload
            })
        }
    }
})
export const{getCorona,getCoronaById,updateCorona,deleteCorona}=coronaSlice.actions
export default coronaSlice.reducer