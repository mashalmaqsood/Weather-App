import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white text-center py-48"
    >
    <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
    <p className="text-xl mb-6">Sorry, Cannot load weather for this place.</p>
  </div>
  );
};

export default NotFound;
