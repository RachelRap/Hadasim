import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function MemberAdd() {
    const dispatch = useDispatch();

    const [memberForm, setMemberForm] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        tz: "",
        dateBirth: "",
        phone: "",
        cellPhone: "",
        address: {
            id: 0,
            city: "",
            street: "",
            numHome: 1
        },
        corona: { id: 1 }
    });
    const [image, setImage] = useState();

    const handleInputChange = evt => {
        const { name, value } = evt.target;
        setMemberForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = evt => {
        const { name, value } = evt.target;
        setMemberForm(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };

    const handleForm = event => {
        event.preventDefault();
        // אם המשתמש בחר קובץ חדש
        if (event.target.files.length > 0) {
            // השמת הקובץ שנבחר כערך של image
            setImage(event.target.files[0]);
        }
    };

    const currentDate = new Date(); // תאריך היום הנוכחי

    const handleOnSubmit = event => {
        event.preventDefault();


        if (!memberForm.firstName) {
            alert("First Name is required");
            return;
        } else if (!memberForm.lastName) {
            alert("Last Name is required");
            return;
        } else if (!memberForm.tz) {
            alert("TZ is required");
            return;
        } else if (!memberForm.dateBirth) {
            alert("Date of Birth is required");
            return;
        } else if (!memberForm.phone) {
            alert("Phone is required");
            return;
        } else if (!memberForm.cellPhone) {
            alert("Cell Phone is required");
            return;
        } else if (!memberForm.address.city) {
            alert("City is required");
            return;
        } else if (!memberForm.address.street) {
            alert("Street is required");
            return;
        } else if (!memberForm.address.numHome) {
            alert("Number of Home is required");
            return;
        } else if (!image) {
            alert("Image is required");
            return;
        }

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

        const member = {
            id: 0,
            firstName: memberForm.firstName,
            lastName: memberForm.lastName,
            tz: memberForm.tz,
            dateBirth: memberForm.dateBirth,
            phone: memberForm.phone,
            cellPhone: memberForm.cellPhone,
            address: {
                id: 0,
                city: memberForm.address.city,
                street: memberForm.address.street,
                numHome: memberForm.address.numHome
            },
            corona: { id: 0 }
        };

        // שליחת התמונה כחלק מפרמטר האקשן
        dispatch({ type: 'POST_MEMBER', payload: { image, member } });
    };

    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
                <input
                    type="text"
                    name="firstName"
                    value={memberForm.firstName}
                    onChange={handleInputChange}
                    placeholder="firstName"
                ></input>
                <input
                    type="text"
                    name="lastName"
                    value={memberForm.lastName}
                    onChange={handleInputChange}
                    placeholder="lastName"
                ></input>
                <input
                    type="text"
                    name="tz"
                    value={memberForm.tz}
                    onChange={handleInputChange}
                    placeholder="tz"
                ></input>
                <input
                    type="date"
                    name="dateBirth"
                    value={memberForm.dateBirth}
                    onChange={handleInputChange}
                    placeholder="Date of Birth"
                ></input>
                <input
                    type="text"
                    name="phone"
                    value={memberForm.phone}
                    onChange={handleInputChange}
                    placeholder="phone"
                ></input>
                <input
                    type="text"
                    name="cellPhone"
                    value={memberForm.cellPhone}
                    onChange={handleInputChange}
                    placeholder="cellPhone"
                ></input>
                <input
                    type="text"
                    name="city"
                    value={memberForm.address.city}
                    onChange={handleAddressChange}
                    placeholder="city"
                ></input>
                <input
                    type="text"
                    name="street"
                    value={memberForm.address.street}
                    onChange={handleAddressChange}
                    placeholder="street"
                ></input>
                <input
                    type="number"
                    name="numHome"
                    value={memberForm.address.numHome}
                    onChange={handleAddressChange}
                    placeholder="numHome"
                ></input>
                <input
                    type="file"
                    multiple
                    name="image"
                    onChange={handleForm}
                    placeholder="image"
                ></input>
               
               <button onClick={handleOnSubmit}>submit</button>
            </form>
        </>
    );
}
