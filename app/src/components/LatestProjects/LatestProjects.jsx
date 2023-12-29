import { Link } from 'react-router-dom';
import './LatestProjects.css';

export default function LatestProjects({ projects }) {

    return (
        <div className='latest-projects-section'>
            <h2>Latest Projects</h2>
            <div className='latest-projects-container'>
                {projects.map(project => (
                    <Link to={`/project/${project._id}`} key={project._id} className='latest-project'>
                    <img src={`https://wethepeople-project.onrender.com/uploads//${project.images[0]}`} alt='' />
                    <h3>{project.title}</h3>
                    <p> {project.description.substring(0,100)+'...'}</p>
                    <p>By {project.creator.name}</p>
                </Link>
                ))}
            </div>
        </div>
    )
}