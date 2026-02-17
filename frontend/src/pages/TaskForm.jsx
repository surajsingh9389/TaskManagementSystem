import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const location = useLocation();

    // Check if we are in "admin" mode based on previous path or user role + context
    const isAdminEdit = user?.role === 'admin' && location.pathname.includes('/admin'); // Simple heuristic or explicit prop needed? 
    // Actually, distinct routes for edit might be better: /task/new, /task/edit/:id, /admin/task/edit/:id
    
    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, [id]);

    const fetchTask = async () => {
        try {
            // Re-use list endpoint or need specific get? 
            // The user routes don't show a specific GET /task/:id in the list I saw earlier?
            // Let's check user.task.routes.js again.
            // It has: router.get("/", auth, getTasks); -> Lists all tasks.
            // It DOES NOT seem to have GET /:id details? 
            // Wait, standard CRUD usually has it. 
            // If missing, I might need to filter from the list or add the endpoint backend side (but I should avoid backend changes if possible).
            // Let's assume I have to fetch list and find item, OR the backend actually has it and I missed it?
            
            // Checking backend routes from memory of "view_file":
            // router.get("/", auth, getTasks);
            // router.put("/:id", auth, updateTask);
            // router.delete("/:id", auth, deleteTask);
            
            // There is NO single task get endpoint in user.task.routes.js!
            // I will have to fetch all and filter client side for now, or just pass data via state?
            // Passing via state is fragile on refresh.
            // Fetching all is inefficient but works for "simple".
            
            const endpoint = user?.role === 'admin' ? '/admin/tasks' : '/user';
            const { data } = await api.get(endpoint);
            const task = data.tasks ? data.tasks.find(t => t._id === id) : data.find(t => t._id === id); // Adjust based on response structure
            
            if (task) {
                setTitle(task.title);
                setDescription(task.description);
                setStatus(task.status);
            }
        } catch (error) {
            console.error("Failed to fetch task", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = { title, description, status };
            if (id) {
                const endpoint = user?.role === 'admin' ? `/admin/tasks/${id}` : `/user/${id}`;
                await api.put(endpoint, taskData);
            } else {
                 await api.post('/user', taskData);
            }
            navigate(-1); // Go back
        } catch (error) {
            console.error("Failed to save task", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: '8px' }}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ padding: '8px', minHeight: '100px' }}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '8px' }}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Save</button>
            </form>
        </div>
    );
};

export default TaskForm;
