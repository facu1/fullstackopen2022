import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(({ data }) => data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(({ data }) => data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const personService = { getAll, create, remove }

export default personService