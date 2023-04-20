import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InboxProvider } from "@/context/inbox";
import { UserContextProvider } from "@/context/userContext";
import { SocketContextProvider } from "@/context/socketContext";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <InboxProvider>
            <SocketContextProvider>
              <Component {...pageProps} />
            </SocketContextProvider>
          </InboxProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
