<h1 align="center">Spotifty Music App 🎵</h1>

![License](https://img.shields.io/github/license/EduardoAlbert/spotify-music-app)
![Forks](https://img.shields.io/github/forks/EduardoAlbert/spotify-music-app)
![Stars](https://img.shields.io/github/stars/EduardoAlbert/spotify-music-app)
![Issues](https://img.shields.io/github/issues/EduardoAlbert/spotify-music-app)

This is a web application project built with Next.js that utilizes the Spotify API to allow users to access their music and listen to their favorite playlists directly within the platform.

Watch a demo video [here](https://www.youtube.com/). (In progress)

### Key Challenges and Features

-   [x] **Integration with the Spotify API**: The application is capable of fetching Spotify playlists and controlling music playback using the official Spotify API.

-   [x] **User Authentication with Spotify and NextAuth**: I've implemented user authentication that enables users to log in using their Spotify accounts. This also includes the use of access and refresh JWT tokens to securely keep users logged in.

-   [x] **Stunning Responsive UI with Tailwind CSS**: The application boasts a beautiful and responsive user interface, thanks to the use of the Tailwind CSS framework.

-   [x] **Utilizing Next.js 12 Middleware for Authenticated User Access Control**: I've learned how to use Next.js 12 Middleware capabilities to protect routes and ensure that only authenticated users have access to the resources.

-   [x] **State Management with Recoil**: To handle playlist and song switching effectively, I use the Recoil library for state management.

-   [x] **Debounce for Handling Intensive Requests**: I've implemented the debounce technique to manage intensive requests, such as adjusting volume through the Spotify API.

## How to run

To get started with the Spotify Music App, follow these steps:

1. **Install Dependencies**: Run the following command to install all the necessary dependencies:

```shell
npm install
```

2. **Start the Development Server**: After installing the dependencies, start the development server with the following command:

```shell
npm run dev
```

This will start the application locally, and you can access it at http://localhost:3000.

### Additional Configuration

To make the application work correctly, you need to set up Spotify and NextAuth credentials. Ensure you create an application in the Spotify Developer Dashboard and configure the appropriate environment variables in the `.env` file.

Please note that an active Spotify device is required for full functionality.

## Contribution

I would be delighted to receive your contributions to enhance the Spotify Music App. Feel free to open issues or submit pull requests with improvements.

## Acknowledgments

-   [React](https://reactjs.org/)
-   [Next.js](https://nextjs.org/)
-   [NextAuth](https://next-auth.js.org/)
-   [Spotify API](https://developer.spotify.com/documentation/web-api/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Recoil](https://recoiljs.org/)
-   [Debounce](https://www.npmjs.com/package/debounce)
-   [Mui](https://mui.com/)
-   [Heroicons](https://heroicons.com/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
