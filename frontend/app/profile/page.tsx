"use client";

// pages/manage-account.tsx
import React, { useState } from "react";
import Image from "next/image";
import Prfile from "@/components/profile/Profile";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import { updateUserProfileAPI } from "../services/allAPI";

interface UserProfile {
  profileImage: File;
  username: string;
  email: string;
  phone: number;
  password?: string;
}

const ManageAccount: React.FC = () => {
  const [profileImagePreview, setProfileImagePreview] = useState<File | null>(
    null
  );
  const [imageProfile, setImageProfile] = useState<File | null>(null)
  console.log(imageProfile);
  
  const [loading, setLoading] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<any>({
    profileImage:
      JSON.parse(localStorage.getItem("user") || "{}")?.profileImage || "",
    username: JSON.parse(localStorage.getItem("user") || "{}")?.username || "",
    email: JSON.parse(localStorage.getItem("user") || "{}")?.email || "",
    phone: JSON.parse(localStorage.getItem("user") || "{}")?.phone || "",
    password: "",
  });
  //   console.log({userProfile});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as any);
        setUserProfile((prev: any) => ({
          ...prev,
          registerImage: image,
        }));
      };
      reader.readAsDataURL(image);
      setImageProfile(image)
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    setUserProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const { username, profileImage, password, phone } = userProfile;
    const token = localStorage.getItem("token");

    if (!username) {
      toast.warning("Please fill the form completely!");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("phone", phone.toString());
    if (imageProfile) {
      reqBody.append(
        "file",
        imageProfile
      );
    }

    // reqBody.append(
    //   "profileImage",
    //   profileImage instanceof File ? profileImage : profileImagePreview
    // );

    if (token) {
      setLoading(true);
      try {
        console.log({ reqBody });

        const result = await updateUserProfileAPI(reqBody);

        if (result) {
          toast.success("Your profile updated successfully");
          localStorage.setItem("user", JSON.stringify(result));
          // navigate("/");
        } else {
          toast.info(result || "Something went wrong!");
        }
      } catch (err: any) {
        if (err.response && err.response.status === 403) {
          toast.warning("Your account is blocked. Please contact support.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // navigate("/");
        } else {
          console.error(err);
          toast.error("An error occurred while updating your profile.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Prfile>
        <div className="md:flex md:space-x-6">
          {/* Profile Image Upload */}
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : userProfile.profileImage
                  }
                  alt="Profile"
                  width={128}
                  height={128}
                  itemType="image/*"
                  className="object-cover"
                />
              </div>
              <label className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">
                Upload Photo
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
            </div>
          </div>

          {/* Account Details Form */}
          <div className="mt-6 md:mt-0 md:w-2/3">
            <h3 className="text-xl font-semibold mb-4">Manage Account</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userProfile.username}
                  onChange={handleFieldChange}
                  placeholder="Enter your username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleFieldChange}
                  placeholder="Email address"
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleFieldChange}
                  placeholder="Your phone number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                />
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors sm:text-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
        <br />
        <hr className="border-b-2 border-blue-300" />
        {/* Change Password Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Current Password</label>
              <input
                type="password"
                placeholder="Current password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
              />
            </div>
            <div>
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="New password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors sm:text-lg"
            >
              Change Password
            </button>
          </form>
        </div>
      </Prfile>
      <Footer />
    </>
  );
};

export default ManageAccount;
