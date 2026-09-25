import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getSinglePost(id: string ) {
    const data = await axios.get(`${baseURL}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function createPost(formdata: FormData ) {
    const data = await axios.post(`${baseURL}/posts`, formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function updatePost(id: string, formdata: FormData ) {
    const data = await axios.put(`${baseURL}/posts/${id}`, formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function deletePost(id: string) {
    const data = await axios.delete(`${baseURL}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function likeAndUnlikePost(id: string) {
    const data = await axios.put(`${baseURL}/posts/${id}/like`, null, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function getUserPosts(id: string) {
    const data = await axios.get(`${baseURL}/users/${id}/posts`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function saveUnsavePost(id: string) {
    const data = await axios.put(`${baseURL}/posts/${id}/bookmark`, null,  {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}





