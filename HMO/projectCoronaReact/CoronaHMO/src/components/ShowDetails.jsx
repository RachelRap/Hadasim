import React, { useState,useEffect } from "react";
import MemberCard from "./MemberCard";
import CoronaCard from "./CoronaCard";
import './ShowDetails.css'
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShowDetails(){
    const [open, setOpen] = React.useState(false);

    const {id} = useParams();
    console.log("*****",id)
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (id) // הוסף בדיקה כדי לוודא שה-id שונה מה-id הקודם
            dispatch({type: "GET_MEMBER", payload: id})
            
    }, []); // הוסף את member?.id לרשימת התלות של useEffect

   const member = useSelector((state) => state.member.currentMember); 
    console.log("--------",member)
     if (member === null) {
        return <div>Loading...</div>;
    }


    const type="signIn";
    const handleOnClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };
    const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

    return (
        <>
     
        <React.Fragment>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { maxHeight: '180vh' } }} // הוסף סגנון לתיבת הדיאלוג
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <CoronaCard id={member.id}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
      
        <div className="showDetails">
            <div className={containerClass} id="container">
                <MemberCard id={member.id}/>
                {/* <div className="corona-card"><CoronaCard id={member.id}/></div> */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>memberCard</h1>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                memberCard
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>coronaCard!</h1>
                            <button
                                className="ghost "
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                coronaCard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
