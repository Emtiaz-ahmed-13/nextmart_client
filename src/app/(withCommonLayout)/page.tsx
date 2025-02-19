"use client";

import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return <div>Welcome to nextMart Home Page</div>;
};
export default HomePage;
