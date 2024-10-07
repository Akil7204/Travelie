"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp } from "@/app/services/companyAPI";

type OTPFormInputs = {
  otp: string;
};

const OtpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormInputs>();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleOtpSubmit: SubmitHandler<OTPFormInputs> = async (data) => {
    try {
      await verifyOtp({ otp: data.otp, email });
      toast.success("Please login");
      router.push("/company/signin");
    } catch (error) {
      toast.error("Invalid OTP.");
    }
  };

  const handleResendOtp = () => {
    setTimeLeft(60);
    setIsResendDisabled(true);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Travelie</h1>
      </div>
      <div className="w-full max-w-sm space-y-6 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center">OTP</h2>
        <p className="text-center text-gray-600">Check your Email for an OTP.</p>

        <form onSubmit={handleSubmit(handleOtpSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <input
              id="otp"
              type="text"
              placeholder="Enter Your OTP"
              maxLength={6}
              className={`w-40 text-center px-4 py-2 border ${
                errors.otp ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900`}
              {...register("otp", {
                required: "OTP is required",
                pattern: /^[0-9]{6}$/,
              })}
            />
          </div>
          {errors.otp && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {errors.otp.message || "Enter a valid 6-digit OTP"}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4">
          {isResendDisabled ? (
            <p className="text-sm text-gray-600">
              Resend OTP in{" "}
              <span className="font-medium text-gray-900">{timeLeft} seconds</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              Resend OTP
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          By creating an account, you agree with our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Privacy Statement
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const OTPPage = () => (
  <Suspense fallback={<div>Loading OTP form...</div>}>
    <OtpForm />
  </Suspense>
);

export default OTPPage;
