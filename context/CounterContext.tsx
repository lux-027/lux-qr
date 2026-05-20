'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CounterContextType {
  globalCounter: number;
  incrementCounter: () => void;
  refreshCounter: () => Promise<void>;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export function CounterProvider({ children }: { children: ReactNode }) {
  const [globalCounter, setGlobalCounter] = useState(1723);

  const refreshCounter = async () => {
    try {
      const response = await fetch('/api/counter');
      const data = await response.json();
      if (data.success) {
        setGlobalCounter(data.counter);
      }
    } catch (err) {
      console.error('Error fetching global counter:', err);
    }
  };

  const incrementCounter = () => {
    setGlobalCounter(prev => prev + 1);
  };

  useEffect(() => {
    refreshCounter();
  }, []);

  return (
    <CounterContext.Provider value={{ globalCounter, incrementCounter, refreshCounter }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
