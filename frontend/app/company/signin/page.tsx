"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import { LoginAPI } from "@/app/services/companyAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
  keepMeSignedIn: boolean;
};

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const result = await LoginAPI(data);
      console.log("LoginAPI result:", result); 

      if (result && !result.company.adminVerified) {
        router.push("/company/approval");
      } else if (result && result.company && result.companyToken) {
        console.log(result.company.adminVerified);

        localStorage.setItem("companyToken", result.companyToken);
        localStorage.setItem("company", JSON.stringify(result.company));
        document.cookie = `TokenCompany=${result.companyToken}`
        toast.success("Login Successful!");
        router.push("/company/dashboard");
      } else {
        toast.error("Invalid login credentials. Please try again.");
      }

      // if (result && result.company && result.companyToken) {
      //   console.log(result.company.adminVerified);

      //   localStorage.setItem("companyToken", result.companyToken);
      //   localStorage.setItem("company", JSON.stringify(result.company));

      //   toast.success("Login Successful!");
      //   router.push("/company/dashboard");
      // } else {
      //   toast.error("Invalid login credentials. Please try again.");
      // }
    } catch (err) {
      // console.error('LoginAPI error:', err); // Debugging line
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Company Sign in
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 bg-white p-8 shadow-md rounded-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="keepMeSignedIn"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register("keepMeSignedIn")}
                />
                <label
                  htmlFor="keepMeSignedIn"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Keep me signed in
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue with email
              </button>
            </div>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
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
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Continue with Google
              </button>
            </div>
            <div className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <a
                href="/company/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
