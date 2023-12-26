import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProjectStart, fetchProjectSuccess, fetchProjectFailure } from '../../features/projectDetails/actions';

const ProjectProvider = ({ id, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProjectStart());
      try {
        const response = await axios.get(`/project/${id}`);
        const project = response.data;
        dispatch(fetchProjectSuccess(project));
      } catch (error) {
        dispatch(fetchProjectFailure(error.message));
      }
    };

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  return <>{children}</>;
};

export default ProjectProvider;
