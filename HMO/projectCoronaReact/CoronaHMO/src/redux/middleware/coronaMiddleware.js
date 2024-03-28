import axios from 'axios';
import { deleteCorona, getCorona, getCoronaById, updateCorona } from '../reducers/coronaReducer';

export const getCoronaMidd=({dispatch})=>next=>action=>{
    if(action.type==='GET_CORONA'){
        axios.get('http://localhost:8585/api/corona/getCorona')
        .then((response)=>{
            dispatch(getCorona(response.data));
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }
    if(action.type==='GET_CORONA_BY_ID'){
        axios.get(`http://localhost:8585/api/corona/getCoronaById/${action.payload}`)
        .then((response)=>{
            dispatch(getCoronaById(response.data))
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }
    if(action.type==='UPDATE_CORONA'){
        const {coronaId,corona}=action.payload;
        axios.put(`http://localhost:8585/api/corona/updateCorona/${coronaId}`,corona)
        .then((response)=>{
            dispatch(updateCorona(response.data))
         })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }
    if(action.type==='DELETE_CORONA'){
        axios.delete(`http://localhost:8585/api/corona/deleteCorona/${action.payload}`)
        .then((response)=>{
            dispatch(deleteCorona(action.payload))
        })
        .catch((error)=>{
            console.log("the error is:"+ error)
        })
    }
    return next(action);
}