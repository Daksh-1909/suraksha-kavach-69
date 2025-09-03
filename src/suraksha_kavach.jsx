import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ModulesPage from './components/ModulesPage';
import AIChat from './components/AIChat';
import EvacuationMap from './components/EvacuationMap';
import SOSPage from './components/SOSPage';

const SurakshaKavach = () => {
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