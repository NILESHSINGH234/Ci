import axios from "axios";

export const loginService = async (username, password) => {
    return await axios.post("/api/auth/login", { username, password });}