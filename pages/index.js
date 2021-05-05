import Head from "next/head";
import App from "../components/App";

const Guestbook = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/static/favicon.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          font-family: "Verdana";
        }
      `}</style>
      <App />
    </>
  );
};

export default Guestbook;
