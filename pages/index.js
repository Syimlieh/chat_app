import Head from "next/head";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import { checkAuthenticate } from "@/utils/protectedRoutes";
import { getUser } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/context/userContext";

export default function Home({ session }) {
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        // sendMessage();
      }
    }
  };
  const { data, isLoading, error } = useQuery(
    ["user", session.session.user.email],
    async () => {
      return await getUser(session.session.user.email, setUser);
    }
  );

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="google-site-verification"
            content="EFU9D6XpiSejTgyiMfgklatCJHoKwe1sfQKWgrUhfd4"
          />
        </Head>
        <Layout session={session} />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  return checkAuthenticate(context, (session) => {
    return {
      props: { session }, // will be passed to the page component as props
    };
  });
}
