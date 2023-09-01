import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import useSpotify from "@/hooks/useSpotify";
import { playlistIdState } from "@/atoms/playlistAtom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { IconButton } from "@mui/material";

import { HeartIcon, RssIcon } from "@heroicons/react/outline";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div
      className="text-[#bbb] p-2 text-xs lg:text-lg 
    border-r border-gray-900 sm:max-w-[14rem] lg:min-w-[20rem]
     hidden md:inline-flex h-screen"
    >
      <div className="space-y-2 w-full ">
        <div className="space-y-4 bg-[#121212] p-4 rounded font-[600]">
          <button className="flex items-center space-x-4 hover:text-white w-full">
            <HomeOutlinedIcon className="h-7 w-7" />
            <p>Home</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
            <SearchOutlinedIcon className="h-7 w-7" />
            <p>Search</p>
          </button>
        </div>

        <div className="space-y-4 bg-[#121212] p-4 rounded h-full ">
          <div className="flex items-center justify-between font-[600]">
            <button className="flex items-center space-x-4 hover:text-white">
              <AutoAwesomeMotionOutlinedIcon className="h-7 w-7" />
              <p>Your Library</p>
            </button>
            <IconButton title="Create playlist or folder">
              <AddOutlinedIcon className="h-7 w-7 text-[#bbb]" />
            </IconButton>
          </div>

          <hr className="border-t-[0.1px] border-[#2e2e2e]" />

          <button className="flex items-center space-x-2 hover:text-white font-[600]">
            <HeartIcon className="h-5 w-5" />
            <p>Liked Songs</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white font-[600]">
            <RssIcon className="h-5 w-5" />
            <p>Your episodes</p>
          </button>

          <hr className="border-t-[0.1px] border-[#2e2e2e]" />

          <div className="overflow-y-scroll scrollbar-hide max-h-[70%] pb-[100%]">
            {playlists.map((playlist) => (
              <div
                className={`flex items-center space-x-3 hover:bg-[#2e2e2e] ${
                  playlist.id == playlistId ? "bg-[#2e2e2e]" : ""
                } hover:text-white p-2 cursor-pointer rounded`}
                onClick={() => setPlaylistId(playlist.id)}
              >
                <img className="w-14" src={playlist?.images[0]?.url} alt="" />
                <div>
                  <p key={playlist.id} className="text-white">
                    {playlist.name}
                  </p>
                  <p className="text-sm">Playlist</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
