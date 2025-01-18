"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
// import { useRouter } from "next/router"
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/company/Layout";
import { editTripApi, getTripByIdAPI } from "@/app/services/companyAPI";

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

const EditTrip = () => {
  const params = useParams(); 
  const router = useRouter()
  const tripId: any = params.id;

  const {
    control,
    handleSubmit,
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


  // [{ locations: ""}, {location: ""}]

  const [photos, setPhotos] = useState<File[]>([]);
  const [image, setImage] = useState([])
  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!tripId) return console.log("nothing");

      try {
        const tripData = await getTripByIdAPI(tripId);
        console.log({ tripData });
        const formatDateToDDMMYYYY = (isoDate: any) => {
          const date = new Date(isoDate);
          const day = String(date.getDate()).padStart(2, "0"); 
          const month = String(date.getMonth() + 1).padStart(2, "0"); 
          const year = date.getFullYear();
          return `${year}-${month}-${day}`; 
        }; 
        console.log(tripData.locations);
        // tripData.locations = tripData.locations.map((item: any) => ({location: item}))
        if (tripData.locations?.[0]?.location) {
          const parsedLocations = JSON.parse(tripData.locations[0].location);
          tripData.locations = parsedLocations.map((item: string) => ({ location: item }));
        }
        
        setValue("tripName", tripData.tripName);
        setValue("description", tripData.description);
        setValue("days", tripData.days);
        setValue("startingFrom", tripData.startingFrom);
        setValue("endingAt", tripData.endingAt);
        setValue("startingDate", formatDateToDDMMYYYY(tripData.startingDate));
        setValue("endingDate", formatDateToDDMMYYYY(tripData.endingDate));
        setValue("basePrice", tripData.price);
        setValue("locations", tripData.locations);
        setValue("category", tripData.category);
        setValue("seats", tripData.seats);
        setValue("status", tripData.status);
        setImage(tripData.images)
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
  }, [tripId, setValue]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos((prevPhotos) => [...prevPhotos, ...filesArray]);
      setValue("images", [...photos, ...filesArray]);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    setValue("images", updatedPhotos);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    formData.append("tripName", data.tripName);
    formData.append("description", data.description);
    formData.append("days", data.days.toString());
    formData.append("startingFrom", data.startingFrom);
    formData.append("endingAt", data.endingAt);
    formData.append("startingDate", data.startingDate);
    formData.append("endingDate", data.endingDate);
    formData.append("basePrice", data.basePrice.toString());
    // let location = data.locations.map((val) => val.location);
    // console.log("form data", data.locations);
    // console.log(location);
    // formData.append("locations", JSON.stringify(location));
    // formData.append(
    //   "locations",
    //   JSON.stringify(data.locations.map((loc) => loc.location))
    // );
    formData.append("category", data.category);
    formData.append("seats", data.seats);
    formData.append("status", data.status);

    if (data.images) {
      data.images.forEach((image) => {
        formData.append("images", image, image.name);
      });
    }

    try {
        const result = await editTripApi(formData, tripId);
        if (result) {
          toast.success("Trip updated successfully");
          setTimeout(() => {
            router.push(`/company/trips`);
          }, 3000);
        } else {
          toast.error("Something went wrong");
        }
    } catch (error) {
      console.error("Error updating trip:", error);
      toast.error("Error updating trip");
    }
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Edit Trip</h1>
          <button
            type="submit"
            form="addTripForm"
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            + Edit Trip
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
                <div className="grid grid-cols-3 gap-4">
                  {image?.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
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
            {/* <div className="p-4 bg-white rounded-lg shadow-md">
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
            </div> */}
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
                    <option value="Bus">bus</option>
                    <option value="Traveller">Traveller</option>
                    <option value="Jeep">Jeep</option>
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

export default EditTrip;
