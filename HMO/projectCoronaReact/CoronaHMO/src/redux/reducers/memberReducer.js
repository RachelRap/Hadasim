import {createSlice} from "@reduxjs/toolkit"

const initialState={
    listMembers:[],
    currentMember:null
}

export const memberSlice=createSlice({
    name:"member",
    initialState,
    reducers:{
        getMembers:(state,action)=>{
            state.listMembers=(action.payload);
        },
        getMemberById:(state,action)=>{
            state.currentMember=(action.payload)
        },
        postMember:(state,action)=>{
            state.listMembers.push=(action.payload);
        },
        updateMember:(state,action)=>{
            state.currentMember=action.payload;
            listMembers.map((member)=>{
                if(member.id===currentMember.id)
                    member=currentMember;
            })
        },
        deleteMember:(state,action)=>{
            state.listMembers.filter((menubar)=>{
                member.id!=action.payload
            })
        }
    }
}) 

export const{getMembers,getMemberById,postMember,updateMember,deleteMember}=memberSlice.actions
export default memberSlice.reducer
