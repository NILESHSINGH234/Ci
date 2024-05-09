import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline"
import { Comment } from "../../components/Comment/Comment";
import { Widgets } from "../../components/Widgets/Widgets";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Post } from "../../components/Post/Post";

export const SinglePost = () => {
  return (
    <main className="min-h-screen bg-[#151F2B] flex max-w-[1250px] mx-auto">
      <Sidebar />
      <div className="flex-grow border-l border-r border-gray-700 max-w-[600px] sm:ml-[72px] xl:ml-[370px]">
        <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-[rgba(21, 32, 43, 0.75)] backdrop-blur-md backdrop-brightness-100">
          <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
            <ArrowLeftIcon className="h-5 text-white" />
          </div>
          Tweet
        </div>
        <Post />
        <div className="pb-72">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
      <Widgets />
    </main>
  );
};