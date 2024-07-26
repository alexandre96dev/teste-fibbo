import React from 'react';
import { Todo } from './TodoList';

interface ModalTodoDetailsProps {
    todo: Todo | any;
    closeModal: () => void;
}

export const ModalTodoDetails: React.FC<ModalTodoDetailsProps> = ({ todo, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Detalhes da Tarefa</h2>
                <div className="mb-4">
                    <p className="font-semibold">Data de conclusão da tarefa:</p>
                    <p>{todo.dateConclusion != undefined ? formatDate(todo.dateConclusion) : null}</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};


function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}