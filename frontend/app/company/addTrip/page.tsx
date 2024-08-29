"use client";

import { addTripAPI } from "@/app/services/companyAPI";
import Layout from "@/components/company/Layout";
import { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";

type FormValues = {
  tripName: string;
  description: string;
  images: File[];
  days: number;
  startingFrom: string;
  endingAt: string;
  startingDate: string;
  endingDate: string;
  basePrice: number;
  locations: { location: string }[];
  category: string;
  seats: string;
  status: string;
};

const AddTrip = () => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tripName: "",
      description: "",
      images: [],
      days: 0,
      startingFrom: "",
      endingAt: "",
      startingDate: "",
      endingDate: "",
      basePrice: 0,
      locations: [{ location: "" }],
      category: "",
      seats: "",
      status: "Upcoming",
    },
  });

  const {
    fields: locationFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "locations",
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      console.log(filesArray.length);

      setPhotos((prevPhotos) => [...prevPhotos, ...filesArray]);

      // Update the form with the new photo list
      setValue("images", [...photos, ...filesArray]);
    }
  };

  const removePhoto = (index: number) => {
    const uploadPhotos = photos.filter((_, i) => i !== index);
    setPhotos(uploadPhotos);
    // Update the form with the updated photo list
    setValue("images", uploadPhotos);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form Data:", data);
    console.log(data.images.length);

    // Create a new FormData object
    const formData = new FormData();

    formData.append("tripName", data.tripName);
    formData.append("description", data.description);
    formData.append("days", data.days.toString());
    formData.append("startingFrom", data.startingFrom);
    formData.append("endingAt", data.endingAt);
    formData.append("startingDate", data.startingDate);
    formData.append("endingDate", data.endingDate);
    formData.append("basePrice", data.basePrice.toString());
    // data.locations.forEach((loc, index) => {
    //   formData.append(`locations[${index}]`, loc.location);
    // });
    formData.append("locations", JSON.stringify(data.locations));
    formData.append("category", data.category);
    formData.append("seats", data.seats);
    formData.append("status", data.status);

    // // Append images to formData
    // data.images.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });

      // Append other form data
  // formData.append('fieldName', data.fieldName);
  // Append images
  if (data.images) {
    data.images.forEach((image, index) => {
      formData.append(`images`, image, image.name);
    });
  }



    const result = await addTripAPI(formData);

    // TODO: Submit the form data to the backend
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add Trip</h1>
          <button
            type="submit"
            form="addTripForm"
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            + Add Trip
          </button>
        </div>

        <form
          id="addTripForm"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-6"
        >
          <div className="col-span-8 space-y-6">
            {/* General Information */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                General Information
              </h2>
              <div className="space-y-4">
                <Controller
                  name="tripName"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Trip Name"
                      {...field}
                      className="w-full p-2 border rounded"
                    />
                  )}
                  rules={{ required: "Trip Name is required" }}
                />
                {errors.tripName && (
                  <p className="text-red-500">{errors.tripName.message}</p>
                )}
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      placeholder="Description"
                      {...field}
                      className="w-full p-2 border rounded h-24"
                    />
                  )}
                  rules={{ required: "Description is required" }}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Media */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Media</h2>
              <div className="space-y-4">
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label className="block">
                        <span className="block mb-2">Upload Images</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          multiple
                        />
                      </label>
                      {errors.images && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.images.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="p-4 bg-white rounded-lg shadow-md min-h-[300px]">
              <h2 className="text-lg font-semibold mb-4">Trip Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Controller
                    name="days"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Days"
                        {...field}
                        className={`w-full p-2 border rounded ${
                          errors.days || errors.days === 0
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    )}
                    rules={{ required: "Days are required" }}
                  />
                  {(errors.days || errors.days == 0) && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.days.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Controller
                    name="startingFrom"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Starting From"
                        {...field}
                        className={`w-full p-2 border rounded ${
                          errors.startingFrom ? "border-red-500" : ""
                        }`}
                      />
                    )}
                    rules={{ required: "Starting From is required" }}
                  />
                  {errors.startingFrom && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startingFrom.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Controller
                    name="endingAt"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Ending At"
                        {...field}
                        className={`w-full p-2 border rounded ${
                          errors.endingAt ? "border-red-500" : ""
                        }`}
                      />
                    )}
                    rules={{ required: "Ending At is required" }}
                  />
                  {errors.endingAt && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endingAt.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Controller
                    name="startingDate"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="date"
                        placeholder="Starting Date"
                        {...field}
                        className={`w-full p-2 border rounded ${
                          errors.startingDate ? "border-red-500" : ""
                        }`}
                      />
                    )}
                    rules={{ required: "Starting Date is required" }}
                  />
                  {errors.startingDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startingDate.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Controller
                    name="endingDate"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="date"
                        placeholder="Ending Date"
                        {...field}
                        className={`w-full p-2 border rounded ${
                          errors.endingDate ? "border-red-500" : ""
                        }`}
                      />
                    )}
                    rules={{
                      required: "Ending Date is required",
                      validate: (value) => {
                        const startingDate = new Date(
                          getValues("startingDate")
                        );
                        const endingDate = new Date(value);
                        return (
                          endingDate >= startingDate ||
                          "Ending Date must be after Starting Date"
                        );
                      },
                    }}
                  />
                  {errors.endingDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endingDate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Pricing</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Controller
                    name="basePrice"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="Base Price"
                        {...field}
                        className="w-full p-2 border rounded"
                      />
                    )}
                    rules={{
                      required: "Base Price is required",
                      min: {
                        value: 0.01,
                        message: "Base Price must be greater than zero",
                      },
                    }}
                  />
                  {errors.basePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.basePrice.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Locations</h2>
              {locationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex space-x-4 mb-4 items-center"
                >
                  <Controller
                    name={`locations.${index}.location`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Location"
                        {...field}
                        className="w-full p-2 border rounded"
                      />
                    )}
                    rules={{ required: "Location is required" }}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ location: "" })}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                + Add Location
              </button>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            {/* Category */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Category</h2>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full p-2 border rounded">
                    <option value="">Select Category</option>
                    <option value="Adventure">bus</option>
                    <option value="Relaxation">Traveller</option>
                    <option value="Culture">Jeep</option>
                  </select>
                )}
                rules={{ required: "Category is required" }}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Status</h2>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full p-2 border rounded">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                )}
              />
            </div>

            {/* Seats */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Seats</h2>
              <Controller
                name="seats"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Seats"
                    {...field}
                    className="w-full p-2 border rounded"
                  />
                )}
                rules={{ required: "Seats are required" }}
              />
              {errors.seats && (
                <p className="text-red-500">{errors.seats.message}</p>
              )}
            </div>

            
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddTrip;
