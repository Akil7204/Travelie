"use client";

import { GoogleLoginAPI, LoginAPI } from "@/app/services/allAPI";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { deleteCookie } from "@/utils/deleteCookie";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const result = await LoginAPI(data);
      console.log("LoginAPI result:", result.user); // Debugging line

      if (result && result.user && result.token) {

        console.log("isBlocked is: ", result.user);

        if (result.user.isBlocked === true) {
          deleteCookie("token");
          toast.error("You are blocked");
        } else {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          document.cookie = `userToken=${result.token}`
          toast.success("Login Successful!");
          router.push("/");
        }
        // navigate("/");
      } else {
        toast.error("Invalid login credentials. Please try again.");
      }
    } catch (err) {
      // console.error('LoginAPI error:', err); // Debugging line
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const googleLoginResult = await GoogleLoginAPI({
        email: result.user.email!,
        username: result.user.displayName!,
        profileImage: result.user.photoURL!,
        password: "",
        phone: result.user.phoneNumber || "",
      });
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email address is invalid",
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Keep me signed in
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue with email
              </button>
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  or use one of these options
                </span>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleGoogleClick}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.35 11.1h-9.6v1.9h5.75c-.3 1.57-1.22 2.9-2.58 3.75v3.1h4.15c2.43-2.24 3.84-5.54 3.84-9.4 0-.7-.07-1.37-.18-2z" />
                  <path d="M12.75 21.6c3.22 0 5.92-1.08 7.9-2.88l-4.15-3.1c-1.18.8-2.7 1.27-4.3 1.27-3.3 0-6.1-2.2-7.1-5.25h-4.3v3.3c1.98 3.88 6.13 6.65 10.95 6.65z" />
                  <path d="M5.65 14.4c-.2-.55-.35-1.15-.35-1.75s.1-1.2.35-1.75v-3.3h-4.3c-.75 1.5-1.15 3.18-1.15 5s.4 3.5 1.15 5z" />
                  <path d="M12.75 7.35c1.45 0 2.75.5 3.75 1.35l2.8-2.8c-1.8-1.7-4.5-2.75-7.55-2.75-4.82 0-8.97 2.77-10.95 6.65l4.3 3.3c1-3.05 3.8-5.25 7.1-5.25z" />
                </svg>
                Continue with Google
              </button>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  You have company?{" "}
                  <a
                    href="/company/signin"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
