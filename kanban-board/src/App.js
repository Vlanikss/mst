import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Board from './components/board/board';
import TaskPage from './pages/taskPage';
import './App.css';

const LOCAL_STORAGE_KEY = "kanbanData";

const App = () => {

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        console.log(savedData); 
        try {
            return savedData ? JSON.parse(savedData) : [
                { title: 'Backlog', tasks: [] },
                { title: 'Ready', tasks: [] },
                { title: 'In Progress', tasks: [] },
                { title: 'Finished', tasks: [] },
            ];
        } catch (error) {
            console.error("Не удалось загрузить данные из localStorage:", error);
            return [
                { title: 'Backlog', tasks: [] },
                { title: 'Ready', tasks: [] },
                { title: 'In Progress', tasks: [] },
                { title: 'Finished', tasks: [] },
            ];
        }
    });

   
    useEffect(() => {
        console.log('Сохраняем данные в localStorage:', data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }, [data]); 

   
    const updateTask = (taskId, newDescription) => {
        setData(prevData =>
            prevData.map(column => ({
                ...column,
                tasks: column.tasks.map(task =>
                    String(task.id) === String(taskId) ? { ...task, description: newDescription } : task
                ),
            }))
        );
    };

   
    const addTask = (columnIndex, task) => {
        setData(prevData => {
            const updatedColumns = [...prevData];
            updatedColumns[columnIndex].tasks.push(task);
            return updatedColumns;
        });
    };

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Board columns={data} setColumns={setData} addTask={addTask} />} />
                    <Route path="/tasks/:taskId" element={<TaskPage tasks={data.flatMap(col => col.tasks)} onUpdateTask={updateTask} />} />
                </Routes>
            </main>
            <Footer
                activeTasksCount={data[0].tasks.length}
                finishedTasksCount={data[3].tasks.length}
            />
        </Router>
    );
};

export default App;
