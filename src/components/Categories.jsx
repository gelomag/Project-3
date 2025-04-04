import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access the state passed from the previous page
  const { userName } = location.state || {}; // Destructure to get the userName (default to empty if not found)

  const handleCategory = (e) => {
    e.preventDefault();
    navigate('/science');  // Navigate to the Science page
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#252525] w-[500px] rounded-[30px] p-12 m-4">
        <h4 className="text-2xl font-bold dark:text-white text-center">Welcome</h4>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
          {/* Display the user name passed from Login page */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{userName ? userName : 'Guest'}</span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 pb-8 text-center">
          You're now ready to use the Quiz Bee App. Feel free to log in as a guest.
        </p>
        <form className="max-w-sm mx-auto">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-8 text-center w-full me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={handleCategory}
          >
            Science
          </button>
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-8 text-center w-full me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={handleCategory}
          >
            History
          </button>
        </form>
      </div>
    </div>
  );
};

export default Categories;
