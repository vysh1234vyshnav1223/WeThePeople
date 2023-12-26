import './CompletionProjects.css';
import { Link } from 'react-router-dom';

export default function CompletionProjects({ projects }) {
    return (
        <div className='completion-projects'>
            <h2>Close to Funding Goals</h2>
            <div className='completion-projects-container'>
                {projects.map(project => (
                    <Link to={`/project/${project._id}`} key={project._id} className='taking-off-project'>
                        <img src={`http://localhost:4000/uploads//${project.images[0]}`} alt='' />
                        <h3>{project.title}</h3>
                        <p>{project.description.substring(0, 100) + '...'}</p>
                        <p>By {project.creator.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}