import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { createNewPostService } from "../../services/posts/postsServices";

import { deletePostService } from "../../services/posts/postsServices";
import { editPostService } from "../../services/posts/postsServices";
import { getAllPostsService } from "../../services/posts/postsServices";
import { getSinglePostService } from "../../services/posts/postsServices";
import { likePostService } from "../../services/posts/postsServices";
import { dislikePostService } from "../../services/posts/postsServices";
import { getAllCommentsService } from "../../services/posts/postsServices";
import { addCommentService } from "../../services/posts/postsServices";
import { deleteCommentService } from "../../services/posts/postsServices";
import { upvoteCommentService } from "../../services/posts/postsServices";
import { downvoteCommentService } from "../../services/posts/postsServices";
import { bookmarkPostService } from "../../services/posts/postsServices";
import { deleteBookmarkPostService } from "../../services/posts/postsServices";
import { getAllBookmarkPostService } from "../../services/posts/postsServices";
const initialState = {
  allPosts: [],
  singlePost: {},
  userPosts: [],
  bookmarkPosts: [],
  postStatus: "idle",
  postError: null,
  isPostModalOpen: false,
  editPostData: {},
  filterText: "Recent",
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

export const likePost = createAsyncThunk(
    "posts/likePost",
    async ({ postId, token }, { rejectWithValue }) => {
      try {
        const response = await likePostService(postId, token);
        return response.data.posts;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const dislikePost = createAsyncThunk(
    "posts/dislikePost",
    async ({ postId, token }, { rejectWithValue }) => {
      try {
        const response = await dislikePostService(postId, token);
        return response.data.posts;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const bookmarkPost = createAsyncThunk(
    "posts/bookmarkPost",
    async ({ postId, token }, { rejectWithValue }) => {
      try {
        const response = await bookmarkPostService(postId, token);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const removeBookmarkPost = createAsyncThunk(
    "posts/removeBookmarkPost",
    async ({ postId, token }, { rejectWithValue }) => {
      try {
        const response = await deleteBookmarkPostService(postId, token);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const getAllBookmarkPosts = createAsyncThunk(
    "posts/getAllBookmarkPosts",
    async (token, { rejectWithValue }) => {
      try {
        const response = await getAllBookmarkPostService(token);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const addComment = createAsyncThunk(
    "posts/addComment",
    async ({ postId, commentData, token }, { rejectWithValue }) => {
      try {
        const response = await addCommentService(postId, commentData, token);
        return response.data.posts;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async ({ postId, commentId, token }, { rejectWithValue }) => {
      try {
        const response = await deleteCommentService(postId, commentId, token);
        return response.data.posts;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const upvoteComment = createAsyncThunk(
    "posts/upvoteComment",
    async ({ postId, commentId, token }, { rejectWithValue }) => {
      try {
        const response = await upvoteCommentService(postId, commentId, token);
        return response.data.posts;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const downvoteComment = createAsyncThunk(
    "posts/downvoteComment",
    async ({ postId, commentId, token }, { rejectWithValue }) => {
      try {
        const response = await downvoteCommentService(postId, commentId, token);
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
    setFilterText: (state, { payload }) => {
      state.filterText = payload;
    },
    extraReducers: builder => {
      builder
        .addCase(getAllPosts.pending, state => {
          state.postStatus = "loading";
        })
        .addCase(getAllPosts.fulfilled, (state, { payload }) => {
          
          state.allPosts = payload;
          state.postStatus = "success";
        })
        .addCase(getAllPosts.rejected, (state, { payload }) => {
          state.postError = payload.errors;
          state.postStatus = "failed";
        })
        .addCase(getSinglePost.pending, state => {
          state.singlePostStatus = "loading";
        })
        .addCase(getSinglePost.fulfilled, (state, { payload }) => {
         
          state.singlePost = payload;
          state.singlePostStatus = "success";
        })
        .addCase(getSinglePost.rejected, (state, { payload }) => {
        
          state.postError = payload.errors;
          state.singlePostStatus = "failed";
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
    [likePost.fulfilled]: (state, { payload }) => {
        state.allPosts = payload;
        toast.success("You liked the post");
      },
      [likePost.rejected]: (state, { payload }) => {
        state.postError = payload;
        toast.error("Some error occured. Try Again.");
      },
      [dislikePost.fulfilled]: (state, { payload }) => {
        state.allPosts = payload;
        toast.success("You disliked the post");
      },
      [dislikePost.rejected]: (state, { payload }) => {
        state.postError = payload;
        toast.error("Some error occured. Try Again.");
      },
      [bookmarkPost.fulfilled]: (state, { payload }) => {
        state.bookmarkPosts = payload.bookmarks;
        toast.success("Post bookmarked successfully.");
      },
      [bookmarkPost.rejected]: (state, { payload }) => {
        state.postError = payload;
        toast.error("Some error occured. Try Again.");
      },
      [removeBookmarkPost.fulfilled]: (state, { payload }) => {
        state.bookmarkPosts = payload.bookmarks;
        toast.success("Post removed from bookmark.");
      },
      [removeBookmarkPost.rejected]: (state, { payload }) => {
        state.postError = payload;
        toast.error("Some error occured. Try Again.");
      },
      [getAllBookmarkPosts.fulfilled]: (state, { payload }) => {
        state.bookmarkPosts = payload.bookmarks;
      },
      [getAllBookmarkPosts.rejected]: (state, { payload }) => {
        state.postError = payload;
      },
      [addComment.fulfilled]: (state, { payload }) => {
        state.allPosts = payload;
        toast.success("You commented!");
      },
      [addComment.rejected]: (state, { payload }) => {
        state.postError = payload.errors;
        toast.error("Some error occured. Try Again.");
      },
      [deleteComment.fulfilled]: (state, { payload }) => {
        state.allPosts = payload;
        toast.success("comment deleted!");
      },
      [deleteComment.rejected]: (state, { payload }) => {
        state.postError = payload.errors;
        toast.error("Some error occured. Try Again.");
      },
      [upvoteComment.fulfilled]: (state, { payload }) => {
        state.allPosts = payload;
        toast.success("You upvoted!");
      },
      [upvoteComment.rejected]: (state, { payload }) => {
        state.postError = payload.errors;
        toast.error("Some error occured. Try Again.");
      },
      [downvoteComment.fulfilled]: (state, { payload }) => {
        state.allPosts = payload;
        toast.success("You downvoted!");
      },
      [downvoteComment.rejected]: (state, { payload }) => {
        state.postError = payload.errors;
        toast.error("Some error occured. Try Again.");
      },
  });
  
export const { setPostModalOpen,setFilterText } = postSlice.actions;
export default postSlice.reducer;