import axios from 'axios'
import {
  ALL_PROVINCE_QUERY,
  DEFAULT_DEPTH_LENGTH,
  DISTRICT_QUERY,
  PROVINCE_BASE_URL,
} from './endpoint'
export const getAllProvinces = () => axios.get(PROVINCE_BASE_URL + DEFAULT_DEPTH_LENGTH)
