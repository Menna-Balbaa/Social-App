import axios from "axios";
import type { LoginSchemaType, RegisterSchemaType } from "../lib/schema/auth.schema";

const baseURL = import.meta.env.VITE_BASE_URL

export async function registerUser(formData:RegisterSchemaType) {
    const data = await axios.post(`${baseURL}/users/signup` , formData)
    return data
}

export async function loginUser(formData:LoginSchemaType) {
    const data = await axios.post(`${baseURL}/users/signin` , formData)
    return data
}
export async function changeUserPassword(formData: {
  password: string;
  newPassword: string;
}) {
  const data = await axios.patch(`${baseURL}/users/change-password`,formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}

