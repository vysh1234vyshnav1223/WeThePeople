import './App.css';
import HomePage from './pages/HomePage/HomePage.jsx';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage.jsx';
import CreateProject from './pages/CreateProject/CreateProject.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import UserProjects from './pages/UserProjects/UserProjects.jsx';
import EditProject from './pages/EditProject/EditProject.jsx';
import ProjectPage from './pages/ProjectPage/ProjectPage.jsx';
import PledgeProject from './pages/PledgeProject/PledgeProject.jsx';
import BackedProjects from './pages/BackedProjects/BackedProjects.jsx';
import CategoryPage from './pages/CategoryPage/CategoryPage.jsx';
import ProtectedRoute from './ProtectedRoute.js';
import { AuthContextProvider } from './context/AuthContext.js';

axios.defaults.baseURL = 'http://35.154.82.244:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/project/:id' element={<ProjectPage />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/project/new' element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path='/projects' element={<ProtectedRoute><UserProjects /></ProtectedRoute>} />
        <Route path='/backed-projects' element={<ProtectedRoute><BackedProjects /></ProtectedRoute>} />
        <Route path='/project/edit/:id' element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
        <Route path='/project/pledge/:id' element={<ProtectedRoute><PledgeProject /></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
