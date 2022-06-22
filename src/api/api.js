import instance from '../utils/request';

// let request = 'http://112.74.176.108:8089'
const request = 'https://www.katechian.xyz'
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
 * 获取发布的任务
 * @param params
 * @returns {AxiosPromise}
 */
export const getReleaseTask = (params) => {
    return instance({
        url: `${request}/teacher/getReleaseTask`,
        method: 'get',
        params: params
    })
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
 * 教师发布任务
 * @param data
 * @returns {AxiosPromise}
 */
export const addTask = (data) => {
    return instance({
        url: `${request}/teacher/addTask`,
        method: 'post',
        data: data
    })
}

/**
 * 根据教师 id 获取通知
 * @param params
 * @returns {AxiosPromise}
 */
export const getMessageByTeacherId = (params) => {
    return instance({
        url: `${request}/teacher/getMessageByTeacherId`,
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

// 学生端
/**
 * 修改学生个人信息
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
export const stUpdateInformation = (data) => {
    return instance({
        url: `${request}/student/updateInformation`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data'}
    })
}

/**
 * 获取学生信息
 * @param params
 * @returns {AxiosPromise}
 */
export const getStudentInformation = (params) => {
    return instance({
        url: `${request}/student/getInformation`,
        method: 'get',
        params: params
    })
}

/**
 * 获取学生所在班级
 * @param params
 * @returns {AxiosPromise}
 */
export const getClassByStudentId = (params) => {
    return instance({
        url: `${request}/student/getClass`,
        method: 'get',
        params: params
    })
}

/**
 * 修改学生密码
 * @param data
 * @returns {AxiosPromise}
 */
export const updateStudentPassword = (data) => {
    return instance({
        url: `${request}/login/updatePassword`,
        method: 'post',
        data: data
    })
}

/**
 * 根据学生 Id 获取通知
 * @param params
 * @returns {AxiosPromise}
 */
export const getMessageByStudentId = (params) => {
    return instance({
        url: `${request}/student/getMessageByStudentId`,
        method: 'get',
        params: params
    })
}

/**
 * 查收通知
 * @param params
 * @returns {AxiosPromise}
 */
export const checkMessage = (params) => {
    return instance({
        url: `${request}/student/checkMessage`,
        method: 'post',
        params: params
    })
}

/**
 * 获取题目和题目类型
 * @returns {AxiosPromise}
 */
export const getAllTopic = () => {
    return instance({
        url: `${request}/topic/getAllTopic`,
        method: 'get'
    })
}

/**
 * 根据题目 id 获取单个题目详细信息
 * @param params
 * @returns {AxiosPromise}
 */
export const getTopic = (params) => {
    return instance({
        url: `${request}/topic/getTopic`,
        method: 'get',
        params: params
    })
}

/**
 * 获取单个通知
 * @param params
 * @returns {AxiosPromise}
 */
export const getMessageById = (params) => {
    return instance({
        url: `${request}/student/getMessageById`,
        method: 'get',
        params: params
    })
}

/**
 * 自由回答题目(非大题)
 * @param data
 * @returns {AxiosPromise}
 */
export const makeQuestionNoPicture = (data) => {
    return instance({
        url: `${request}/student/makeQuestionNoPicture`,
        method: 'post',
        data: data
    })
}

/**
 * 自由答题(大题)
 * @param data
 * @returns {AxiosPromise}
 */
export const makeQuestionWithPicture = (data) => {
    return instance({
        url: `${request}/student/makeQuestionWithPicture`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data'}
    })
}

/**
 * 获取所有任务
 * @param params
 * @returns {AxiosPromise}
 */
export const getAllTask = (params) => {
    return instance({
        url: `${request}/student/getAllTask`,
        method: 'get',
        params: params
    })
}

/**
 * 获取单个任务
 * @param params
 * @returns {AxiosPromise}
 */
export const getOneTask = (params) => {
    return instance({
        url: `${request}/student/getOneTask`,
        method: 'get',
        params: params
    })
}

/**
 * 任务大题(非大题)
 * @returns {AxiosPromise}
 * @param data
 */
export const makeTakeNoPicture = (data) => {
    return instance({
        url: `${request}/student/makeTakeNoPicture`,
        method: 'post',
        data: data
    })
}

/**
 * 添加评论
 * @param data
 * @returns {AxiosPromise}
 */
export const addComment = (data) => {
    return instance({
        url: `${request}/student/addComment`,
        method: 'post',
        data: data
    })
}

/**
 * 获取所有评论
 * @param params
 * @returns {AxiosPromise}
 */
export const getComment = (params) => {
    return instance({
        url: `${request}/topic/getComment`,
        method: 'get',
        params: params
    })
}

/**
 * 评论点赞
 * @param params
 * @returns {AxiosPromise}
 */
export const commentLike = (params) => {
    return instance({
        url: `${request}/topic/like`,
        method: 'get',
        params: params
    })
}

/**
 * 评论点踩
 * @param params
 * @returns {AxiosPromise}
 */
export const commentUnLike = (params) => {
    return instance({
        url: `${request}/topic/unlike`,
        method: 'get',
        params: params
    })
}
