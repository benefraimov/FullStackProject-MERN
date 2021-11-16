import React, { useState } from 'react'
import { postNewMember } from '../../DataUtils/BL/membersBL'
import { useHistory } from 'react-router-dom'

const AddMember = () => {
    const [member, setMember] = useState({ Name: "", Email: "", City: "" })
    const [button, setButton] = useState(0)

    const history = useHistory()

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const addMember = async (e) => {
        e.preventDefault()
        if (button === 1) {
            await postNewMember(member)
            console.log("Member Added");
            history.goBack()
        }
        if (button === 2) {
            console.log("Cancel");
            history.goBack()
        }
    }

    return (
        <div>
            <h1>Add New Member</h1>
            <form onSubmit={addMember}>
                <label>Name: </label>
                <input type="text" name="Name" value={member.Name} onChange={handleChange} /><br />
                <label>Email: </label>
                <input type="text" name="Email" value={member.Email} onChange={handleChange} /><br />
                <label>City: </label>
                <input type="text" name="City" value={member.City} onChange={handleChange} /><br />
                <button
                    onClick={() => (setButton(1))}
                    type="submit"
                    name="save"
                >Save</button>
                <button
                    onClick={() => (setButton(2))}
                    type="submit"
                    name="cancel"
                >Cancel</button>
            </form>

        </div>
    )
}

export default AddMember
