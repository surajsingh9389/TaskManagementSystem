import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/user');
            // Adjust depending on whether backend returns array directly or object
             // Controller `getTasks` usually returns `res.status(200).json(tasks)` or `{ success: true, tasks }`
            setTasks(Array.isArray(data) ? data : data.tasks || []);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await api.delete(`/user/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Failed to delete task", error);
            }
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            await api.put(`/user/${task._id}`, { ...task, status: task.status === 'pending' ? 'completed' : 'pending' });
            fetchTasks();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>User Dashboard</h1>
                <div>
                     <span style={{ marginRight: '10px' }}>Welcome, {user?.name}</span>
                    <button onClick={logout} style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>
            
            <button onClick={() => navigate('/task/new')} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>+ Add Task</button>

            <div style={{ display: 'grid', gap: '10px' }}>
                {tasks.map(task => (
                    <div key={task._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: task.status === 'completed' ? '#f0f0f0' : 'white' }}>
                        <div>
                            <h3 style={{ margin: '0 0 5px 0', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.title}</h3>
                            <p style={{ margin: 0, color: '#666' }}>{task.description}</p>
                            <span style={{ fontSize: '0.8em', color: task.status === 'completed' ? 'green' : 'orange' }}>{task.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                             <button onClick={() => handleToggleStatus(task)} style={{ cursor: 'pointer' }}>{task.status === 'pending' ? 'Complete' : 'Reopen'}</button>
                            <button onClick={() => navigate(`/task/edit/${task._id}`)} style={{ cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(task._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && <p>No tasks found.</p>}
            </div>
        </div>
    );
};

export default UserDashboard;
