import React, { useState, useEffect } from 'react';
import { Shield, User, Settings, ChevronDown, Sun, Moon, Bell, BellOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

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
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  profile,
  isEditingProfile,
  setIsEditingProfile,
  editedProfile,
  setEditedProfile,
  saveProfile,
  cancelEdit,
  onLogout
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: `Switched to ${newTheme} mode`,
      description: `The app is now using ${newTheme} theme.`,
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled',
      description: notificationsEnabled 
        ? 'You will no longer receive push notifications.' 
        : 'You will now receive emergency alerts and updates.',
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowProfileDropdown(false);
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          <h1 className="text-lg sm:text-2xl font-semibold text-foreground hidden xs:block">
            Suraksha Kavach
          </h1>
          <h1 className="text-lg font-semibold text-foreground xs:hidden">
            SK
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Notification Toggle - Mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleNotifications}
            className="sm:hidden p-2"
          >
            {notificationsEnabled ? 
              <Bell className="w-4 h-4 text-primary" /> : 
              <BellOff className="w-4 h-4 text-muted-foreground" />
            }
          </Button>

          {/* Settings Dropdown */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="flex items-center gap-1 sm:gap-2 p-2 sm:px-3 sm:py-2"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />
            </Button>
            
            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                <div className="p-4">
                  <h3 className="font-semibold text-foreground pb-3 border-b border-border">Settings</h3>
                  
                  <div className="space-y-4 mt-4">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {theme === 'dark' ? 
                          <Moon className="w-4 h-4 text-primary" /> : 
                          <Sun className="w-4 h-4 text-primary" />
                        }
                        <div>
                          <p className="text-sm font-medium">Theme</p>
                          <p className="text-xs text-muted-foreground">
                            {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                      />
                    </div>

                    {/* Notifications Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {notificationsEnabled ? 
                          <Bell className="w-4 h-4 text-primary" /> : 
                          <BellOff className="w-4 h-4 text-muted-foreground" />
                        }
                        <div>
                          <p className="text-sm font-medium">Notifications</p>
                          <p className="text-xs text-muted-foreground">
                            Emergency alerts and updates
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationsEnabled}
                        onCheckedChange={toggleNotifications}
                      />
                    </div>

                    {/* Other Settings */}
                    <div className="border-t border-border pt-3 space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm transition-colors">
                        Privacy Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm transition-colors">
                        Data & Storage
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm transition-colors">
                        Language
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border pt-3">
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-destructive/10 text-sm text-destructive transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:px-3 sm:py-2"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-foreground truncate max-w-24 lg:max-w-none">
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-24 lg:max-w-none">
                  {profile.school}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground hidden sm:block" />
            </Button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                <div className="p-4">
                  {!isEditingProfile ? (
                    <div className="space-y-4">
                      <div className="text-center pb-4 border-b border-border">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground break-all">{profile.email}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">School</label>
                          <p className="text-sm text-foreground">{profile.school}</p>
                        </div>
                        
                        <Button
                          onClick={() => setIsEditingProfile(true)}
                          className="w-full"
                          size="sm"
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground pb-2 border-b border-border">Edit Profile</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">Name</label>
                          <input
                            type="text"
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                            className="w-full p-2 border border-input rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">Email</label>
                          <input
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                            className="w-full p-2 border border-input rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide">School</label>
                          <input
                            type="text"
                            value={editedProfile.school}
                            onChange={(e) => setEditedProfile({...editedProfile, school: e.target.value})}
                            className="w-full p-2 border border-input rounded-md text-sm focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                          />
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={saveProfile}
                            className="flex-1"
                            size="sm"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={cancelEdit}
                            variant="outline"
                            className="flex-1"
                            size="sm"
                          >
                            Cancel
                          </Button>
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
