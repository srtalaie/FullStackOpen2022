/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseURL = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (person) => {
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, person) => {
    const request = axios.put(`${baseURL}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAllPersons, createPerson, deletePerson, updatePerson }