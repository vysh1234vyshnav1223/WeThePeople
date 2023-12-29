import { Link } from 'react-router-dom'
import './TakingoffProjects.css'

export default function TakingoffProjects({ projects }){
    return (
        <div className='taking-off-projects'>
        <h2>Taking Off Projects</h2>
        <div className='taking-off-projects-container'>
            {projects.map(project => (
                <Link to={`/project/${project._id}`} key={project._id} className='taking-off-project'>
                <img src={`https://wethepeople-project.onrender.com/uploads//${project.images[0]}`} alt='' />
                <h3>{project.title}</h3>
                <p>{project.description.substring(0,100)+'...'}</p>
                <p>By {project.creator.name}</p>
            </Link>
            ))}
        </div>
    </div>
    )
}