import instance from '../utils/request';

let request = 'http://112.74.176.108:8081'

/**
 * 学生登录
 * @param data
 * @returns {AxiosPromise}
 */
export const studentLogin = (data) => {
    return instance({
        url: `${request}/login/student`,
        method: 'post',
        data: data
    });
}

/**
 * 教师登录
 * @param data
 * @returns {AxiosPromise}
 */
export const teacherLogin = (data) => {
    return instance({
        url: `${request}/login/teacher`,
        method: 'post',
        data: data
    });
}

// 教师管理
/**
 * 添加消息
 * @param data
 * @returns {AxiosPromise}
 */
export const addInformation = (data) => {
    return instance({
        url: `${request}/teacher/addInformation`,
        method: 'post',
        data: data
    });
}

/**
 * 添加没有图片的题目
 * @param data
 * @returns {AxiosPromise}
 */
export const addTopicNoPicture = (data) => {
    return instance({
        url: `${request}/teacher/addTopicNoPicture`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data'}
    })
}

/**
 * 修改个人信息
 * @param data
 * @returns {AxiosPromise}
 */
export const updateInformation = (data) => {
    return instance({
        url: `${request}/teacher/updateInformation`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data'}
    });
}

/**
 * 获取个人信息
 * @param params
 * @returns {AxiosPromise}
 */
export const getInformation = (params) => {
    return instance({
        url: `${request}/teacher/getInformation`,
        method: 'get',
        params: params
    });
}

/**
 * 获取所有班级
 * @param params
 * @returns {AxiosPromise}
 */
export const getClass = (params) => {
    return instance({
        url: `${request}/teacher/getClass`,
        method: 'get',
        params: params
    })
}

/**
 * Excel 批量导入学生信息
 * @param data
 * @returns {AxiosPromise}
 */
export const inputByExcel = (data) => {
    return instance({
        url: `${request}/teacher/inputByExcel`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data'}
    })
}

/**
 * 获取指定班级的学生
 * @param params
 * @returns {AxiosPromise}
 */
export const getStudentByClass = (params) => {
    return instance({
        url: `${request}/teacher/getStudentByClass`,
        method: 'get',
        params: params
    })
}
