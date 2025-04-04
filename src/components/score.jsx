// Score.jsx
import React from 'react';

const Score = ({ score }) => {
    return (
        <div>
            <h3 className="text-3xl font-bold dark:text-white">Score: {score}</h3>
        </div>
    );
};

export default Score;
