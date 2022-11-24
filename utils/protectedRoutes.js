const { getSession } = require("next-auth/react");

export const checkAuthenticate = async (context, cb) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return cb({ session });
};
