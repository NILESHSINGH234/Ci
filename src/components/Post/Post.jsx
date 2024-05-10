import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { CommentModal } from "../Modals/CommentModal";
import { OptionsModal } from "../Modals/OptionsModal";

import { convertDateIntoInteger } from "../../utils/convertDateIntoInteger";
import { likePost } from "../../features/posts/postSlice";
import { dislikePost } from "../../features/posts/postSlice";
import { bookmarkPost } from "../../features/posts/postSlice";
import { removeBookmarkPost } from "../../features/posts/postSlice";
import { checkIfPostAlreadyLiked } from "../../helpers/checkIfPostAlreadyLiked";
import { Avatar } from "../Avatar/Avatar";
export const Post = ({ postData, singlePostPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const { userInfo, token } = useSelector(state => state.auth);
  const { bookmarkPosts } = useSelector(state => state.posts);
  const { allUsers } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const {
    _id,
    id,
    firstName,
    lastName,
    username,
    avatar,
    content,
    likes,
    comments,
    createdAt,
  } = postData;

  const userCanEditAndDeletePost = postData.username === userInfo.username;
  const postTime = convertDateIntoInteger(createdAt);
  const isPostAlreadyLiked = checkIfPostAlreadyLiked(likes.likedBy, userInfo);
  const isPostAlreadyBookmarked = bookmarkPosts?.find(
    bookmarkPostId => bookmarkPostId === _id
  );

  const currentUser = allUsers?.find(
    user => user.username === postData.username
  );
  return (
    <>
     <div className="p-3 flex border-b border-gray-700 hover:bg-[#18222f] transition ease-out">
       
      <div className="w-12 min-h-fit">
          <Link to={`/profile/${username}`}>
          <Avatar
              avatarImg={currentUser.avatar}
              firstname={firstName}
              lastname={lastName}
            />
          </Link>
         
        </div>
        <div className="flex flex-col space-y-2 w-full ml-4">
          <div className="flex justify-between">
            <div className="text-[#6e767d]">
              <div className="inline-block group">
              <Link to={`/profile/${username}`}>
                  <h4 className="inline-block font-bold text-[15px] sm:text-base text-[#f7f9f9] hover:underline">
                    {firstName} {lastName}
                  </h4>
                </Link>
                <span className="text-sm sm:text-[15px] ml-1.5">
                @{username}
                </span>
              </div>{" "}
              ·{" "}
              <span className="hover:underline text-sm sm:text-[15px]">
              <ReactTimeAgo
                  date={postTime}
                  locale="en-US"
                  timeStyle="twitter"
                />
              </span>
              {singlePostPage ? (
                <p className="text-[#f7f9f9] text-[15px] sm:text-base mt-0.5">
                  {content}
                </p>
              ) : (
                <p
                  className="text-[#f7f9f9] text-[15px] sm:text-base mt-0.5"
                  onClick={() => navigate(`/post/${id}`)}
                >
                  {content}
                </p>
              )}
            </div>

            {userCanEditAndDeletePost && !singlePostPage && (
              <OptionsModal postData={postData} />
            )}
          </div>
          <div className="text-[#6e767d] flex justify-between sm:w-10/12">
            <div className="flex items-center space-x-1 group">
              <div
                className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10"
                onClick={() => setIsOpen(true)}
              >
                <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
              </div>

              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            </div>

            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-pink-600 group-hover:bg-opacity-10">
              {isPostAlreadyLiked ? (
                  <HeartIconFilled
                    className="h-5 group-hover:text-pink-600 text-pink-600"
                    onClick={() =>
                      dispatch(dislikePost({ postId: _id, token }))
                    }
                  />
                ) : (
                  <HeartIcon
                    className="h-5 group-hover:text-pink-600"
                    onClick={() => dispatch(likePost({ postId: _id, token }))}
                  />
                )}
              </div>

              <span
               className={`group-hover:text-pink-600 text-sm ${
                isPostAlreadyLiked && "text-pink-600"
                }`}
              >
                 {likes.likeCount}
              </span>
            </div>

            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
              {isPostAlreadyBookmarked ? (
                  <BookmarkIconFilled
                    className="h-5 group-hover:text-green-500 text-green-500"
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(removeBookmarkPost({ postId: _id, token }));
                    }}
                  />
                ) : (
                  <BookmarkIcon
                    className="h-5 group-hover:text-green-500"
                    onClick={e => {
                      e.stopPropagation();

                      dispatch(bookmarkPost({ postId: _id, token }));
                    }}
                  />
                )}
              </div>
            </div>

            <div className="icon group">
              <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <CommentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          postData={postData}
        />
      )}
    </>
  );
};