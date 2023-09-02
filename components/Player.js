import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";

import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import { debounce } from "lodash";

import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LoopIcon from "@mui/icons-material/Loop";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const skipToNext = () => {
    debouncedSkipToNext();
  };

  const skipToPrevious = () => {
    debouncedSkipToPrevious();
  };

  const debouncedSkipToNext = useCallback(
    debounce(() => {
      spotifyApi.skipToNext().then(() => {
        debouncedGetCurrentSong();
      });
    }, 350),
    []
  );

  const debouncedSkipToPrevious = useCallback(
    debounce(() => {
      spotifyApi.skipToPrevious().then(() => {
        debouncedGetCurrentSong();
      });
    }, 350),
    []
  );

  const debouncedGetCurrentSong = useCallback(
    debounce(() => {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing: ", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }, 300),
    []
  );

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing: ", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    debouncedAdjustVolume(volume);
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.log(err));
    }, 300),
    []
  );

  return (
    <div
      className="h-24 text-white grid grid-cols-3 text-xs md:text-base px-2 
    md:px-8 bg-gray-400 bg-opacity-10 backdrop-blur-xl rounded-3xl w-11/12"
    >
      {/* Left */}
      <div className="flex items-center space-x-4 z-10">
        <img
          className={`hidden md:inline w-12 rounded-full ${
            isPlaying ? "animate-[spin_3s_linear_infinite]" : ""
          }`}
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div className="text-xs lg:text-lg font-[600] w-3/4">
          <h3 className="truncate" title={songInfo?.name}>
            {songInfo?.name}
          </h3>
          <p className="text-sm text-[#bbb] truncate">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly z-10">
        <ShuffleOutlinedIcon className="button" />

        <SkipPreviousIcon onClick={skipToPrevious} className="button w-8 h-8" />

        {isPlaying ? (
          <PauseCircleIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        )}

        <SkipNextIcon onClick={skipToNext} className="button w-8 h-8" />

        <LoopIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5 z-10">
        {volume == 0 && <VolumeOffIcon className="button" />}
        {volume > 0 && volume < 50 && <VolumeDownIcon className="button" />}
        {volume >= 50 && <VolumeUpIcon className="button" />}
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}

export default Player;
