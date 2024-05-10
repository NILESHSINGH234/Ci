import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { editUserProfileService } from "../../services/users/usersServices";
import { followUserService } from "../../services/users/usersServices";
import { getAllUsersService } from "../../services/users/usersServices";
import { getPostByUsernameService } from "../../services/posts/postsServices";
import { getSingleUserService } from "../../services/users/usersServices";
import { unfollowUserService } from "../../services/users/usersServices";
const initialState = {
  allUsers: [],
  singleUser: {},
  userPosts: [],
  userStatus: "idle",
  userError: null,
  isPostModalOpen: false,
  editUserData: {},
};

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsersService();
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await getSingleUserService(username);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getUserPostsByUsername = createAsyncThunk(
  "users/getUserPostsByUsername",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await getPostByUsernameService(username);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "users/editUserProfile",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const response = await editUserProfileService(userData, token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const response = await followUserService(followUserId, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const response = await unfollowUserService(followUserId, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      resetUserProfile: state => {
        state.singleUser = {};
        state.userPosts = [];
      },
    },
    extraReducers: builder => {
      builder
        .addCase(getAllUsers.pending, state => {
          state.userStatus = "loading";
        })
        .addCase(getAllUsers.fulfilled, (state, { payload }) => {
          state.userStatus = "success";
          state.allUsers = payload;
        })
        .addCase(getAllUsers.rejected, (state, { payload }) => {
          state.userStatus = "failed";
          state.userError = payload.errors;
        })
        .addCase(getSingleUser.pending, state => {
          state.singleUserStatus = "loading";
        })
        .addCase(getSingleUser.fulfilled, (state, { payload }) => {
          state.singleUserStatus = "success";
          state.singleUser = payload;
        })
        .addCase(getSingleUser.rejected, (state, { payload }) => {
          state.singleUserStatus = "failed";
          state.userError = payload.errors;
        })
        .addCase(getUserPostsByUsername.pending, state => {
          state.userPostsStatus = "loading";
        })
        .addCase(getUserPostsByUsername.fulfilled, (state, { payload }) => {
          state.userPostsStatus = "success";
          state.userPosts = payload;
        })
        .addCase(getUserPostsByUsername.rejected, (state, { payload }) => {
          state.userPostsStatus = "failed";
          state.userPostsError = payload.errors;
        })
        .addCase(editUserProfile.fulfilled, (state, { payload }) => {
            state.allUsers.map(user =>
                user.username === payload.username ? payload : user
              );
          toast.success("Profile edited successfully!");
        })
        .addCase(editUserProfile.rejected, (state, { payload }) => {
          state.userError = payload.errors;
          toast.error("Some error occurred. Try Again.");
        })
        .addCase(followUser.fulfilled, (state, { payload }) => {
          const { user, followUser } = payload;
          state.allUsers = state.allUsers.map(currUser =>
            currUser.username === user.username ? user : currUser
          );
          state.allUsers = state.allUsers.map(currUser =>
            currUser.username === followUser.username ? followUser : currUser
          );
          state.singleUser = payload.followUser;
          toast.success("You followed!");
        })
        .addCase(followUser.rejected, (state, { payload }) => {
          state.userError = payload.errors;
          toast.error("Some error occurred. Try Again.");
        })
        .addCase(unfollowUser.fulfilled, (state, { payload }) => {
          const { user, followUser } = payload;
          state.allUsers = state.allUsers.map(currUser =>
            currUser.username === user.username ? user : currUser
          );
          state.allUsers = state.allUsers.map(currUser =>
            currUser.username === followUser.username ? followUser : currUser
          );
          state.singleUser = payload.followUser;
          toast.success("You unfollowed!");
        })
        .addCase(unfollowUser.rejected, (state, { payload }) => {
          state.userError = payload.errors;
          toast.error("Some error occurred. Try Again.");
        });
    },
  });
  
export const { resetUserProfile } = userSlice.actions;
export default userSlice.reducer;