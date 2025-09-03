import React, { useState } from 'react';
import { Shield, User, Settings, ChevronDown } from 'lucide-react';

interface HeaderProps {
  profile: {
    name: string;
    email: string;
    school: string;
  };
  isEditingProfile: boolean;
  setIsEditingProfile: (editing: boolean) => void;
  editedProfile: {
    name: string;
    email: string;
    school: string;
  };
  setEditedProfile: (profile: any) => void;
  saveProfile: () => void;
  cancelEdit: () => void;
}

const Header: React.FC<HeaderProps> = ({
  profile,
  isEditingProfile,
  setIsEditingProfile,
  editedProfile,
  setEditedProfile,
  saveProfile,
  cancelEdit
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <header className="bg-card border-b border-subtle-border px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Suraksha Kavach</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-subtle-hover transition-colors"
            >
              <Settings className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-subtle-border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-subtle-hover text-sm">
                    Notification Preferences
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-subtle-hover text-sm">
                    Change Theme
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md hover:bg-subtle-hover text-sm">
                    Privacy Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle-hover transition-colors"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.school}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-subtle-border rounded-lg shadow-lg z-50">
                <div className="p-4">
                  {!isEditingProfile ? (
                    <div className="space-y-4">
                      <div className="text-center pb-4 border-b border-subtle-border">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">School</label>
                          <p className="text-sm text-foreground">{profile.school}</p>
                        </div>
                        
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm hover:bg-primary/90 transition-colors"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground pb-2 border-b border-subtle-border">Edit Profile</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">Name</label>
                          <input
                            type="text"
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                            className="w-full p-2 border border-input rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">Email</label>
                          <input
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                            className="w-full p-2 border border-input rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">School</label>
                          <input
                            type="text"
                            value={editedProfile.school}
                            onChange={(e) => setEditedProfile({...editedProfile, school: e.target.value})}
                            className="w-full p-2 border border-input rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                          />
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={saveProfile}
                            className="flex-1 bg-success text-success-foreground py-2 px-4 rounded-md text-sm hover:bg-success/90 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-md text-sm hover:bg-muted/80 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;