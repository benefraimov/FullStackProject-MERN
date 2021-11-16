import React, { useEffect, useState } from 'react'
import '../Styles/style.css'
import { getAllSubscribers } from '../DataUtils/BL/subscriptionsBL'
import { getMemberById } from '../DataUtils/BL/membersBL'

const SubscriptionsWatched = (props) => {
    const [watchedSubs, setWatchedSubs] = useState([])
    const [usersId, setUsersId] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        async function testSome() {
            const subscribers = await getAllSubscribers()
            subscribers.forEach(async (subscriber) => {
                subscriber.Movies.forEach(async (movie) => {
                    if (movie.movieId === props.movie._id) {
                        let memberObj = {
                            MemberId: subscriber.MemberId,
                            MovieDate: movie.date ? movie.date.slice(0, 10) : movie.date
                        }
                        await setUsersId(state => [...state, memberObj])
                        setFlag(!flag)
                    }
                })
            })
        }
        testSome()
    }, [])

    useEffect(() => {
        function getSubscribers() {
            if (usersId.length > 0) {
                usersId.forEach(async (userId) => {
                    const member = await getMemberById(userId.MemberId)
                    let itemObj = {
                        Id: member[0]._id,
                        Name: member[0].Name,
                        MovieDate: userId.MovieDate
                    }
                    setWatchedSubs(state => [...state, itemObj])
                })
            }
        }
        getSubscribers()
    }, [flag])


    const watchedRepeater =
        watchedSubs.map(sub => {
            return <li key={sub.Id}>{sub.Name}, {sub.MovieDate}</li>
        })



    return (
        <div>
            <h3>Subscriptions watched</h3>
            <ul>{watchedRepeater}</ul>
        </div>
    )
}

export default SubscriptionsWatched
