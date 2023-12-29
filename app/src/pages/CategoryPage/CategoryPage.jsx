import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection';
import ProjectsGrid from '../../components/ProjectsGrid/ProjectsGrid';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

function CategoryPage() {
    const { category } = useParams();
    const [loading, setLoading] = useState(true);
    const [categoryProjects, setCategoryProjects] = useState([]);
    const [featuredCategoryProjects, setFeaturedCategoryProjects] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCategoryProjects = async () => {
            try {
                const response = await axios.get(`/api/projects/category/${category}`);
                setCategoryProjects(response.data.categoryProjects);
                const sortedFeaturedProjects = [...response.data.categoryProjects].sort((a, b) => b.backersCount - a.backersCount);
                setFeaturedCategoryProjects(sortedFeaturedProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category projects:', error.message);
            }
        }

        fetchCategoryProjects();
    }, [category]);

    return (
        <div>
            <Layout>
                <div className='category-container'>
                    {loading ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            <div className='category-heading'>
                                <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                <p>Dive into the world of {category} projects — where creativity knows
                                    no bounds and innovation takes center stage.
                                </p>
                            </div>
                            <FeaturedSection projects={featuredCategoryProjects} />
                            <ProjectsGrid projects={categoryProjects} category={category} />
                        </>
                    )}

                </div>
            </Layout>
        </div>
    )
}

export default CategoryPage;
