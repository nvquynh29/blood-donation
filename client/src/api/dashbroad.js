import axios from 'axios';
const getDashbroad = () => {
  return axios.get('organization/dashboard')
}