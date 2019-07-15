import _axios from '../plugins/axios';

export const getProxyList = (params)=> _axios.get('/proxy/getList',params);

export const updateProxyList = (params)=> _axios.post('/proxy/updateList',params);

export const resetProxy= (params)=> _axios.get('/proxy/reset',params);

