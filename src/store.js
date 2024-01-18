import { create } from 'zustand';
import axios from 'axios';


const request = axios.create({
    baseURL: process.env.REACT_APP_baseURL,
    timeout: 1000
});



export const useStore = create((set) => {
    return {

        data: [],
        status: false,
        getData: () => {
            set({ status: false });
            request.get('/')
                .then(res => {
                    set({ data: res.data, status: true });
                })
            //.catch(()=>{ console.log(err);}) //에러코드 찾기
        },

        postData: (forms) => {
            request.post('/', forms)
                .then(res => {
                    set({ data: res.data, status: true });
                })
        },
        putData: (forms) => {
            request.put(`/`, forms)
                .then(res => {
                    set({ data: res.data, status: true });
                })
        },

        deleteData: (id) => {
            request.delete(`/${id}`)
                .then(res => {
                    set({ data: res.data, status: true });
                })
        }
    }
});