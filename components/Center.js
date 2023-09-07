import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "@/components/Songs";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Skeleton } from "@mui/material";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function AccountMenu({ avatarSrc }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            className="p-1"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={avatarSrc} sx={{ width: 32, height: 32 }} />
            <ChevronDownIcon className="h-5 w-5 text-[#ddd]" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "#282828",
            color: "#878787",
            minWidth: 200,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#282828",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& .MuiMenuItem-root": {
              typography: "body2",
              py: 1,
              px: 2.5,
              color: "#ddd",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#3E3E3E",
              },
            },
            "& .MuiDivider-root": {
              my: 1,
              backgroundColor: "#3E3E3E",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Support</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" className="text-[#ddd]" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" className="text-[#ddd]" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black
        opacity-90 hover:opacity-80 cursor-pointer rounded-full text-white"
        >
          <AccountMenu avatarSrc={session?.user.image} />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b 
        to-black ${color} h-80 text-white p-8`}
      >
        {playlist?.images ? (
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images[0]?.url}
            alt=""
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={"11rem"}
            height={"11rem"}
            animation="pulse"
            sx={{ bgcolor: "#2e2e2e" }}
          />
        )}

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name ? (
              playlist?.name
            ) : (
                <Skeleton
                  animation="pulse"
                  sx={{ bgcolor: "#2e2e2e" }}
                />
            )}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
