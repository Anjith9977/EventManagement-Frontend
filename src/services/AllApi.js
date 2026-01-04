import commonAPI from "./commonApi";
import SERVER_URL from "./server_url";


export const registerApi = async (reqBody) => {
     return await commonAPI('POST', `${SERVER_URL}/register`, reqBody)
}

export const loginApi = async (reqBody) => {
     return await commonAPI('POST', `${SERVER_URL}/login`, reqBody)
}

export const googleloginApi = async (loginData) => {
     return await commonAPI('POST', `${SERVER_URL}/google-login`, loginData)
}

export const addEventApi = async (reqBody, reqHeader) => {
     return await commonAPI('POST', `${SERVER_URL}/add-event`, reqBody, reqHeader)
}

export const getAllEventsApi = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/get-all-events`, {}, reqHeader)
}

export const getAEventApi = async (id, reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getAevent/${id}`, {}, reqHeader)
}

export const getDashBoardEventApi = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/get-dashBoard-event`, {}, reqHeader)
}

export const deleteEventApi = async (id, reqHeader) => {
     return await commonAPI('DELETE', `${SERVER_URL}/delete-event/${id}`, {}, reqHeader)
}

export const updateEventApi = async (id, reqBody, reqHeader) => {
     return await commonAPI('PUT', `${SERVER_URL}/update-event/${id}`, reqBody, reqHeader)
}

export const updateOrgApi = async (reqBody, reqHeader) => {
     return await commonAPI('PUT', `${SERVER_URL}/update-org`, reqBody, reqHeader)
}

// user api

export const getUserEventApi = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/get-user-event`, {}, reqHeader)
}

export const updateUserApi = async (reqBody, reqHeader) => {
     return await commonAPI('PUT', `${SERVER_URL}/update-user`, reqBody, reqHeader)
}

export const getAllUserEvent = async (searchkey, reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getAllUserEvent?search=${searchkey}`, {}, reqHeader)
}

export const getAuserEventApi = async (id, reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getAuserEvent/${id}`, {}, reqHeader)
}

export const paymentApi = async (reqBody, reqHeader) => {
     return await commonAPI('PUT', `${SERVER_URL}/make-payment`, reqBody, reqHeader)
}

export const myBookingApi = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/myBooking`, {}, reqHeader)
}

//admin 

export const adminOrgApi = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getOrg`, {}, reqHeader)
}

export const adminEventApi = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getOrg`, {}, reqHeader)
}

export const getAllAdminEvent = async (reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getAllAdminEvent`, {}, reqHeader)
}

export const updateAdminApi = async (reqBody, reqHeader) => {
     return await commonAPI('PUT', `${SERVER_URL}/update-Admin`, reqBody, reqHeader)
}


export const updateOrganizerStatusAPI = async (id, reqBody,reqHeader) => {
     return await commonAPI("PUT",`${SERVER_URL}/Org/${id}/status`,reqBody,reqHeader );
};

export const getAadminEventApi = async (id,reqHeader) => {
     return await commonAPI("GET",`${SERVER_URL}/AadminEvent/${id}`,{},reqHeader );
};


export const getAadminOrgApi = async (reqBody,reqHeader) => {
     return await commonAPI("GET",`${SERVER_URL}/getAadminOrg?email=${reqBody}`,{},reqHeader );
};

export const getOrganizerStatusApi = async (reqHeader) => {
     return await commonAPI("GET",`${SERVER_URL}/getOrganizerStatus`,{},reqHeader );
};

export const getAdminDashboardEventApi = async (reqHeader) => {
     return await commonAPI("GET",`${SERVER_URL}/getAdminDashboardEvent`,{},reqHeader );
};

export const confirmEventPurchaseAPI = async (body, reqHeader) => {
   return await commonAPI("POST",`${SERVER_URL}/event-confirm-purchase`,body,reqHeader)
};



