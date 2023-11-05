import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { TbCircleDashed } from "react-icons/tb";
import { ReactComponent as WhatsAppLightIcon } from "../assets/icons/whats-app-light-icon.svg";
import { MessageCard } from "./messagecard/MessageCard";
import { ChatCard } from "./chatCard/ChatCard";
import { useNavigate } from "react-router-dom";
import { Profile } from "./profile/Profile";
import { Button, Menu, MenuItem } from "@mui/material";
import { CreateGroup } from "./group/CreateGroup";

export const HomePage = () => {
  const [query, setQueries] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };
  const handleSearch = () => {};
  const handleCreateNewMessage = () => {};
  const handleNavigate = () => {
    setIsProfile(true);
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  };
  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884]"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] top-[5vh] w-[96vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* profile */}
          {isGroup && <CreateGroup />}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* home */}

              <div className="flex justify-between items-center p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src="https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_640.jpg"
                    // src="https://cdn.pixabay.com/photo/2023/04/09/10/32/little-pied-cormorant-7911240_1280.jpg"
                    alt="forest"
                  />
                  <p>username</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create group
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search for start new Chat"
                  onChange={(e) => {
                    setQueries(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={query}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>

              {/* all user */}
              <div className="bg-white overflow-y-scroll h-[72vh] px-3">
                {query &&
                  [1, 1, 1, 1, 1].map((item, i) => (
                    <div key={i} onClick={handleClickOnChatCard}>
                      <hr />
                      <ChatCard />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* default whats up page page */}
        {!currentChat && (
          <div className="right">
            <div className="w-[70%] flex flex-col items-center justify-center h-full">
              <div className="max-w-[70%] text-center">
                <WhatsAppLightIcon />
                <h1 className="text-4xl text-gray-600">WhatsApp Web</h1>
                <p className="my-9">
                  Send and receive messages without keeping your phone online.
                  Use WhatsApp on up to 4 linked devices and 1 phone at the same
                  time.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* message part */}
        {currentChat && (
          <div className="w-[70%] relative bg-blue-200">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317_640.jpg"
                    alt="avenue"
                  />
                  <p>username</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll ">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {[1, 2, 3, 4, 5].map((item, i) => (
                  <MessageCard
                    key={i}
                    content="message"
                    isReqUserMessage={i % 2 === 0}
                  />
                ))}
              </div>
            </div>
            {/* footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />
                <input
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
