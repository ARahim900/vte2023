import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  BarChart3, 
  Home, 
  Users, 
  Settings, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  BarChart2,
  Baby,
  Database
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  emoji: string;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Overview & Metrics',
    href: '/',
    icon: TrendingUp,
    emoji: '📊',
  },
  {
    name: 'Risk Factors',
    href: '/risk-factors',
    icon: AlertTriangle,
    emoji: '⚠️',
  },
  {
    name: 'Risk Analytics',
    href: '/risk-analytics',
    icon: BarChart2,
    emoji: '📈',
  },
  {
    name: 'R.F. Age',
    href: '/rf-age',
    icon: Baby,
    emoji: '👶',
  },
  {
    name: 'Insights & Analysis',
    href: '/insights',
    icon: Lightbulb,
    emoji: '💡',
  },
  {
    name: 'Database',
    href: '/database',
    icon: Database,
    emoji: '🗃️',
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: Users,
    emoji: '👥',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    emoji: '⚙️',
  },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-600">VTE 2023 KONE</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    <span className="mr-2">{item.emoji}</span>
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.emoji}</span>
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
