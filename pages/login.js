import { getProviders, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-green-950 bg-opacity-20 z-10"></div>
      <video
        autoPlay
        loop
        muted
        className="absolute object-cover w-full h-full opacity-10 animate-pulse"
      >
        <source src="/party.mp4" type="video/mp4" />
      </video>

      <div className="absolute flex flex-col items-center min-h-screen w-full justify-center z-20">
        <img className="w-52 mb-5" src="https://i.imgur.com/fPuEa9V.png" />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-[#18D860] text-black font-bold p-5 rounded-2xl hover:bg-[#e2ece7] transition duration-200 ease-in-out"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
