/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (person) => {
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

export default { getAllPersons, createPerson }