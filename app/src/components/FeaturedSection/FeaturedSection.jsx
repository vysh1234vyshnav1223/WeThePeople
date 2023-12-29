import { Link } from 'react-router-dom';
import './FeaturedSection.css';

export default function FeaturedSection({ projects }) {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <div className='featured-section'>
            <div className='featured-section-left'>
                <h2 className='featured-section-heading'>Featured Project</h2>
                <Link to={`/project/${projects[0]._id}`} className='featured-project-container'>
                    <img src={`https://wethepeople-project.onrender.com/uploads//${projects[0].images[0]}`} />
                    <h2 className='featured-project-title'>{projects[0].title}</h2>
                    <p className='featured-project-description'>{projects[0].description.substring(0, 240) + '...'}</p>
                    <h3 className='featured-project-backers'>{projects[0].backersCount} Backers</h3>
                    <p className='featured-project-creator'>By {projects[0].creator.name}</p>
                </Link>


            </div>
            <div className='featured-section-right'>
                <h2 className='featured-section-heading'>Recommended For You</h2>
                {projects.slice(1, 5).map(project => (
                    <Link to={`/project/${project._id}`} key={project._id} className='featured-projects'>
                        <div className='featured-projects-image-container'>
                            <img src={`https://wethepeople-project.onrender.com/uploads//${project.images[0]}`} />
                        </div>
                        <div className='featured-projects-details'>
                            <h2>{project.title}</h2>
                            <h3>{project.backersCount} Backers</h3>
                            <p>By {project.creator.name}</p>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    )
}