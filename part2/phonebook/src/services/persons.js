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

const personService = { getAll, create }

export default personService