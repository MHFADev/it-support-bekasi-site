import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Shield,
  Bell,
  Wifi
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { toast } from 'react-hot-toast';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { admin, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Berhasil keluar');
    navigate('/admin/login');
  };

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Produk' },
    { path: '/admin/settings', icon: Settings, label: 'Pengaturan Web' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:relative inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:translate-x-0 bg-card border-r border-border flex flex-col",
        isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border flex-shrink-0">
          {(isSidebarOpen || window.innerWidth < 1024) && (
            <div className="flex items-center space-x-2">
              <Shield className="text-primary" size={24} />
              <span className="font-bold text-xl text-primary">Admin</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-accent rounded-lg transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-xl transition-colors",
                isActiveRoute(item.path)
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'hover:bg-accent text-muted-foreground hover:text-primary'
              )}
            >
              <item.icon size={20} />
              {(isSidebarOpen || window.innerWidth < 1024) && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Admin Profile & Logout */}
        <div className="p-4 border-t border-border space-y-3 flex-shrink-0">
          {(isSidebarOpen || window.innerWidth < 1024) && admin && (
            <div className="flex items-center space-x-3 p-3 bg-accent rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {admin.displayName?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {admin.displayName}
                </p>
                <p className="text-xs text-muted-foreground truncate">@{admin.username}</p>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={20} />
            {(isSidebarOpen || window.innerWidth < 1024) && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-accent rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm sm:text-lg font-semibold text-foreground truncate">
              Halo, {admin?.displayName || 'Admin'}
            </h2>
            <span className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded-full">
              <Wifi size={10} />
              <span>Online</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
          </div>
        </header>
        <div className="p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
