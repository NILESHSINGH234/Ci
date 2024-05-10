import React from 'react'

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Feed } from "../../components/Feed/Feed";
import { Widgets } from "../../components/Widgets/Widgets";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
const Bookmarks = () => {
  return (
    <main className="min-h-screen bg-background flex max-w-[1500px] mx-auto">
    <Sidebar />
    <Feed headerTitle="Bookmarks" bookmarkPage />
    <Widgets />
    <BottomNavigation />
  </main>
  )
}

export default Bookmarks