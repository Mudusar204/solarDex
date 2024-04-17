import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import TwitterLogin from "react-twitter-login";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
function NavbarCustom({ getTasks, isEarn, getUser, user, setUser }: any) {
  const [loader, setLoader] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router?.query?.oauth_verifier) {
      twitterLogin(router?.query?.oauth_verifier);
    }
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, [router?.query?.oauth_verifier]);

  const handleTwitterLogin = async () => {
    try {
      setLoader(true);
      const credentials = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/getRedirectUrl`
      );
      localStorage.setItem("oauth_token", credentials.data.data.oauth_token);
      localStorage.setItem(
        "oauth_token_secret",
        credentials.data.data.oauth_token_secret
      );
      // window.open(credentials.data.data.url, "_blank");
      router.push(credentials.data.data.url);
      // setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.dismiss();

      toast.error("error in Redirecting");
      console.log(error, "error while twitter login");
    }
  };

  const twitterLogin = async (oauth_verifier: any) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("oauth_token");
      const secret = localStorage.getItem("oauth_token_secret");
      const twitterLogin = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/twitterLogin`,
        {},
        {
          headers: {
            token: token,
            secret: secret,
            verifier: oauth_verifier,
          },
        }
      );

      localStorage.clear();
      localStorage.setItem("token", twitterLogin?.data?.user?.token);
      localStorage.setItem("user", JSON.stringify(twitterLogin?.data?.user));

      setUser(twitterLogin?.data?.user);
      getTasks();
      getUser();
      toast.success("Login success");
      router.push({
        pathname: "/EarnPoints",
        query: {},
      });
      // setLoader(false);
    } catch (error) {
      toast.dismiss();

      toast.error("error in twitter login");

      setLoader(false);
      console.log(error, "--------,twitterLogin");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutPopup(false);
    setUser(null);
    router.push("/");
  };

  return (
    <div className="bg-light">
      <Navbar className="mx-[50px]">
        <div className="flex items-center max-sm:justify-between max-sm:w-full max-sm:flex-row-reverse">
          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block sm:hidden text-gray-800 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
          {/* Brand */}
          <NavbarBrand className="flex items-center" href="/">
            <Image src="/logo-solar.svg" width="35" height="35" alt={"logo"} />
            <h1 className="text-2xl text-[#B4B4B4]">SOLAR</h1>
          </NavbarBrand>
        </div>
        {/* Menu Items */}
        <div
          className={`sm:flex sm:items-center sm:w-auto ${
            menuOpen ? "block" : "hidden"
          } `}
        >
          <div className="flex items-center gap-3">
            <Link
              style={{ textDecoration: "none" }}
              href="/"
              className="text-[#B4B4B4] text-xl cursor-pointer hover:text-gray-400 "
            >
              Home
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              href="/EarnPoints"
              className="text-[#B4B4B4] whitespace-nowrap text-xl cursor-pointer hover:text-gray-400"
            >
              Earn Points
            </Link>
            {isEarn &&
              (user ? (
                <div className="flex items-center gap-1">
                  <img className="h-5 w-6" src="/coinIcon.png" alt="" />
                  <p className="mt-3">{user?.rewardPoints} |</p>
                  <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="cursor-pointer ml-3"
                  >
                    {user?.name}
                  </button>
                </div>
              ) : loader ? (
                <button>
                  <div className="h-5 w-5 mx-5 animate-spin border-b-2 border-t-1 rounded-full border-gray-400"></div>
                </button>
              ) : (
                <button
                  className="flex items-center bg-black text-white rounded-lg pl-4 py-0 text-[12px]"
                  onClick={() => {
                    handleTwitterLogin();
                  }}
                >
                  Login with
                  <img className="h-7 w-7 mr-1" src="/xIcon.png" alt="" />
                </button>
              ))}
          </div>
        </div>
      </Navbar>
      {showLogoutPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-lg mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-4 hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarCustom;
