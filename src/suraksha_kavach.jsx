import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ModulesPage from './components/ModulesPage';
import AIChat from './components/AIChat';
import EvacuationMap from './components/EvacuationMap';
import SOSPage from './components/SOSPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

const SurakshaKavach = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState('login'); // 'login', 'register', 'forgot-password'
  const [currentPage, setCurrentPage] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Arjun Sharma',
    email: 'arjun.sharma@school.edu',
    school: 'Delhi Public School'
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const saveProfile = () => {
    setProfile(editedProfile);
    setIsEditingProfile(false);
  };

  const cancelEdit = () => {
    setEditedProfile(profile);
    setIsEditingProfile(false);
  };

  const handleLogin = (credentials) => {
    // Simulate login - in real app, this would validate with backend
    setProfile({
      name: 'Arjun Sharma',
      email: credentials.email,
      school: 'Delhi Public School'
    });
    setIsAuthenticated(true);
  };

  const handleRegister = (userData) => {
    // Simulate registration - in real app, this would create account in backend
    setProfile({
      name: userData.name,
      email: userData.email,
      school: userData.school
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': 
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'dashboard': 
        return <Dashboard />;
      case 'modules': 
        return <ModulesPage />;
      case 'ai-chat': 
        return <AIChat />;
      case 'evacuation-map': 
        return <EvacuationMap />;
      case 'sos': 
        return <SOSPage />;
      default: 
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // Show authentication pages if not logged in
  if (!isAuthenticated) {
    switch (authPage) {
      case 'register':
        return <RegisterPage onRegister={handleRegister} onGoToLogin={() => setAuthPage('login')} />;
      case 'forgot-password':
        return <ForgotPasswordPage onGoToLogin={() => setAuthPage('login')} />;
      default:
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onGoToRegister={() => setAuthPage('register')}
            onGoToForgotPassword={() => setAuthPage('forgot-password')}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        profile={profile}
        isEditingProfile={isEditingProfile}
        setIsEditingProfile={setIsEditingProfile}
        editedProfile={editedProfile}
        setEditedProfile={setEditedProfile}
        saveProfile={saveProfile}
        cancelEdit={cancelEdit}
        onLogout={handleLogout}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="flex-1 overflow-y-auto p-8">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default SurakshaKavach;