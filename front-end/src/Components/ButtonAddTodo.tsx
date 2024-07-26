import React from 'react';

interface ButtonAddTodoProps {
    onClick: () => void;
}
export const ButtonAddTodo: React.FC<ButtonAddTodoProps> = ({ onClick }) => { 
    
    return  <>
            <button
                onClick={onClick}
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 5v10m5-5H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </>
}