import React from 'react';
import { FoodProvider, useFoodContext } from '@/contexts/FoodContext';
import MainScreen from './MainScreen';
import PostScreen from './PostScreen';
import DetailScreen from './DetailScreen';

const AppContent: React.FC = () => {
  const { currentScreen } = useFoodContext();

  switch (currentScreen) {
    case 'post':
      return <PostScreen />;
    case 'detail':
      return <DetailScreen />;
    default:
      return <MainScreen />;
  }
};

const AppLayout: React.FC = () => {
  return (
    <FoodProvider>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <AppContent />
      </div>
    </FoodProvider>
  );
};

export default AppLayout;
