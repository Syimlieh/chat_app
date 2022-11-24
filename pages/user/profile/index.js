import { default as Profilecomponent } from "@/components/user/Profile";
import { checkAuthenticate } from "@/utils/protectedRoutes";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = ({ session }) => {
  return (
    <div>
      <Profilecomponent session={session.session} />
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  return checkAuthenticate(context, (session) => {
    return {
      props: { session }, // will be passed to the page component as props
    };
  });
}
