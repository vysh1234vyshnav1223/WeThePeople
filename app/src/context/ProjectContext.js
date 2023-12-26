import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProjectContext = createContext({
  project: {},
});

const ProjectProvider = ({ children, id }) => {
  const [project, setProject] = useState({});


  useEffect(() => {
    if (!id) {
      return;
    }


    axios.get('/api/projects/' + id)
      .then((response) => {
        const { data } = response;
        setProject(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <ProjectContext.Provider value={{ project }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
