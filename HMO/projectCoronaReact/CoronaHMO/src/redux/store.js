import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./reducers/memberReducer";
import { getMembersMidd } from "./middleware/memberMiddleware";
import coronaReducer from "./reducers/coronaReducer";
import { getCoronaMidd } from "./middleware/coronaMiddleware";
import vaccineReducer from "./reducers/vaccineReducer";
import { getVaccineMidd } from "./middleware/vaccineMiddleware";


export const store=configureStore({
    reducer:{
        member:memberReducer,
        corona:coronaReducer,
        vaccine:vaccineReducer
    },
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware({serializableCheck:false}),getMembersMidd,getCoronaMidd,getVaccineMidd]
})