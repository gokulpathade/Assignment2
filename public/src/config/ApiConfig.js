
import axios from 'axios';

const ApiConfig = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export default ApiConfig;
