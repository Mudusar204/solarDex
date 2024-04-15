// import React from "react";
// import { Navbar, NavbarBrand } from "reactstrap";
// import Image from "next/image";

// function NavbarCustom() {
//   return (
//     <div className="bg-light">
//       <Navbar className=" mx-[50px]">
//         <NavbarBrand className="flex items-center" href="/">
//           <Image src="/logo-solar.svg" width="35" height="35" alt={"logo"} />
//           <h1 className="text-2xl text-[#B4B4B4]">SOLAR</h1>
//         </NavbarBrand>
//         <div className="flex items-center gap-5">
//           <div className="flex items-center gap-3">
//             <a
//               style={{ textDecoration: "none" }}
//               href="/"
//               className="text-[#B4B4B4] text-xl cursor-pointer hover:text-gray-400 "
//             >
//               Home
//             </a>
//             <a
//               style={{ textDecoration: "none" }}
//               href="/EarnPoints"
//               className="text-[#B4B4B4] text-xl cursor-pointer hover:text-gray-400"
//             >
//               Earn Points
//             </a>

//             <button className="flex items-center  bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-md">
//               Login with <img className="h-6 w-7" src="/xIcon.png" alt="" />
//             </button>
//           </div>
//           {/* <w3m-button /> */}
//         </div>
//       </Navbar>
//     </div>
//   );
// }

// export default NavbarCustom;

import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import TwitterLogin from "react-twitter-login";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
function NavbarCustom() {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const router = useRouter();
  const getUser = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      console.log(token, "get user token----");

      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
        {
          // const tasks = await axios.get("http://localhost:4000/task", {
          headers: {
            Authorization: `Bearer ${token}`,

            // Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(user, "user");
      setUser(user?.data?.data);
      setLoader(false);
    } catch (error) {
      console.log(error, "--------");
      setLoader(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);
  const handleTwitterLoginSuccess = async () => {
    try {
      setLoader(true);
      const token = await localStorage.getItem("token");
      const credentials = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/getRedirectUrl`,
        {
          // const tasks = await axios.get("http://localhost:4000/task", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjNjEzZmJiOTlhMTA0M2M0MTdjZDYiLCJpYXQiOjE3MTMxMzU5MzV9.w0v9xwvUOy77ZLrfv7N9Af_hy7Juq9jWnI9SSsjxGso`,
          },
        }
      );
      await localStorage.setItem(
        "oauth_token",
        credentials.data.data.oauth_token
      );
      await localStorage.setItem(
        "oauth_token_secret",
        credentials.data.data.oauth_token_secret
      );
      // window.open(credentials.data.data.url, "_blank");
      router.push(credentials.data.data.url);
      setLoader(false);
    } catch (error) {
      setLoader(false);

      console.log(error, "error while twitter login");
    }
  };

  useEffect(() => {
    if (router?.query?.oauth_verifier) {
      twitterLogin(router?.query?.oauth_verifier);
    }
  }, [router?.query?.oauth_verifier]);

  const twitterLogin = async (oauth_verifier: any) => {
    try {
      setLoader(true);
      const token = await localStorage.getItem("oauth_token");
      const secret = await localStorage.getItem("oauth_token_secret");
      const twitterLogin = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/twitterLogin`,
        {
          // Data should be passed as a separate object
          // without nesting headers inside it
        },
        {
          // Pass headers as a separate object
          headers: {
            token: token,
            secret: secret,
            verifier: oauth_verifier,
          },
        }
      );
      console.log(
        "----------",
        twitterLogin,
        "========================twitterLogin.=================="
      );
      await localStorage.clear();
      await localStorage.setItem("token", twitterLogin?.data?.user?.token);
      // setTasks(tasks?.data?.data);
      getUser();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error, "--------,twitterLogin");
    }
  };
  const handleTwitterLoginFailure = (error: any) => {
    console.error("Twitter login error:", error);
    // Handle the login failure here
  };

  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing local storage
    localStorage.clear();
    setShowLogoutPopup(false);
    setUser(null);
    // Redirect the user to the homepage or any other desired route
    router.push("/");
  };
  return (
    <div className="bg-light">
      <Navbar className=" mx-[50px]">
        <NavbarBrand className="flex items-center" href="/">
          <Image src="/logo-solar.svg" width="35" height="35" alt={"logo"} />
          <h1 className="text-2xl text-[#B4B4B4]">SOLAR</h1>
        </NavbarBrand>
        <div className="flex items-center gap-5">
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
              className="text-[#B4B4B4] text-xl cursor-pointer hover:text-gray-400"
            >
              Earn Points
            </Link>

            {/* <TwitterLogin
              authCallback={handleTwitterLoginSuccess}
              // onFailure={handleTwitterLoginFailure}

              consumerKey="piUXeaBS2KNwBlZtAtG2bgyFT"
              consumerSecret="koFXFNssEZGf90EaImpLZDnGvsQvnojh3wX1AfXXEqpU0OKH4H"
              callbackUrl="https://p19gt8xc-3000.usw2.devtunnels.ms/EarnPoints"
              // className="flex items-center  bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-md"
              // buttonText={
              //   <>
              //     <img className="h-6 w-7" src="/xIcon.png" alt="" /> Login with
              //     Twitter
              //   </>
              // }
            /> */}
            {user ? (
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="cursor-pointer"
              >
                {user?.name}
              </button>
            ) : loader ? (
              // <div className="h-full w-full flex justify-center items-center">
              <button>
                <div className="h-5 w-5 mx-5 animate-spin border-b-2 border-t-1 rounded-full border-gray-400"></div>
              </button>
            ) : (
              // </div>
              <button
                onClick={() => {
                  handleTwitterLoginSuccess();
                }}
              >
                Login with twitter
              </button>
            )}
          </div>
          {/* <w3m-button /> */}
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
