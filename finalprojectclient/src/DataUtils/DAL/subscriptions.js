import axios from 'axios'


const getSubscriber = (id) => {
    return axios.get('http://localhost:8001/api/subscriptions/' + id)
}

const getSubscribers = () => {
    return axios.get('http://localhost:8001/api/subscriptions')
}

const postSubscription = (obj) => {
    return axios.post('http://localhost:8001/api/subscriptions', obj)
}

// Check Later..
const updateOrPostSubscription = (id, obj) => {
    return axios.post('http://localhost:8001/api/subscriptions/' + id, obj)
}

const deleteAndUpdateSubscriptionMoviesById = (id) => {
    return axios.put('http://localhost:8001/api/subscriptions/' + id)
}

const deleteSubscription = (id) => {
    return axios.delete('http://localhost:8001/api/subscriptions/' + id)
}

const deleteSubscriber = (id) => {
    return axios.delete('http://localhost:8001/api/subscriptions/' + id)
}

export {
    getSubscriber,
    postSubscription,
    updateOrPostSubscription,
    deleteSubscription,
    deleteSubscriber,
    getSubscribers,
    deleteAndUpdateSubscriptionMoviesById
}