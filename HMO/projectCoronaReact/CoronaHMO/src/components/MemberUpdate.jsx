import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

export default function MemberUpdate(id) {
    
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member.currentMember);

    useEffect(() => {
        if (id.id) {
            dispatch({ type: "GET_MEMBER", payload: id.id });
        }
    }, [dispatch, id.id]);

    const [memberForm, setMemberForm] = useState({
        id: "",
        firstName: "",
        lastName: "",
        tz: "",
        dateBirth: "",
        phone: "",
        cellPhone: "",
        address: {
            id: "",
            city: "",
            street: "",
            numHome: "",
        },
        corona: { id: "" },
    });

    useEffect(() => {
        if (member !== null) {
            setMemberForm({
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
                image: member.image
            });
        }
    }, [member]);

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

    const handleform = (event) => {
        event.preventDefault();
        const newImage = event.target.files[0];
        console.log("---------------------------------------------------------------------------------------------")
        handleOnSubmit(newImage);
    };

    const handleOnSubmit = (newImage) => {
        console.log("new image:", newImage);
        // נבדוק האם התמונה החדשה קיימת
        if (newImage) {
            // כאן נמשיך עם הפעולות הנדרשות עבור תמונה חדשה
            const filename = newImage.name;
            const reader = new FileReader();
            reader.readAsDataURL(newImage);
            reader.onloadend = () => {
                const dataUrl = reader.result;
                const imageFile = dataURLtoFile(dataUrl, filename);
                dispatchUpdatedData(imageFile);
            };
        } else {
            console.log("--------------------------------------------------------------------------")
            // כאן נמשיך עם הפעולות הנדרשות במקרה של אי קיום תמונה חדשה
            dispatchUpdatedData(null);
        }
    };

    const dispatchUpdatedData = (imageFile) => {
        console.log("------------------------------")
        if(!imageFile){
            imageFile=memberForm.image
        }
        const MemberUpdate = {
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
            corona: { id: memberForm.corona.id },
        };

        dispatch({
            type: 'UPDATE_MEMBER',
            payload: {
                memberId: id.id,
                image: imageFile,
                member: MemberUpdate,
            },
        });
    };

    function dataURLtoFile(dataUrl, filename) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const byteString = atob(arr[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
        return new File([uint8Array], filename, { type: mime });
    }

    return (
       
        <>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '100px' }} >
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
                <input
                    type="file"
                    multiple
                    name="image"
                    onChange={handleform}
                    placeholder={null}
                />
                <button type="submit" onClick={handleOnSubmit}>Submit</button>
            </form>
        </>
    );
}

