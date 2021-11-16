import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Member from '../../Compoenents/Member'
import { getAllMembers, deleteExistingMember } from '../../DataUtils/BL/membersBL'

const AllMembers = () => {
    const [flag, setFlag] = useState(false)
    const [members, setMembers] = useState([{ _id: "", Name: "", Email: "", City: "" }])
    let { url } = useRouteMatch()

    useEffect(() => {
        async function getMembers() {
            const res = await getAllMembers()
            setMembers(res)
        }
        getMembers()
    }, [flag])

    const deleteMember = async (userId) => {
        await deleteExistingMember(userId)
        setFlag(!flag)
        console.log("Deleted")
    }

    const membersRepeater = members.map(member => {
        return <Member
            key={member._id}
            member={member}
            callback={deleteMember}
            link={url + '/editmember'}
        />
    })
    return (

        <div className={'allUsers'}>
            {membersRepeater}
        </div>

    )
}

export default AllMembers

