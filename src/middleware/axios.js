const axios = require('axios');
//cd06accc7cba9e0b48b4d3106f3ea4359f593725
const AUTH_TOKEN = `Token b2d48b7bbb6db8b2fa66f1c6f36389594589c909`;
axios.defaults.baseURL = 'https://api.brasil.io/dataset/covid19/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//caso/data/?state=PR&date=2020-05-10
const post = async (dados) => {
    axios.defaults.baseURL = 'https://us-central1-lms-nuvem-mestra.cloudfunctions.net';
    const axiosPost = axios.create({
        baseURL: 'https://us-central1-lms-nuvem-mestra.cloudfunctions.net',
        headers: { 'MeuNome': 'Joel de Paula' }
    });
    const valor = await axiosPost.post('/testApi', dados)
    return valor;
}
module.exports = { axios, post };