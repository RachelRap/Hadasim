import React ,{useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


export default function(id){

    const dispatch=useDispatch();

    const corona = useSelector((state) => state.member.currentMember.corona);

    if(corona==-null){
        return <div>Loading...</div>
    }

    const [coronaFrom,setCoronaFrom]=useState({
        id:corona.id,
        positive:corona.positive,
        recovery:corona.recovery,
        vaccineList:corona.vaccineList,
    })

    if (corona === null) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setCoronaFrom((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if (!coronaFrom.positive) {
            alert('Positive date is required');
            return;
        }

    
        const positiveDate=new Date(coronaFrom.positive)
        const currentDate = new Date();
        const recoveryDate = new Date(coronaFrom.recovery);

         if(positiveDate > currentDate){
            alert("Date positiv must be before today's date");
            return;
        }
        if(recoveryDate!=null&&recoveryDate> currentDate){
            alert("Date recovery must be before today's date");
            return;
        }
        if (recoveryDate!=null&&recoveryDate <= positiveDate) {
            alert('Recovery date must be later than the positive date');
            return;
        }
       

        const coronaUpdate={
            id:corona.id,
                positive:coronaFrom.positive,
                recovery:coronaFrom.recovery,
                vaccineList:coronaFrom.vaccineList,
        }

        dispatch({type:"UPDATE_CORONA",payload:{coronaId:id.id,corona:coronaUpdate}})
    }



    return(
        <>
             <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <h2>{"Corona positive: "}</h2>
             <input
                    type="date"
                    name="positive"
                    value={coronaFrom.positive}
                    onChange={handleInputChange}
                    placeholder={coronaFrom.positive}
                />
                <h2>{"date of recovery: "}</h2>
                 <input
                    type="date"
                    name="recovery"
                    value={coronaFrom.recovery}
                    onChange={handleInputChange}
                    placeholder={coronaFrom.recovery}
                />
                <button onClick={handleOnSubmit}>submit</button>
             </form>

        </>
    )
}