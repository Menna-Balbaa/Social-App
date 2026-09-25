import React, { createContext, useContext, useEffect, useState } from "react"
import type { UserDataI } from "../../types/profileData"
import { getMyProfile } from "../../services/profile.services"
import { authContext } from "./AuthContext"

type UserContextType = {
    userData: UserDataI | null
}
export const userContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({ children }: { children: React.ReactNode }) {

    const [userData, setUserData] = useState<UserDataI | null>(null)
    const {token} = useContext(authContext)!

    async function getUserData() {
        try {
            const { data } = await getMyProfile()
            const user: UserDataI = data.data.user
            setUserData(user)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
         if(token) {
            getUserData() 
         }
        }
        , [token])

    return (
        <>
            <userContext.Provider value={{userData}}>
                {children}
            </userContext.Provider>

        </>
    )
}
