"use client";

import { addCategoryAPI, addTripAPI, editCategoryApi, getCategoryByIdAPI } from "@/app/services/companyAPI";
import Layout from "@/components/company/Layout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  categoryName: string;
};

const EditCategory = () => {
  const params = useParams(); // Access the dynamic parameters
  const categoryId: any = params.id;

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      categoryName: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!categoryId) return console.log("nothing");

      try {
        const categoryData = await getCategoryByIdAPI(categoryId);
        console.log({ categoryData });
        setValue("categoryName", categoryData.name);

      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
  }, [categoryId, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form Data:", data);
    console.log(data.categoryName);

    // // Create a new FormData object
    // const formData = new FormData();

    // formData.append("categoryName", data.categoryName);

    // console.log(formData);

    try {
      const result = await editCategoryApi(data, categoryId);
      if (result) {
        toast.success("Category edited successfully");
        setTimeout(() => {
          router.push(`/company/categorys`);
        }, 3000);
      } else {
        toast.error("somthing went worng");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }

    // TODO: Submit the form data to the backend
  };

  return (
    <Layout>
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
        <div className="w-full max-w-4xl flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">Vehicle Categories</h1>
        </div>

        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">General Information</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                {...register("categoryName", {
                  required: "category Name is required", 
                  pattern: {
                    value: /^[A-Za-z0-9]+$/, 
                    message: "Only alphabets and numbers are allowed",
                  },
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Category name cannot be empty or spaces",
                })}
                placeholder="Type category name here..."
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
              {/* Show error message if validation fails */}
              {errors.categoryName && (
                <span className="text-red-500 text-sm">
                  {errors.categoryName.message}
                </span>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditCategory;
