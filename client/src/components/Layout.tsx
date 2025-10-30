import React from 'react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg no-print border-b-4 border-primary-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/pixtolearn-logo.png"
                alt="PixToLearn Logo"
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <div className="text-right">
              <p className="text-sm md:text-base text-gray-700 font-semibold">
                {t('swimmingInstructionManual')}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white mt-16 no-print">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">PixToLearn Ltd</h3>
              <p className="text-sm text-gray-300">
                Visual learning system for structured aquatic instruction
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-sm text-gray-300">
                Email: hello@pixtolearn.com<br />
                Web: www.pixtolearn.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Safety</h3>
              <p className="text-sm text-gray-300">
                Always use under adult supervision<br />
                Age 3+ years
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} PixToLearn Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
