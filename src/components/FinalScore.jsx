import { useLocation, useNavigate } from 'react-router-dom';

const FinalScore = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Hook to navigate to other routes
    const { score } = location.state;  // Access the score passed through navigation

    // Handle navigation to the categories page
    const handleBackToCategory = () => {
        navigate('/categories');  // Replace '/categories' with the actual route to your Categories page
    };

    // Handle navigation to the login page
    const handleExit = () => {
        navigate('/');  // Replace '/login' with the actual route to your Login page
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-[#252525] w-full sm:w-[500px] rounded-[30px] p-6 sm:p-12 text-center m-4">
                <h1 className="text-3xl font-bold text-white">Final Score: {score}</h1>
                {/* Buttons for navigation */}
                <div className="mt-6 space-x-4">
                    <button
                        onClick={handleBackToCategory}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
                    >
                        Back to Categories
                    </button>
                    <button
                    onClick={handleExit}
                    type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    Exit
                    </button>

                </div>
            </div>
        </div>
    );
};

export default FinalScore;
