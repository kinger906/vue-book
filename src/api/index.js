import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'

export let getSliders = ()=>{
  return axios.get('/sliders');
}

export let getHotBooks = ()=>{
  return axios.get('/hot');
}

export let getBooks = ()=>{
  return axios.get('/book');
}

export let removeBook = (id) =>{
  return axios.delete(`/book?id=${id}`);
}

export let getOneBook = (id) =>{
  return axios.get(`/book?id=${id}`);
}

export let updateBook = (id,data) =>{
  return axios.put(`/book?id=${id}`,data);
}

export let addBook = (data) =>{
  return axios.post('/book',data);
}

//首页：slider和hot合并请求，优化首页loading效果
export let getAll = ()=>{
  return axios.all([getSliders(),getHotBooks()]);
}

//分页显示列表数据
export let getPageBook = (offset)=>{
  return axios.get(`/page?offset=${offset}`);
}