import {
    getSubscriber,
    postSubscription,
    updateOrPostSubscription,
    deleteSubscription,
    deleteSubscriber,
    getSubscribers,
    deleteAndUpdateSubscriptionMoviesById
} from '../DAL/subscriptions'

// Get a subscriber and all of his subscriptions
const getExistingSubscriberById = async (id) => {
    const { data: res } = await getSubscriber(id)
    return res
}

const getAllSubscribers = async () => {
    const { data: res } = await getSubscribers()
    return res
}

const postNewSubscription = async (obj) => {
    const { data: res } = await postSubscription(obj)
    return res
}

const updateExistingSubscription = async (id, obj) => {
    const { data: res } = await updateOrPostSubscription(id, obj)
    return res
}

const deleteMovieFromSubscribersByMovieId = async (id) => {
    const { data: res } = await deleteAndUpdateSubscriptionMoviesById(id)
    return res
}

// Deleting an existing subscription to a movie.
const deleteExistingSubscriber = async (id) => {
    const { data: res } = await deleteSubscriber(id)
    return res
}

// Deleting an existing subscriber and all his subscription movies.
const deleteExistingSubscription = async (id) => {
    const { data: res } = await deleteSubscription(id)
    return res
}

export {
    getExistingSubscriberById,
    getAllSubscribers,
    postNewSubscription,
    updateExistingSubscription,
    deleteMovieFromSubscribersByMovieId,
    deleteExistingSubscriber,
    deleteExistingSubscription
}