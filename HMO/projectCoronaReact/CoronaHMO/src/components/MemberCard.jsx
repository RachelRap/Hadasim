import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import MemberPut from './MemberPut'


export default function MemberCard(id){

    const dispatch=useDispatch()

    useEffect(()=>{
        if (id.id) 
        dispatch({type: "GET_MEMBER",payload: id.id})
    },[id.id]);

    const member=useSelector((state)=>state.member.currentMember)

    console.log("membercard",member)

    if (member === null) {
        return <div>Loading...</div>;
    }
      
    const[show,setShow]=useState(false)

    const handleShow = () => {
        setShow(true);
    }

    return(
    <>
        <div  style={{ display: 'grid', gridTemplateColumns: '1fr 6fr', alignItems: 'start', gap: '20px' }}>
        <div style={{left: '20px', top: '20px' }}>
        <Avatar
        alt="Member Avatar"
        src={`data:image/*;base64,${member.image}` }
        sx={{ width: 200, height: 200 , top: 0, left: 0 }}
        />
        </div>
        <div>
        <h1>{member.firstName + " " + member.lastName}</h1>
        <h2>{member.tz}</h2>
        <h2>{member.address.street + " " + member.address.numHome + " " + member.address.city}</h2>
        <h2>{member.dateBirth}</h2>
        <h2>{member.cellPhone}</h2>
        <h2>{member.phone}</h2>
        </div>
        </div>
        <div style={{ position: 'fixed', left: '20px', bottom: '20px' }}>
  
        <Fab color="primary" aria-label="add" onClick={handleShow}>
        <EditIcon />
        </Fab>

        </div>
       {show&&<MemberPut id={member.id}></MemberPut>}
         </>
    )
}