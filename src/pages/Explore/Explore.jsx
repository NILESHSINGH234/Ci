import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import { ExploreFeed } from "../../components/Feed/ExploreFeed";
import { Widgets } from "../../components/Widgets/Widgets";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";

export const Explore = () => {
  return (
    <main className="min-h-screen bg-background flex max-w-[1500px] mx-auto">
      <Sidebar />
      <ExploreFeed headerTitle="Explore" />
      <Widgets />
      <BottomNavigation />
    </main>
  );
};