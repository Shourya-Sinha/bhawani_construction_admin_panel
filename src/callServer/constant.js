import axios from 'axios';
// export const SERVER_URL = 'https://bhawani-constuction-server.onrender.com';
 export const SERVER_URL = 'https://bhawani-constuction-server-7sai.onrender.com';

export const UPDATE_HERO_SECTION_URL = `${SERVER_URL}/update-hero-section`;
export const GET_HERO_SECTION_DATA = `${SERVER_URL}/get-hero-section-data`;

export const UPDATE_ABOUT_SECTION_URL = `${SERVER_URL}/update-about-section`;
export const GET_ABOUT_SECTION_DATA = `${SERVER_URL}/get-about-section-data`;

export const UPDATE_SERVICE_SECTION_URL = `${SERVER_URL}/update-service-section`;
export const GET_SERVICE_SECTION_DATA = `${SERVER_URL}/get-service-section-data`;

export const UPDATE_PROJECT_SECTION_URL = `${SERVER_URL}/update-project-section`;
export const GET_PROJECT_SECTION_DATA = `${SERVER_URL}/get-project-section-data`;
export const UPDATE_PROJECT_SECTION_IMAGE = `${SERVER_URL}/update-project-section-image`;

export const UPDATE_CLIENT_SECTION_URL = `${SERVER_URL}/update-client-section`;
export const GET_CLIENT_SECTION_DATA = `${SERVER_URL}/get-client-section-data`;
export const UPDATE_CLIENT_SECTION_IMAGE = `${SERVER_URL}/update-client-section-image`;

export const UPDATE_CONTACT_SECTION_URL = `${SERVER_URL}/update-contact-section`;
export const GET_CONTACT_SECTION_DATA = `${SERVER_URL}/get-contact-section-data`;

// ------------------Updating data----------------------
export const UpdateHeroSectionData = async (data) => {
    try {
        const response = await axios.put(UPDATE_HERO_SECTION_URL, data);
        // console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        // console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateAboutSectionData = async (data) => {
    try {
        const response = await axios.put(UPDATE_ABOUT_SECTION_URL, data);
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateServiceSectionData = async (data, id) => {
    try {
        const response = await axios.put(`${UPDATE_SERVICE_SECTION_URL}/${id}`, data);
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateProjectSectionData = async (data, sectionId) => {
    try {
        const response = await axios.put(`${UPDATE_PROJECT_SECTION_URL}/${sectionId}`, data);
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateProjectSectionDataImage = async (data, subsectionId) => {
    try {
        const response = await axios.post(`${UPDATE_PROJECT_SECTION_IMAGE}/${subsectionId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateClientSectionData = async (data, sectionId) => {
    try {
        const response = await axios.put(`${UPDATE_CLIENT_SECTION_URL}/${sectionId}`, data);
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateClientSectionDataImage = async (data, subsectionId) => {
    try {
        const response = await axios.post(`${UPDATE_CLIENT_SECTION_IMAGE}/${subsectionId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}
export const UpdateContactSectionData = async (data) => {
    try {
        const response = await axios.put(UPDATE_CONTACT_SECTION_URL, data);
        console.log("log data in constant.js", response.data);
        return response.data.data;
    } catch (error) {
        console.log('error in constant.js', error);
        throw error;
    }
}


// ------------------Getting Data-----------------------
export const GetHeroSectionData = async () => {
    const response = await axios.get(GET_HERO_SECTION_DATA);
    return response.data.data;
}
export const GetAboutSectionData = async () => {
    const response = await axios.get(GET_ABOUT_SECTION_DATA);
    return response.data.data;
}
export const GetServiceSectionData = async () => {
    const response = await axios.get(GET_SERVICE_SECTION_DATA);
    return response.data.data;
}
export const GetProjectSectionData = async () => {
    const response = await axios.get(GET_PROJECT_SECTION_DATA);
    return response.data.data;
}
export const GetClientSectionData = async () => {
    const response = await axios.get(GET_CLIENT_SECTION_DATA);
    return response.data.data;
}
export const GetContactSectionData = async () => {
    const response = await axios.get(GET_CONTACT_SECTION_DATA);
    return response.data.data;
}
