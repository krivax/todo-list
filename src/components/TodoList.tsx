'use client'
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Task {
    text: string;
    date?: string;
    value?: number;
}

export default function TodoList() {
    const [taskText, setTaskText] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskValue, setTaskValue] = useState<number | undefined>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');
    const [editingDate, setEditingDate] = useState('');
    const [editingValue, setEditingValue] = useState<number | undefined>();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Carrega as tarefas do localStorage quando o componente é montado
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Salva as tarefas no localStorage sempre que houver mudanças
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!taskText.trim()) {
            setAlertMessage('O texto da tarefa não pode estar vazio!');
            setShowAlert(true);
            return;
        }
        if (!taskDate) {
            setAlertMessage('Por favor, selecione uma data para a tarefa!');
            setShowAlert(true);
            return;
        }

        const newTask: Task = {
            text: taskText,
            date: taskDate,
            value: taskValue
        };
        setTasks([...tasks, newTask]);
        setTaskText('');
        setTaskDate('');
        setTaskValue(undefined);
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const startEditing = (index: number, task: Task) => {
        setEditingIndex(index);
        setEditingText(task.text);
        setEditingDate(task.date || '');
        setEditingValue(task.value);
    };

    const saveEdit = () => {
        if (editingIndex !== null && editingText.trim()) {
            const newTasks = [...tasks];
            newTasks[editingIndex] = {
                text: editingText,
                date: editingDate || undefined,
                value: editingValue
            };
            setTasks(newTasks);
            setEditingIndex(null);
            setEditingText('');
            setEditingDate('');
            setEditingValue(undefined);
        }
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditingText('');
        setEditingDate('');
        setEditingValue(undefined);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
            {showAlert && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border border-red-500 z-50">
                    <p className="text-red-500">{alertMessage}</p>
                    <button
                        onClick={() => setShowAlert(false)}
                        className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Fechar
                    </button>
                </div>
            )}
            <h1 className="text-blue-500 text-2xl font-bold mb-4 text-center">Lista de Tarefas</h1>
            <div className="flex mb-4 gap-2">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="w-64 text-blue-500 px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Adicione uma tarefa"
                />
                <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className=" px-3 text-blue-500 py-2 border focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                    type="number"
                    placeholder="R$"
                    step="0.01"
                    min="0"
                    value={taskValue || ''}
                    onChange={(e) => setTaskValue(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-32 text-blue-500 px-3 py-2 border focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={addTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusCircle size={18} />
                    Adicionar
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="text-blue-800 flex justify-between items-center p-2 bg-gray-100 rounded-md"
                    >
                        {editingIndex === index ? (
                            <div className="flex gap-2 flex-1">
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="date"
                                    value={editingDate}
                                    onChange={(e) => setEditingDate(e.target.value)}
                                    className="px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="number"
                                    placeholder="R$"
                                    step="0.01"
                                    min="0"
                                    value={editingValue || ''}
                                    onChange={(e) => setEditingValue(e.target.value ? Number(e.target.value) : undefined)}
                                    className="w-32 px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <button
                                    onClick={saveEdit}
                                    className="text-green-500 hover:text-green-700"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Cancelar
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold">{task.text}</span>
                                    <div className="text-xs text-gray-500">
                                        <span className="mr-4">Data: {task.date ? new Date(task.date).toLocaleDateString('pt-BR') : 'Não definida'}</span>
                                        {task.value && <span>Valor: R$ {task.value.toFixed(2)}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => startEditing(index, task)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => removeTask(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}