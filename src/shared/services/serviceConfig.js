import instance from './baseService';

const requestHandler = (reqDetails, isRetry = true) => {
    return new Promise((resolve, reject) => {
        instance(reqDetails).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
};

// export const postRegister = (reqPayload) => {
//     const API_DETAILS = {
//         url: "/api/users/register",
//         method: "post",
//         data: reqPayload
//     };
//     return requestHandler(API_DETAILS);
// };