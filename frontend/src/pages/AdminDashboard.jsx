import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/admin/tasks');
             // Admin endpoint usually returns all tasks
            setTasks(Array.isArray(data) ? data : data.tasks || []);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user's task?")) {
            try {
                await api.delete(`/admin/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Failed to delete task", error);
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Dashboard</h1>
                 <div>
                     <span style={{ marginRight: '10px' }}>Welcome, {user?.name} (Admin)</span>
                    <button onClick={logout} style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
                {tasks.map(task => (
                    <div key={task._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
                        <div>
                             <small style={{ color: '#888' }}>User ID: {task.user}</small>
                            <h3 style={{ margin: '5px 0', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.title}</h3>
                            <p style={{ margin: 0, color: '#666' }}>{task.description}</p>
                            <span style={{ fontSize: '0.8em', color: task.status === 'completed' ? 'green' : 'orange' }}>{task.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                             <button onClick={() => navigate(`/admin/task/edit/${task._id}`)} style={{ cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(task._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
                 {tasks.length === 0 && <p>No tasks found.</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
