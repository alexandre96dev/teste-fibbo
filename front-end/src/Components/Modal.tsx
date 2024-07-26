import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from './TodoList';

interface ModalProps {
    closeModal: () => void;
    todo?: Todo;
}

export const Modal: React.FC<ModalProps> = ({ closeModal, todo }) => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState<boolean | null>(null);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setCompleted(todo.completed);
        }
    }, [todo]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const todoData = {
            title,
            completed
        };

        try {
            if (!todo?.id) {
                await axios.post('http://localhost:8080/todo', todoData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
            else {
                await axios.patch(`http://localhost:8080/todo/${todo.id}`, todoData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }

            closeModal();
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">{ todo?.id == undefined ? "Adicionar Tarefa" : "Editar Tarefa"}</h2>
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white"
                                id="title"
                                type="text"
                                placeholder="Title example"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="completed">
                                Foi completada ?
                            </label>
                            <div className="flex items-center">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="completed"
                                        value="true"
                                        className="form-radio text-blue-600"
                                        checked={completed === true}
                                        onChange={() => setCompleted(true)}
                                    />
                                    <span className="ml-2">Sim</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="completed"
                                        value="false"
                                        className="form-radio text-blue-600"
                                        checked={completed === false}
                                        onChange={() => setCompleted(false)}
                                    />
                                    <span className="ml-2">Não</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            { todo?.id == undefined ? "Adicionar" : "Editar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
