import axios from 'axios';
import { getVaccine, postVaccineByCoronaId } from '../reducers/vaccineReducer';

export const getVaccineMidd=({dispatch})=>next=>action=>{
    if(action.type==='GET_VACCINE'){
        axios.get('http://localhost:8585/api/vaccines/getVaccine')
        .then((respone)=>{
            dispatch(getVaccine(respone.data))
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }
    if(action.type==="POST_VACCINE"){
        const {coronaId,vaccine}=action.payload;
        axios.post(`http://localhost:8585/api/vaccines/uploadVaccineByCoronaId/${coronaId}`,vaccine,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((respone)=>{
            dispatch(postVaccineByCoronaId(respone.data))
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }

    return next(action)
}