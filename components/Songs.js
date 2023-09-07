import { useRecoilValue } from "recoil";
import { playlistState } from "@/atoms/playlistAtom";
import Song from "./Song";
import { Skeleton } from "@mui/material";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  console.log(playlist?.tracks);
  return (
    <div className="px-8 flex flex-col space-y-1 pb-32 text-md lg:text-md">
      {playlist?.tracks.items ? (
        <>
          {playlist?.tracks.items.map((track, i) => (
            <Song key={track.id} track={track} order={i} />
          ))}
        </>
      ) : (
        <>
          {[...Array(10)].map((_, i) => (
            <div
              className={`grid grid-cols-2 text-[#bbb] py-4 px-5 bg-[#2e2e2e] rounded-lg cursor-pointer`}
            >
              <div className="flex items-center space-x-4">
                <Skeleton width={20} height={20} />

                <Skeleton
                  variant="rectangular"
                  width={41}
                  height={41}
                  sx={{ minWidth: 41 }}
                  animation="pulse"
                />
                <div className="space-y-1">
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    animation="pulse"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={75}
                    height={"1.25rem"}
                    animation="pulse"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between ml-auto md:ml-0">
                <Skeleton
                  variant="rectangular"
                  className="hidden md:inline"
                  width={150}
                  animation="pulse"
                />
                <Skeleton
                  variant="rectangular"
                  width={30}
                  height={"1.25rem"}
                  animation="pulse"
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Songs;
