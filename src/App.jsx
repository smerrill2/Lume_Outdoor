import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ConsultationPage from './pages/ConsultationPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import ServicePage from './components/ServicePage';
import PhotoManager from './components/PhotoManager';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [projectId, setProjectId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  
  // Only show PhotoManager in development mode
  const isDevelopment = import.meta.env.DEV;
  
  useEffect(() => {
    // Check URL parameters for view
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    
    if (viewParam === 'project-detail') {
      setCurrentView('project-detail');
      
      // Get projectId from sessionStorage
      const storedProjectId = sessionStorage.getItem('currentProjectId');
      if (storedProjectId) {
        setProjectId(storedProjectId);
        // Clear from session storage to prevent persistence
        sessionStorage.removeItem('currentProjectId');
      }
    } else if (viewParam === 'service') {
      setCurrentView('service');
      
      // Get serviceId from URL parameter
      const serviceParam = urlParams.get('id');
      if (serviceParam) {
        setServiceId(serviceParam);
      }
    } else if (viewParam === 'about') {
      setCurrentView('about');
    } else if (viewParam === 'consultation') {
      setCurrentView('consultation');
    }
  }, []);
  
  // Render different views based on current state
  if (currentView === 'project-detail' && projectId) {
    return (
      <>
        <ProjectDetailPage projectId={projectId} />
        {isDevelopment && <PhotoManager />}
      </>
    );
  }
  
  if (currentView === 'service' && serviceId) {
    return (
      <>
        <ServicePage serviceId={serviceId} />
        {isDevelopment && <PhotoManager />}
      </>
    );
  }
  
  if (currentView === 'about') {
    return (
      <>
        <AboutPage />
        {isDevelopment && <PhotoManager />}
      </>
    );
  }
  
  if (currentView === 'consultation') {
    return (
      <>
        <ConsultationPage />
        {isDevelopment && <PhotoManager />}
      </>
    );
  }
  
  return (
    <>
      <HomePage />
      {isDevelopment && <PhotoManager />}
    </>
  );
}

export default App;
