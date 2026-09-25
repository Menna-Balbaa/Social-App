import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getPostComments(id: string ) {
    const data = await axios.get(`${baseURL}/posts/${id}/comments`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function createComment(id: string, formData:FormData ) {
    const data = await axios.post(`${baseURL}/posts/${id}/comments`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function updateComment(id: string, commentId: string, formdata: FormData ) {
    const data = await axios.put(`${baseURL}/posts/${id}/comments/${commentId}`, formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

export async function deleteComment(id: string, commentId: string) {
    const data = await axios.delete(`${baseURL}/posts/${id}/comments/${commentId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}

