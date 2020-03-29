import axios from 'axios'

export function request(config) {
    //1.create an axios's instance(实例)
    const instance = axios.create({
        // baseURL : "http://152.136.185.210:8000/api/h3",
        // baseURL :  "http://123.207.32.32:8000/api/h3",
        baseURL : "http://106.54.54.237:8000/api/h3",
        timeout: 5000
    })
    //2. the intercreptors of request 请求拦截
    instance.interceptors.request.use(config => {
        // Do something before request is sent
        return config;
    }, error => {
        // Do something with request error
        return error
    });
    //3. the intercreptors of response 响应拦截
    instance.interceptors.response.use(response => {
        // Do something before response is sent
        return response.data;
    },error => {
        // Do something with response error
        if(error&&error.response){
            switch(error.response.status){
                case 400:
                    error.message = '请求错误'
                    break;
                case 401:
                    error.message = '未授权的访问'
                    break;
            }
        }
        return error
    });
    return instance(config);

}
