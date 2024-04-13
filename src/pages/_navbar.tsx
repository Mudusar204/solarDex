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

import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Image from "next/image";
import TwitterLogin from "react-twitter-login";

function NavbarCustom() {
  const handleTwitterLoginSuccess = (err: any, response: any) => {
    console.log(err, "-------Twitter login successful:--------", response);
    // Handle the successful login here, you can send the response to your server for further processing
  };

  const handleTwitterLoginFailure = (error: any) => {
    console.error("Twitter login error:", error);
    // Handle the login failure here
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
            <a
              style={{ textDecoration: "none" }}
              href="/"
              className="text-[#B4B4B4] text-xl cursor-pointer hover:text-gray-400 "
            >
              Home
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="/EarnPoints"
              className="text-[#B4B4B4] text-xl cursor-pointer hover:text-gray-400"
            >
              Earn Points
            </a>

            <TwitterLogin
              authCallback={handleTwitterLoginSuccess}
              // onFailure={handleTwitterLoginFailure}
              consumerKey="piUXeaBS2KNwBlZtAtG2bgyFT"
              consumerSecret="koFXFNssEZGf90EaImpLZDnGvsQvnojh3wX1AfXXEqpU0OKH4H"
              callbackUrl="https://www.youtube.com/"
              // className="flex items-center  bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-md"
              // buttonText={
              //   <>
              //     <img className="h-6 w-7" src="/xIcon.png" alt="" /> Login with
              //     Twitter
              //   </>
              // }
            />
          </div>
          {/* <w3m-button /> */}
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarCustom;
