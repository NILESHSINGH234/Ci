// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { loginService } from "../../services/loginService";
import { signupService } from "../../services/signupService";


const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || "",
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: false,
  authStatus: "idle",
  authError: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await loginService(username, password)
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    { firstName, lastName, email, password, username },
    { rejectWithValue }
  ) => {
    try {
      const res = await signupService(
        firstName,
        lastName,
        email,
        password,
        username
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: state => {
      state.token = "";
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.authStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.authStatus = "success";
        state.token = payload.encodedToken;
        state.userInfo = payload.foundUser;
        state.isLoggedIn = true;
        localStorage.setItem("token", JSON.stringify(payload.encodedToken));
        localStorage.setItem("user", JSON.stringify(payload.foundUser));
        toast.success(`Hello, ${payload.foundUser.firstName}. Welcome back!`, {
          icon: "👋",
        });
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.authStatus = "failed";
        state.authError = payload.errors;
        toast.error("Some error occured. Try Again.");
      })
      .addCase(signupUser.pending, state => {
        state.authStatus = "loading";
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.authStatus = "success";
        state.token = payload.encodedToken;
        state.userInfo = payload.createdUser;
        state.isLoggedIn = true;
        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
        toast.success("Account created successfully!");
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.authStatus = "failed";
        state.authError = payload.errors;
        toast.error("Some error occured. Try Again.");
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;