import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getNewsFeed() {
    const data = await axios.get(`${baseURL}/posts?limit=20`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data

}
