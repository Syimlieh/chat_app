// import { Login as MyLogin } from "@/components/auth2/login";
// import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";

// const Login = () => {
//   return (
//     <div>
//       <MyLogin />
//     </div>
//   );
// };

// export default Login;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   //
//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
