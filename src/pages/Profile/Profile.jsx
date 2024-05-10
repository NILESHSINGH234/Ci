import React, { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { Post } from "../../components/Post/Post";
import { Widgets } from "../../components/Widgets/Widgets";
import { getSingleUser } from "../../features/users/userSlice";
import { getUserPostsByUsername } from "../../features/users/userSlice";
import { resetUserProfile } from "../../features/users/userSlice";
import { ThreeDots } from "react-loader-spinner"
import { getSortedPosts } from "../../helpers/getSortedPosts";

export const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleUser({ username }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch(resetUserProfile());
    };
  }, [dispatch, username]);
  const { singleUser, userPosts, allUsers, singleUserStatus } = useSelector(
    state => state.users
  );
  
  const { allPosts } = useSelector(state => state.posts);
  useEffect(() => {
   
    dispatch(getUserPostsByUsername({ username }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, allPosts]);

  const currentUser = allUsers?.find(
    user => user.username === singleUser?.username
  );
  const sortedUserPosts = getSortedPosts(userPosts);
  return (
    <main className="min-h-screen bg-background flex max-w-[1500px] mx-auto">
      <Sidebar />
      <div className="flex-grow border-l border-r border-gray-700 max-w-[600px] sm:ml-[72px] xl:ml-[340px]">
      <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-colorgray-100 font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-[rgba(21, 32, 43, 0.75)] backdrop-blur-md backdrop-brightness-100">
          <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
          <ArrowLeftIcon
              className="h-5 text-white"
              onClick={() => navigate(-1)}
            />
          </div>
          {currentUser?.firstName} {currentUser?.lastName}
        </div>
        
        {singleUserStatus === "loading" ? (
          <div className="flex items-center justify-center min-h-screen w-full">
            <ThreeDots color="#fff" height={80} width={80} />
          </div>
        ) : (
          <>
            <ProfileCard userDetails={currentUser} />
            <div className="pb-72">
            {sortedUserPosts.length === 0 ? (
                <div className="flex pt-12 items-center justify-center text-gray-400">
                  Tweet something to see your posts.
                </div>
              ) : (
                sortedUserPosts?.map((post, id) => {
                  return (
                    <div key={id}>
                      <Post postData={post} />
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
      <Widgets />
      <BottomNavigation />
    </main>
  );
};