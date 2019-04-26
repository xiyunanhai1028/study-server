import axios from 'axios';

let base = 'https://www.shuoloveting.com';
function getToken () {
  let token= ''
if (sessionStorage.getItem('user')) {
    token = JSON.parse(sessionStorage.getItem('user')).token;
    // console.log(this.headers)
  }
axios.defaults.headers.token = token;
}
export const requestLogin = params => { return axios.post(`${base}/strs/edu/user/login`, params).then(res => res.data); };
export const uploadFile = params => {  getToken ();return axios.post(`${base}/strs/system/uploadFile`, params).then(res => res.data); };
export const parseSinglePaper = params => { getToken ();return axios.post(`${base}/strs/system/parsePaper`, params).then(res => res.data); };
// export const parseSinglePaper = params => { return axios.post(`${base}/strs/system/parseSinglePaper`, { params: params }); };
export const getTeacherList = params => {getToken (); return axios.post(`${base}/strs/system/getTeacherList`, params).then(res => res.data); };
export const addTeacherList = params => { getToken ();return axios.post(`${base}/strs/system/createTeacher`, params).then(res => res.data); };
export const getScrollImageList = params => {getToken (); return axios.post(`${base}/strs/system/getScrollImageList`, params).then(res => res.data); };
export const addScrollImage = params => {getToken (); return axios.post(`${base}/strs/system/addScrollImage`, params).then(res => res.data); };
export const addVipOffline = params => {getToken (); return axios.post(`${base}/strs/course/addVipOffline`, params).then(res => res.data); };
export const setActivity = params => {getToken (); return axios.post(`${base}/strs/system/setActivity`, params).then(res => res.data); };
export const createCourse = params => {getToken (); return axios.post(`${base}/strs/system/createCourse`, params).then(res => res.data); };
export const getStudentPaper = params => {getToken (); return axios.post(`${base}/strs/system/getStudentPaper`, params).then(res => res.data); };
export const getPaperDetail = params => {getToken (); return axios.post(`${base}/strs/system/getPaperDetail`, params).then(res => res.data); };
export const pushTeacherReply = params => {getToken (); return axios.post(`${base}/strs/system/pushTeacherReply`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };