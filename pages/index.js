import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useRef } from "react";
import Layout from "@/components/Layout/Layout";
import { checkAuthenticate } from "@/utils/protectedRoutes";
import { getUser } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/context/userContext";
import io from "socket.io-client";
import { InboxContext } from "@/context/inbox";
import { SocketContext } from "@/context/socketContext";

export default function Home({ session }) {
  const { setUser } = useContext(UserContext);
  const { socket, setSocketConnected, socketConnected } = useContext(SocketContext);
  const { setConversations } = useContext(InboxContext);
  const { email } = session.session.user;
  const { data, isLoading, error } = useQuery(
    ["user", session.session.user.email],
    async () => {
      return await getUser(email, setUser);
    }
  );
  
  const socketInitializer = () => {
    if (email || !socket.current) {
      
      socket.current = io("http://localhost:3000");
      socket.current.emit("addUser", email);
      socket.current.on("connect", () => {
        console.log("initialized", socket.current.id);
        if (socket) {
          setSocketConnected(true);
        }
      });
      socket.current.on("disconnect", () => {
        setSocketConnected(false);
      });
    }
  };
  const fetchConvo = async (socket) => {
    await fetch(`/api/conversation/${email}`);
    socket.current.emit("fetchConvo", email);
    socket.current.on("inboxFetched", (data) => {
      setConversations(data?.data);
    });
  };

  useEffect(() => {
    if (socket) {
      fetchConvo(socket);
    }
    if (socket) {
      return () => {
        socket.current.off("fetchConvo");
        socket.current.off("inboxFetched");
      };
    }
  }, [socketConnected]);

  useEffect(() => {
    socketInitializer();
  }, [email]);

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
