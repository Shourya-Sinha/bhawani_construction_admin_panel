// components/Sidebar.js
import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'hero', label: 'Hero Section', icon: '🌟' },
    { id: 'about', label: 'About Us', icon: 'ℹ️' },
    { id: 'services', label: 'Services', icon: '🔧' },
    { id: 'projects', label: 'Projects', icon: '🏢' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <span className="logo-icon">🏗️</span>
          <span>Bhwaani Construction</span>
        </div>
        <small>Admin Panel</small>
      </div>

      <ul className="nav-menu">
        {menuItems.map(item => (
          <li key={item.id} className="nav-item">
            <a
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.id);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;