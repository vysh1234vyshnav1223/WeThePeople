import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import { ProjectProvider } from '../../context/ProjectContext';



export default function EditProject() {
    const { id } = useParams();
    return (
        <ProjectProvider id={id}>
            <div>
                <Layout>
                    <h2 className='projectForm-heading'>Update a Project</h2>
                    <ProjectForm />
                </Layout>
            </div>
        </ProjectProvider>
    )

}