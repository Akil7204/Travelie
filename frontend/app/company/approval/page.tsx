import React from "react";
import Image from "next/image";

const CheckInbox: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <header className="absolute top-0 left-0 m-4">
        <h1 className="text-xl font-semibold">Travelie</h1>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
        <div className="mb-4">
          <Image
            src="/img/inbox.jpeg" // Replace with the path to your image
            alt="Check your Inbox"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        <h2 className="text-xl font-bold mb-2">Check your Inbox</h2>
        <p className="text-gray-600">
          We have to verify your profile. After that, we will update you via
          email. Thank you.
        </p>

        <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
          <a href="/company/signin">Back to Sign In</a>
        </button>
      </div>
    </div>
  );
};

export default CheckInbox;
