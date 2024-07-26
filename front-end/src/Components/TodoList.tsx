import { useEffect, useState } from 'react';
import axios from 'axios';
import { ButtonAddTodo } from './ButtonAddTodo';
import { Modal } from './Modal';
import { ModalTodoDetails } from './ModalTodoDetails';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    dateConclusion: string;
}

export const TodoList = () => {
  const [todoList, setTodo] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
    
    

  useEffect(() => {
      const fetchTodo = async () => {
          try {
              const response = await axios.get<Todo[]>('http://localhost:8080/todo');
              setTodo(response.data);
          } catch (error) {
              setError('Failed to fetch Todos. ' + (error as Error).message);
          } finally {
              setLoading(false);
          }
      };

      fetchTodo();
  }, []);

  const handleModalClose = async () => {
      setIsModalOpen(false);
      setSelectedTodo(undefined)
      try {
          const response = await axios.get<Todo[]>('http://localhost:8080/todo');
          setTodo(response.data);
      } catch (error) {
          console.error('Failed to reload todos:', error);
      }
  };

  const handleEdit = (todo: Todo) => {
    
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleViewDetails = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDetailsModalOpen(true);
  };

    
  const handleCompleteTask = async (todo: Todo) => {  
    await axios.get(`http://localhost:8080/todo/${todo.id}/finish`);
    const response = await axios.get<Todo[]>('http://localhost:8080/todo');
    setTodo(response.data);
  };
  
    const closeDetailsModal = () => {
        setSelectedTodo(undefined)
        setIsDetailsModalOpen(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 space-y-4">
            <div className="w-full max-w-4xl flex justify-end mb-4">
                <ButtonAddTodo onClick={() => setIsModalOpen(true)} />
          {isModalOpen && <Modal closeModal={handleModalClose} todo={selectedTodo} />}
                  { !isModalOpen && isDetailsModalOpen && <ModalTodoDetails todo={selectedTodo}  closeModal={closeDetailsModal}/>}
            </div>
            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Finalizada</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {todoList.map(todo => (
                            <tr key={todo.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{todo.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{todo.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{todo.completed ? "Sim" : "Não"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center flex space-x-2">
                                  <button
                                      onClick={() => handleEdit(todo)}
                                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                                  >
                                      Editar
                                  </button>
                                  <button
                                      onClick={() => handleViewDetails(todo)}
                                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
                                  >
                                      Ver Detalhes
                                  </button>
                                  <button
                                      onClick={() => handleCompleteTask(todo)}
                                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                                  >
                                      Finalizar
                                  </button>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
