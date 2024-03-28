import  React, {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function(id){

    console.log("@@@@@",id.id)

    const dispatch=useDispatch();

    const corona=useSelector((state)=>state.corona.currentCorona)
    if(id.id==-null){
        return <div>Loading...</div>
    }

    const [vaccineFrom,setVaccineFrom]=useState({
        id:0,
        date:"",
        manufacturer:"",
        corona:{id:id.id}
    })

    const handleInputChange = evt => {
        const { name, value } = evt.target;
        setVaccineFrom(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOnSubmit=(event)=>{
        console.log("submit")
        event.preventDefault()

        // בדיקה אם התאריך ריק
    if (!vaccineFrom.date) {
        alert("Date field is required");
        return;
    }

    // בדיקה אם היצרן ריק
    if (!vaccineFrom.manufacturer) {
        alert("Manufacturer field is required");
        return;
    }

    // בדיקה שהתאריך קטן מהתאריך הנוכחי או שווה לו
    const currentDate = new Date();
    const selectedDate = new Date(vaccineFrom.date);
    if (selectedDate > currentDate) {
        alert("Date must be before today's date");
        return;
    }
        const vaccine={
            "id":0,
            "date":vaccineFrom.date,
            "manufacturer":vaccineFrom.manufacturer,
            "corona":{"id":id.id}
            } 

            dispatch({type:'POST_VACCINE',payload:{coronaId:id.id,vaccine:vaccine}})
     }

     return(
        <>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
                <input
                    type="date"
                    name="date"
                    value={vaccineFrom.date}
                    onChange={handleInputChange}
                    placeholder="date"
                />
                <input
                    type="text"
                    name="manufacturer"
                    value={vaccineFrom.manufacturer}
                    onChange={handleInputChange}
                    placeholder="manufacturer"
                ></input>
                <button onClick={handleOnSubmit}>submit</button>
            </form>
        </>
     )
}