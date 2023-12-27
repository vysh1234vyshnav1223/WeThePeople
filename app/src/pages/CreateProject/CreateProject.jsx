import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import './CreateProject.css';

export default function CreateProject() {
    return (
        <div>
            <Layout>
            <div className='container'>
            <h2 className='projectForm-heading'>Create a Project</h2>
                <ProjectForm />
            </div>
            </Layout>
        </div>
    );
};