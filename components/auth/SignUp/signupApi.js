import axios from "axios";

export async function registerApi(userName, email, password) {
  await axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      userName,
      email,
      password,
    })
    .then((response) => {
      router.push("/auth/signin");
      return response;
    })
    .catch((error) => {
      return error;
    });
}
