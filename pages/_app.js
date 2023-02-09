import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InboxProvider } from "@/context/inbox";
import { UserContextProvider } from "@/context/userContext";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <InboxProvider>
            <Component {...pageProps} />
          </InboxProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
