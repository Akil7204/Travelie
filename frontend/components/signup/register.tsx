"use client";

import { GoogleLoginAPI, SignUpAPI } from "@/app/services/allAPI";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/firebase/firebase";

type Inputs = {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const [googleLogin, setGoogleLogin] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: "",
    phone: "",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, phone, email, password } = data;

    const reqBody = new FormData();
    reqBody.append("username", username || "");
    reqBody.append("phone", phone);
    reqBody.append("email", email);
    reqBody.append("password", password);

    const reqHeader = {
      "Content-Type": "application/json",
    };

    try {
      const result = await SignUpAPI(reqBody, reqHeader);
      console.log("SignUpAPI result:", result); // Debugging line

      if (result.error) {
        toast.error(result.message);
      } else if (result) {
        toast.success("OTP sent, please check your mail.");
        router.push(`/otp?email=${email}`);
      }
    } catch (err) {
      // console.error('SignUpAPI error:', err); // Debugging line
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      setGoogleLogin({
        email: result.user.email!,
        username: result.user.displayName!,
        profileImage: result.user.photoURL!,
        password: "",
        phone: result.user.phoneNumber || "",
      });
      const googleLoginResult = await GoogleLoginAPI(googleLogin);
      console.log(googleLoginResult);
      if (
        googleLoginResult &&
        googleLoginResult.user &&
        googleLoginResult.token
      ) {
        localStorage.setItem("token", googleLoginResult.token);
        localStorage.setItem("user", JSON.stringify(googleLoginResult.user));
        toast.success("Login Successful!");

        router.push("/");
      } else {
        toast.error("Google authentication failed. Please try again.");
      }
    } catch (error) {
      console.log("could not loggin with google: ", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                {...register("username", { required: "Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                    message:
                      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords do not match";
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
            >
              Continue with email
            </button>
          </form>
          <div className="my-4 text-center text-gray-500">
            or use one of these options
          </div>
          <button
            type="button"
            onClick={handleGoogleClick}
            className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-100"
          >
            <img
              src="/google-icon.svg"
              alt="Google"
              className="inline-block w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              You have company?{" "}
              <a
                href="/company/signup"
                className="text-blue-500 hover:text-blue-700"
              >
                Sign in
              </a>
            </p>
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:text-blue-700">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
