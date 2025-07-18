import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigationItems = [
  { name: 'Overview & Metrics', href: '/', emoji: '📊' },
  { name: 'Risk Factors', href: '/risk-factors', emoji: '⚠️' },
  { name: 'Risk Analytics', href: '/risk-analytics', emoji: '📈' },
  { name: 'R.F. Age', href: '/rf-age', emoji: '📊' },
  { name: 'Insights & Analysis', href: '/insights', emoji: '💡' },
  { name: 'Database', href: '/database', emoji: '🗃️' },
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-emerald-600">VTE 2023 KONE</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {navigationItems.map((item) => {
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
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Page Content */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;