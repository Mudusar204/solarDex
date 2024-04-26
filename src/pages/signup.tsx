"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { signup, setUserLogin } from "../../store/userSlice";
import toast from "react-hot-toast";
import Image from "next/image";
export default function SignUp() {
  //   const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameErr] = useState("");
  const [emailError, setEmailErr] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [addressError, setAddressErr] = useState("");
  const [phoneError, setPhoneErr] = useState("");

  // Validation functions
  function isValidUsername(username: string | any[]) {
    return username.length >= 3;
  }

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string | any[]) {
    return password.length >= 8;
  }

  function isValidAddress(address: string) {
    return address.trim() !== "";
  }

  function isValidPhone(phone: string) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  }

  // Form validation function
  const validateForm = () => {
    let valid = true;

    if (!isValidUsername(username)) {
      setUsernameErr("Username must be at least 3 characters long");
      valid = false;
    } else {
      setUsernameErr("");
    }

    if (!isValidEmail(email)) {
      setEmailErr("Email is not valid");
      valid = false;
    } else {
      setEmailErr("");
    }

    if (!isValidPassword(password)) {
      setPasswordErr("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordErr("");
    }

    // if (!isValidPhone(phone)) {
    //   setPhoneErr("Please provide a valid phone number");
    //   valid = false;
    // } else {
    //   setPhoneErr("");
    // }

    return valid;
  };

  // Form submission function
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        toast.loading("User signup");
        // @ts-ignore
        // const res = await dispatch(
        //   signup({ name:username, email, password, phone })
        // );
        // if (res?.payload?.status === true) {
        //   toast.dismiss();
        //   toast.success("User signup successful");
        // //   dispatch(setUserLogin(true));
        //   await localStorage.setItem("role", res?.payload?.data?.role);
        //   await localStorage.setItem("token", res?.payload?.data?.token);
        //   // await localStorage.setItem("userId", res?.payload?.data?.user?.id);
        //   router.push("/");
        // } else {
        //   throw new Error("Signup failed");
        // }
      } catch (error) {
        toast.dismiss();
        toast.error("Signup failed");
        console.error("Error occurred while signing up:", error);
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Enter your username"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {usernameError && (
                      <p className="text-red-500 mt-1">{usernameError}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Enter your email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {passwordError && (
                      <p className="text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>

                  {/* <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="0321......"
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {phoneError && (
                      <p className="text-red-500 mt-1">{phoneError}</p>
                    )}
                  </div> */}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="text-center mt-2">
                  already have account?{" "}
                  <a className="text-blue-500" href="/login">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
          {/* <Image
           
           className="absolute inset-0 h-full w-full object-cover"
           src={require("../../assets/images/cleaning2.jpeg")}
           alt="img"
         /> */}
        </div>
      </div>
    </>
  );
}
