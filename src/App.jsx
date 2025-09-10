import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ClientsSection from './components/ClientsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem('activeSection') || 'hero'
  );
  
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

    useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const renderSection = () => {
    switch(activeSection) {
      case 'hero':
        return <HeroSection showNotification={showNotification} />;
      case 'about':
        return <AboutSection showNotification={showNotification} />;
      case 'services':
        return <ServicesSection showNotification={showNotification} />;
      case 'projects':
        return <ProjectsSection showNotification={showNotification} />;
      case 'clients':
        return <ClientsSection showNotification={showNotification} />;
      case 'contact':
        return <ContactSection showNotification={showNotification} />;
      default:
        return <HeroSection showNotification={showNotification} />;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">
            {activeSection === 'hero' && 'Hero Section'}
            {activeSection === 'about' && 'About Us Section'}
            {activeSection === 'services' && 'Services Section'}
            {activeSection === 'projects' && 'Projects Section'}
            {activeSection === 'clients' && 'Clients Section'}
            {activeSection === 'contact' && 'Contact Section'}
          </h1>
          <div className="notification-bell">
            🔔
            <span className="notification-badge">3</span>
          </div>
        </div>

        {notification.show && (
          <div className={`toast-notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {renderSection()}
      </div>
    </div>
  );
}

export default App;
