import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getMyProfile() {
    const data = await axios.get(`${baseURL}/users/profile-data`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return data
}
