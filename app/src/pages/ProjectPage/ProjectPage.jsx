import './ProjectPage.css';
import Layout from '../../components/Layout/Layout';
import ProjectDescription from '../../components/ProjectDescription/ProjectDescription';
import ProjectRewards from '../../components/ProjectRewards/ProjectRewards';
import ProjectUpdates from '../../components/ProjectUpdates/ProjectUpdates';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

export default function ProjectPage({ }) {
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('description');
    const [projectDetails, setProjectDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchProjectDetails = async (id) => {
        const response = await axios.get(`/api/projects/${id}`);
        const data = await response.data;
        return data;
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProjectData = async () => {
            try {
                const data = await fetchProjectDetails(id);
                setProjectDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching details: ', error);
            }
        }
        fetchProjectData();
    }, [id])


    const renderSelectedComponents = () => {
        switch (selectedOption) {
            case 'description':
                return <ProjectDescription description={projectDetails.description} name={projectDetails.creator.name} bio={projectDetails.creator.bio} />;
            case 'rewards':
                return <ProjectRewards projectDetails={projectDetails} />;
            case 'updates':
                return <ProjectUpdates updates={projectDetails.updates} />;
            default:
                return null;
        }
    }

    const handlePledgeButtonClick = () => {
        navigate('/project/pledge/' + id, { state: { projectDetails: projectDetails } })
    }

    const calculateRemainingDays = () => {
        const currentDate = new Date();
        const startDate = new Date(projectDetails.createdAt);
        const durationInDays = projectDetails.duration;

        const endDate = new Date(startDate.getTime() + durationInDays * 24 * 60 * 60 * 1000);

        const remainingDays = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));

        if (remainingDays < 0) {
            return { days: 0, message: 'Project inactive' };
        }

        return { days: remainingDays, message: 'days to go' };
    };


    return (
        <div>
            <Layout>
                <div className='project-details-container'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            <div className='project-intro-details'>
                                <h1>{projectDetails.title}</h1>
                                <p>By {projectDetails.creator.name}</p>
                            </div>
                            <div className='project-details'>
                                <div className='project-details-left'>
                                    <Carousel>
                                        {projectDetails.images.map((imageUrl, index) => (
                                            <div key={index} className='project-details-image'>
                                                <img src={'http://localhost:4000/uploads/' + imageUrl} alt={`Project image ${index + 1}`} />
                                            </div>
                                        ))}
                                    </Carousel>
                                    <div className='project-details-category'>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                                            <path stroke-linecap='round' stroke-linejoin='round' d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' />
                                            <path stroke-linecap='round' stroke-linejoin='round' d='M6 6h.008v.008H6V6z' />
                                        </svg>

                                        <h4>Category: {projectDetails.category}</h4>
                                    </div>
                                </div>
                                <div className='project-details-right'>
                                    <div className='project-funding-details'>
                                        <progress id='completionPercentage' value={projectDetails.completionPercentage} max={100} />
                                        <h2>US$ {projectDetails.currentFunding}</h2>
                                        <p>pledged of US$ {projectDetails.fundingGoal} goal</p>
                                    </div>
                                    <div className='project-more-details'>
                                        <div className='project-backer-details'>
                                            <h2>{projectDetails.backersCount}</h2>
                                            <p>backers</p>
                                        </div>
                                        <div className='project-duration-details'>
                                            <h2>{calculateRemainingDays().days}</h2>
                                            <p>{calculateRemainingDays().message}</p>
                                        </div>
                                    </div>
                                    <button className='back-project-button' onClick={handlePledgeButtonClick}>Back this project</button>
                                </div>
                            </div>
                            <div className='project-options-row'>
                                <button className={selectedOption === 'description' ? 'active-button' : ''} onClick={() => setSelectedOption('description')}>Description</button>
                                <button className={selectedOption === 'rewards' ? 'active-button' : ''} onClick={() => setSelectedOption('rewards')}>Rewards</button>
                                <button className={selectedOption === 'updates' ? 'active-button' : ''} onClick={() => setSelectedOption('updates')}>Updates</button>
                            </div>
                            {renderSelectedComponents()}
                        </>
                    )}

                </div>
            </Layout>
        </div>
    )
}