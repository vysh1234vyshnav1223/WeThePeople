import './UserProjects.css';
import Layout from '../../components/Layout/Layout';
import AccountNav from '../../components/AccountNav/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import ProjectUpdates from '../../components/CreateProjectUpdates/CreateProjectUpdates';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

export default function UserProjects() {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [openProjectUpdateId, setOpenProjectUpdateId] = useState(null);


    useEffect(() => {
        setLoading(true);
        axios.get('/api/users/projects').then(({ data }) => {
            setProjects(data);
            setLoading(false);
        })
    }, []);

    const handleOpenProjectUpdate = (projectId) => {
        setOpenProjectUpdateId(projectId);
    }


    return (
        <div>
            <Layout>
                <AccountNav />
                <div className='new-project-heading'>
                    <Link className='new-project-link' to={'/project/new'}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        Add New Project
                    </Link>
                </div>
                <div className='project-list'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            {projects.length > 0 ? (projects.map(project => (
                                <div key={project._id}>
                                    <Link to={'/project/' + project._id} className='project-container'>
                                        <div className='image-container'>
                                            <img src={'http://localhost:4000/uploads/' + project.images[0]} alt='' />
                                        </div>
                                        <div className='project-details-section'>
                                            <h2 className='project-title'>{project.title}</h2>
                                            <p className='project-description'>{project.description.substring(0, 200) + '...'}</p>
                                            <h2 className='project-goal'>Funding Goal: ${project.fundingGoal}</h2>
                                            <h3>Duration: {project.duration} Days</h3>
                                            <div className='project-options'>
                                                <Link to={'/project/edit/' + project._id} className='project-options-btn'>Edit Project</Link>
                                                <button
                                                    type='button'
                                                    className='project-options-btn'
                                                    onClick={(ev) => {
                                                        ev.preventDefault();
                                                        handleOpenProjectUpdate(project._id);
                                                    }}
                                                >
                                                    Add Project Updates
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                    {openProjectUpdateId === project._id && (
                                        <ProjectUpdates projectData={project} handleCloseProjectUpdate={() => setOpenProjectUpdateId(null)} />
                                    )}
                                </div>
                            ))) : (
                                <div className='no-projects-message'>
                                    <p>No projects created yet.</p>
                                    <h3>Create something awesome!</h3>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Layout>
        </div>
    );
}