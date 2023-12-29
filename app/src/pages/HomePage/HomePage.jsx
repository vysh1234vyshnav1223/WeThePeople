import { useEffect, useState } from 'react';
import CompletionProjects from '../../components/CompletionProjects/CompletionProjects';
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection';
import LatestProjects from '../../components/LatestProjects/LatestProjects';
import Layout from '../../components/Layout/Layout';
import TakingoffProjects from '../../components/TakingoffProjects/TakingoffProjects';
import './HomePage.css';
import axios from 'axios';
import CategoryList from '../../components/CategoryList/CategoryList';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [latestProjects, setLatestProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    const [takingOffProjects, setTakingOffProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/projects/');
                const allProjects = response.data.allProjects;

                const sortedFeaturedProjects = [...allProjects].sort((a, b) => b.backersCount - a.backersCount);
                const sortedLatestProjects = [...allProjects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                const filteredCompletedProjects = allProjects.filter(project => project.completionPercentage >= 90);
                const filteredTakingOffProjects = allProjects.filter(project => project.completionPercentage >= 50 && project.completionPercentage < 90);

                setFeaturedProjects(sortedFeaturedProjects);
                setLatestProjects(sortedLatestProjects.slice(0, 4));
                setCompletedProjects(filteredCompletedProjects.slice(0, 4));
                setTakingOffProjects(filteredTakingOffProjects.slice(0, 4));
                setLoading(false);

            } catch (error) {
                toast.error('Unexpected error occurred. Try again later');
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <Layout>
                <div className='homepage-container'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            <div className='homepage-heading'>
                                <h1>Let's bring your creative ideas into life with <span>WeThePeople</span></h1>
                                <p>Create, and fund projects that you love seamlessly without any hassle</p>
                            </div>
                            <FeaturedSection projects={featuredProjects} />
                            <LatestProjects projects={latestProjects} />
                            <CompletionProjects projects={completedProjects} />
                            <TakingoffProjects projects={takingOffProjects} />

                            <CategoryList />
                        </>
                    )};

                </div>
            </Layout>
        </div>
    )
}