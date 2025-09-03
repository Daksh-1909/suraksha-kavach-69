import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageCircle, 
  Map, 
  AlertTriangle, 
  Home
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Learning Modules', icon: BookOpen },
    { id: 'ai-chat', label: 'AI Assistant', icon: MessageCircle },
    { id: 'evacuation-map', label: 'Evacuation Map', icon: Map },
    { id: 'sos', label: 'Emergency SOS', icon: AlertTriangle },
  ];

  return (
    <nav className="w-64 bg-card border-r border-subtle-border h-full">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-subtle-hover'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;