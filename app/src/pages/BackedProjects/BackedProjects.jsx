import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import AccountNav from '../../components/AccountNav/AccountNav';
import Layout from '../../components/Layout/Layout';
import './BackedProjects.css';
import { Link } from 'react-router-dom';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BackedProjects() {
  const [loading, setLoading] = useState(false);
  const [backedProjects, setBackedProjects] = useState([]);
  const userAuthContext = useContext(AuthContext);
  const { user } = userAuthContext;
  const userId = user?._id;

  useEffect(() => {
    setLoading(true);
    const fetchBackedProjects = async () => {
      try {
        const response = await axios.get(`/api/users/backed-projects`);
        setBackedProjects(response.data.backedProjects);
        setLoading(false);
      } catch (error) {
        toast.error('Unexpected error occurred. Try again later');
      }
    };

    if (userId) {
      fetchBackedProjects();
    }
  }, [userId]);

  return (
    <div>
      <Layout>
        <AccountNav />
        <div className='backed-projects'>
          {loading ? (
            <LoadingIcon />
          ) : (
            <>
              <h2 className='backed-projects-heading'>Your Backed Projects</h2>
              {backedProjects.length === 0 ? (
                <div className='no-backed-projects-message'>
                  <p>No projects backed yet.</p>
                  <h3>Start supporting projects you love!</h3>
                </div>
              ) : (
                <ul>
                  {backedProjects.map((backedProject) => (
                    <div key={backedProject.project._id}>
                      <Link to={`/project/${backedProject.project._id}`} className='backed-project-container'>
                        <div className='backed-image-container'>
                          <img src={`https://wethepeople-project.onrender.com/uploads/${backedProject.project.images[0]}`} alt='' />
                        </div>
                        <div>
                          <h2 className='backed-project-title'>{backedProject.project.title}</h2>
                          <p className='backed-project-description'>{backedProject.project.description.substring(0, 200) + '...'}</p>
                          <h2 className='backed-project-goal'>Funding Goal: ${backedProject.project.fundingGoal}</h2>
                          <h3>Duration: {backedProject.project.duration} Days</h3>
                          <h3 className='backed-project-amount'>Funded Amount: US$ {backedProject.amount}</h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </ul>
              )}
            </>
          )};

        </div>
      </Layout>
    </div>
  )
};
