import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { updateExistingMember, getMemberById } from '../../DataUtils/BL/membersBL'

const EditMember = () => {
    const [member, setMember] = useState({ Name: "", Email: "", City: "" })
    const [button, setButton] = useState(0)

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        async function getMember() {
            const { [0]: res } = await getMemberById(id)
            setMember(res)
        }
        getMember()
    }, [id])


    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const editMovie = async (e) => {
        e.preventDefault()
        if (button === 1) {
            await updateExistingMember(id, member)
            console.log("Updated");
            history.goBack()
        }
        if (button === 2) {
            console.log("Cancel");
            history.goBack()
        }
    }

    return (
        <div>
            <h1>Edit Member :Member Name</h1>
            <form onSubmit={editMovie}>
                <label>Name: </label>
                <input type="text" name="Name" value={member.Name} onChange={handleChange} /><br />
                <label>Email: </label>
                <input type="text" name="Email" value={member.Email} onChange={handleChange} /><br />
                <label>City: </label>
                <input type="text" name="City" value={member.City} onChange={handleChange} /><br />
                <button
                    onClick={() => (setButton(1))}
                    type="submit"
                    name="update"
                >Update</button>
                <button
                    onClick={() => (setButton(2))}
                    type="submit"
                    name="cancel"
                >Cancel</button>
            </form>

        </div>
    )
}

export default EditMember
