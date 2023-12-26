import { Link } from 'react-router-dom';
import './ProjectsGrid.css';

export default function ProjectsGrid({ projects, category }) {
    
    return (
        <div className='projects-section'>
            <h2>All Projects in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className='projects-container'>
                {projects.map(project => (
                    <Link to={`/project/${project._id}`} key={project._id} className='project'>
                    <img src={`http://localhost:4000/uploads//${project.images[0]}`} alt='' />
                    <h3>{project.title}</h3>
                    <p> {project.description.substring(0,100)+'...'}</p>
                    <p>By {project.creator.name}</p>
                </Link>
                ))}
            </div>
        </div>
    )
}