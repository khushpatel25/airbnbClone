import { create } from "zustand";

import { SafeUser } from "@/app/types"
import getCurrentUser from "../actions/getCurrentUser";

interface  UserStore{
    user: SafeUser | null
    setUser: () => void
}

const useGetUser = create<UserStore>((set)=>({
    user: null,
    setUser: async () => set({user: await getCurrentUser()})
}))

export default useGetUser;