import React ,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


export default function MemberPut(id){

    const dispatch=useDispatch();
    const currentDate = new Date(); // תאריך היום הנוכחי

    const member = useSelector((state) => state.member.currentMember);

    if(member==-null){
        return <div>Loading...</div>
    }

    const [memberForm, setMemberForm] = useState({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        tz: member.tz,
        dateBirth: member.dateBirth,
        phone: member.phone,
        cellPhone: member.cellPhone,
        address: {
            id: member.address.id,
            city: member.address.city,
            street: member.address.street,
            numHome: member.address.numHome,
        },
        corona: { id: member.corona.id },
    });

    if (member === null) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setMemberForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressChange = (evt) => {
        const { name, value } = evt.target;
        setMemberForm((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    const handleOnSubmit = (event) => {
        event.preventDefault()
        
        // בדיקת תקינות הקלטים
        if (memberForm.tz.length !== 9) {
            alert('The ID number must be 9 characters long');
            return;
        }
        

        if (memberForm.phone.length !== 9) {
            alert('The phone number must be 9 characters long');
            return;
        }

        if (memberForm.cellPhone.length !== 10) {
            alert('The cellphone number must be 10 characters long');
            return;
        }

        const dateOfBirth = new Date(memberForm.dateBirth);

        // בדיקה שהתאריך dateBirth קטן מהתאריך הנוכחי
        if (dateOfBirth >= currentDate) {
            alert("Date of Birth must be before today's date");
            return;
        }

       

        const memberUpdate={
            id: memberForm.id,
            firstName: memberForm.firstName,
            lastName: memberForm.lastName,
            tz: memberForm.tz,
            dateBirth: memberForm.dateBirth,
            phone: memberForm.phone,
            cellPhone: memberForm.cellPhone,
            address: {
                id: memberForm.address.id,
                city: memberForm.address.city,
                street: memberForm.address.street,
                numHome: memberForm.address.numHome,
            },
            corona: { id: memberForm.corona.id }
        }

        dispatch({type:"UPDATE_MEMBER",payload:{memberId:id.id,member:memberUpdate}})
    }



    return(
        
        <>
        <h1>update details</h1>
             <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <input
                    type="text"
                    name="firstName"
                    value={memberForm.firstName}
                    onChange={handleInputChange}
                    placeholder={memberForm.firstName}
                />
                <input
                    type="text"
                    name="lastName"
                    value={memberForm.lastName}
                    onChange={handleInputChange}
                    placeholder={memberForm.lastName}
                />
                <input
                    type="text"
                    name="tz"
                    value={memberForm.tz}
                    onChange={handleInputChange}
                    placeholder={memberForm.tz}
                />
                <input
                    type="date"
                    name="dateBirth"
                    value={memberForm.dateBirth}
                    onChange={handleInputChange}
                    placeholder={memberForm.dateBirth}
                />
                <input
                    type="text"
                    name="phone"
                    value={memberForm.phone}
                    onChange={handleInputChange}
                    placeholder={memberForm.phone}
                />
                <input
                    type="text"
                    name="cellPhone"
                    value={memberForm.cellPhone}
                    onChange={handleInputChange}
                    placeholder={memberForm.cellPhone}
                />
                <input
                    type="text"
                    name="city"
                    value={memberForm.address.city}
                    onChange={handleAddressChange}
                    placeholder={memberForm.address.city}
                />
                <input
                    type="text"
                    name="street"
                    value={memberForm.address.street}
                    onChange={handleAddressChange}
                    placeholder={memberForm.address.street}
                />
                <input
                    type="number"
                    name="numHome"
                    value={memberForm.address.numHome}
                    onChange={handleAddressChange}
                    placeholder={memberForm.address.numHome}
                />
               <button type="submit" onClick={handleOnSubmit}>Submit</button>
            </form>
             

        </>
    )
}