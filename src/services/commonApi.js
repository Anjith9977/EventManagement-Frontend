import axios from 'axios'


const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {

    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader
    }

    // Re-throw errors so callers can handle them properly.
    // Previously, returning `err` caused callers to receive an Axios Error object
    // instead of a real response, making `res.data` undefined and crashing `.length`.
    return await axios(reqConfig)
}

export default commonAPI