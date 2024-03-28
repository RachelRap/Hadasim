import axios from "axios";
import {deleteMember, getMembers, postMember, updateMember} from '../reducers/memberReducer';
import { getMemberById } from "../reducers/memberReducer";

export const getMembersMidd=({dispatch})=>next=>action=>{
    if(action.type==='GET_MEMBERS'){
        axios.get('http://localhost:8585/api/member/getMembers')
        .then((response)=>{
            dispatch(getMembers(response.data));
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }
    if(action.type==='GET_MEMBER'){
        axios.get(`http://localhost:8585/api/member/getMemberById/${action.payload}`)
        .then((response)=>{
            dispatch(getMemberById(response.data))
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        })
    }
    if(action.type==='POST_MEMBER'){
        const {image,member}=action.payload;
        const formData=new FormData();
        formData.append('image',image);
        formData.append('member',new Blob([JSON.stringify(member)],{type: 'application/json'}));
        axios.post('http://localhost:8585/api/member/uploadMember',formData)
        .then((response)=>{
            dispatch(postMember(response.data))
        })
        .catch((error)=>{
            console.log("the error is:"+ error)
        })
    }
    if(action.type==='UPDATE_MEMBER'){
        const {memberId,member}=action.payload;
        axios.put(`http://localhost:8585/api/member/updateMember2/${memberId}`,member)
        .then((response)=>{
            dispatch(updateMember(response.data))
        })
        .catch((error)=>{
            console.log("the error is:"+ error)
        })
    }
    if(action.type==='DELETE_MEMBER'){
        axios.delete(`http://localhost:8585/api/member/deleteMember/${action.payload}`)
        .then((response)=>{
            dispatch(deleteMember(action.payload))
        })
        .catch((error)=>{
            console.log("the error is:"+ error)
        })
    }
    return next(action)
}