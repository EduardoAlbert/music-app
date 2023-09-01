import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/time";
import { useRecoilState } from "recoil";

import GraphicEqIcon from '@mui/icons-material/GraphicEq';

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  return (
    <div
      className={`grid grid-cols-2 text-[#bbb] py-4 
    px-5 hover:bg-[#2e2e2e] ${track.track.id == currentTrackId ? 'bg-[#181818]' : ''} hover:text-white rounded-lg cursor-pointer`}
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        {track.track.id == currentTrackId && isPlaying ? (
            <GraphicEqIcon className="h-5 w-5 animate-pulse" />
        ) : (
            <p className="w-5">{order + 1}</p>
        )}
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 text-white truncate" title={track.track.name}>{track.track.name}</p>
          <p className="w-40" title={track.track.artists[0].name}>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-52 hidden md:inline truncate" title={track.track.album.name}>
          {track.track.album.name}
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
