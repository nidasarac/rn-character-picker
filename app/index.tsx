import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from '../src/screens/HomeScreen';

const queryClient = new QueryClient();

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
};

export default Index;
