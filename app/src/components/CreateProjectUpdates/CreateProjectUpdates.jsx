import { useState } from 'react';
import axios from 'axios';
import './CreateProjectUpdates.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProjectUpdates({ projectData, handleCloseProjectUpdate }) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleProjectUpdate = async () => {
        try {
            const response = await axios.put('/api/projects/add-update/' + projectData._id, {
                title: title,
                message: message,
            });
            if (response.status !== 200) {
                toast.error('Adding Updates failed. Try again later.')
            } else {
                toast.success('Update has been added Successfull');
                setTitle('');
                setMessage('');
            }
        } catch (error) {
            toast.error(error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.error);
        }
    }


    return (
        <div>
            <div className='project-updates-popup'>
                <div className='project-updates-content'>
                    <span className='close' onClick={handleCloseProjectUpdate}>&times;</span>

                    <h2>Add Project Update</h2>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                        required
                    />

                    <label htmlFor='message'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols='10'
                        rows='7'
                        value={message}
                        onChange={(ev) => setMessage(ev.target.value)}
                        required
                    />

                    <button onClick={handleProjectUpdate}>Submit</button>

                </div>
            </div>
        </div>
    )
}