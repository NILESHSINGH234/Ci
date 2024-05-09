import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
//import { createNewPostService, deletePostService, editPostService, getAllPostsService, getSinglePostService } from "../../services/auth/postsServices";
import { createNewPostService } from "../../services/posts/postsServices";
import { deletePostService } from "../../services/posts/postsServices";
import { editPostService } from "../../services/posts/postsServices";
import { getAllPostsService } from "../../services/posts/postsServices";
import { getSinglePostService } from "../../services/posts/postsServices";

const initialState = {
  allPosts: [],
  singlePost: {},
  userPosts: [],
  postStatus: "idle",
  postError: null,
  isPostModalOpen: false,
  editPostData: {},
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPostsService();
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await getSinglePostService(postId);
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const response = await createNewPostService(postData, token);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const response = await editPostService(postData, token);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await deletePostService(postId, token);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      setPostModalOpen: (state, { payload }) => {
        state.isPostModalOpen = payload.isOpen;
        state.editPostData = payload.editPostData;
      },
    },
    extraReducers: builder => {
      builder
        .addCase(getAllPosts.pending, state => {
          state.postStatus = "loading";
        })
        .addCase(getAllPosts.fulfilled, (state, { payload }) => {
          state.postStatus = "success";
          state.allPosts = payload;
        })
        .addCase(getAllPosts.rejected, (state, { payload }) => {
          state.postStatus = "failed";
          state.postError = payload.errors;
        })
        .addCase(getSinglePost.pending, state => {
          state.singlePostStatus = "loading";
        })
        .addCase(getSinglePost.fulfilled, (state, { payload }) => {
          state.singlePostStatus = "success";
          state.singlePost = payload;
        })
        .addCase(getSinglePost.rejected, (state, { payload }) => {
          state.singlePostStatus = "failed";
          state.postError = payload.errors;
        })
        .addCase(createNewPost.fulfilled, (state, { payload }) => {
          state.allPosts = payload;
        })
        .addCase(createNewPost.rejected, (state, { payload }) => {
          state.postError = payload;
        })
        .addCase(editPost.fulfilled, (state, { payload }) => {
          state.allPosts = payload;
        })
        .addCase(editPost.rejected, (state, { payload }) => {
          state.postError = payload;
        })
        .addCase(deletePost.fulfilled, (state, { payload }) => {
          state.allPosts = payload;
        })
        .addCase(deletePost.rejected, (state, { payload }) => {
          state.postError = payload;
        });
    },
  });
  
export const { setPostModalOpen } = postSlice.actions;
export default postSlice.reducer;