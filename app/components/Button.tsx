import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
    return <button className={`w-fit bg-[#1671D9] text-white px-4 py-1 rounded-lg ${props.className}`} {...props}>{props.children}</button>;
};

export default Button;