import React, { useState, useEffect } from "react";
import { LinkIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { EditProfileModal } from "../Modals/EditProfileModal";
import { followUser } from "../../features/users/userSlice";
import { unfollowUser } from "../../features/users/userSlice";
import { getAllPosts } from "../../features/posts/postSlice";
import { Avatar } from "../Avatar/Avatar";
export const ProfileCard = ({ userDetails }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    _id,
    firstName,
    lastName,
    avatar,
    username,
    bio,
    portfolio,
    followers,
    following,
  } = userDetails ?? "";

  const { userInfo, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
    

  const isUserAlreadyFollowing = () =>
    followers?.find(user => user.username === userInfo.username);

  return (
    <>
      <div className="pb-3 border-b border-gray-700">
        <div className="h-36 sm:h-40 bg-[#1a85cd]"></div>
        <div className="p-4">
          <div className="flex justify-between items-start pb-4">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="h-[120px] w-[120px] bg-[#273340] sm:h-36 sm:w-36 rounded-full border-4 border-[#151F2B] -mt-20"
              />
            ) : (
              <div className="h-[120px] w-[120px] bg-gray-700 sm:h-36 sm:w-36 rounded-full border-4 border-[#151F2B] -mt-20">
                <h4 className="w-full h-full flex items-center justify-center text-3xl text-white font-bold">
                  AK
                </h4>
              </div>
            )}
            {userInfo.username === username ? (
              <button
                className="ml-auto bg-[#151F2B] hover:bg-[#273340] text-white border border-gray-500 rounded-full text-base font-bold py-1.5 px-3.5"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </button>
            ) : isUserAlreadyFollowing() ? (
              <button
                className="ml-auto bg-[#151F2B] hover:bg-[#273340] text-white border border-gray-500 rounded-full text-base font-bold py-1.5 px-3.5"
                onClick={() =>
                  dispatch(unfollowUser({ followUserId: _id, token }))
                }
              >
                Unfollow
              </button>
            ) : (
              <button
                className="ml-auto bg-[#EFF3F4] hover:bg-[#e0e0e0] text-black border border-gray-500 rounded-full text-base font-bold py-1.5 px-3.5"
                onClick={() =>
                  dispatch(followUser({ followUserId: _id, token }))
                }
              >
                Follow
              </button>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <div className="">
              <h2 className="text-xl font-extrabold text-[#F7F9F9] leading-tight">
                {firstName} {lastName}
              </h2>
              <span className="text-gray-500 text-[15px]">@{username}</span>
            </div>
            <h4 className="text-[#F7F9F9] text-[15px]">{bio}</h4>
            {portfolio && (
              <div className="flex items-center space-x-1">
                <LinkIcon className="h-5 text-gray-500" />
                <a href={portfolio} className="text-[#1A8CD8] hover:underline">
                  {portfolio}
                </a>
              </div>
            )}

            <div className="flex items-center space-x-5">
              <div className="text-[#F7F9F9] font-bold text-[15px] hover:underline cursor-pointer">
                {following?.length}{" "}
                <span className="text-gray-500 font-medium">Following</span>
              </div>
              <div className="text-[#F7F9F9] font-bold text-[15px] hover:underline cursor-pointer">
                {followers?.length}{" "}
                <span className="text-gray-500 font-medium">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProfileModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          profileData={userDetails}
        />
      )}
    </>
  );
};