import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="mb-2 text-gray-700">{label}</label>}
            <input
                className="border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
                {...props}
            />
        </div>
    );
};

export default Input;