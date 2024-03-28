import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import "./MemberList.css"

export default function MemberList(){

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch({type:"GET_MEMBERS"})
    },[])

    const membersList=useSelector((state)=>state.member.listMembers)

    if (membersList.length === 0) {
        return <div>Loading...</div>;
    }

    const handleDelete=(e)=>{
        dispatch({type:'DELETE_MEMBER',payload:e})
        window.location.reload();
    }

      
    return(
        <>
      <Grid item xs={2}>
        <Grid container justifyContent="center" spacing={3} sx={{marginTop: '20px',marginBottom: '20px',marginLeft:'30px'}}>
          {membersList.map((member,index) => (
            <Grid key={index} item>
              <div className="card">
                <img src={`data:image/*;base64,${member.image}` }  style={{ width: '100%', height: '350px' }}></img>
                <h2>{member.firstName+' '+member.lastName}</h2>
  
                <IconButton  aria-label="delete" onClick={() => handleDelete(member.id)}>
                            <DeleteIcon />
                </IconButton>
                <Link to={`/ShowDetails/${member.id}`}>
                    <Button variant="text"style={{width:"100%"}}>Show more</Button>
                </Link>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Link to="/MemberAdd">
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Link>
      
        </>  )
}