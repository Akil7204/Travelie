"use client";

import { SignUpAPI } from "@/app/services/companyAPI";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  companyname: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { companyname, phone, email, password } = data;

    const reqBody = new FormData();
    reqBody.append("companyname", companyname || "");
    reqBody.append("phone", phone);
    reqBody.append("email", email);
    reqBody.append("password", password);

    const reqHeader = {
      "Content-Type": "application/json",
    };

    try {
      const result = await SignUpAPI(reqBody, reqHeader);
      console.log("SignUpAPI result:", result); 

      if (result.error) {
        toast.error(result.message);
      } else if (result) {
        toast.success("OTP sent, please check your mail.");
        router.push(`/company/otp?email=${email}`);
      }
    } catch (err: any) {
      // console.error('SignUpAPI error:', err); // Debugging line
      toast.error("Invalid credentials !");
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
          <h1 className="text-2xl font-bold mb-6 text-center">Company Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="companyname"
                type="text"
                {...register("companyname", { required: "Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
              />
              {errors.companyname && (
                <p className="text-red-500 text-xs italic">
                  {errors.companyname.message}
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
            <div className="my-4 text-center text-gray-500">
              or use one of these options
            </div>
            <button
              type="button"
              // onClick={handleGoogleClick}
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
                Already have an account?{" "}
                <a
                  href="/company/signin"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
