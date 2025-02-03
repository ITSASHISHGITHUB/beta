import React, { useState, useEffect } from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Landing from "../pages/landing";  // Ensure this path is correct for your project

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'Plan',
    title: 'Plan Your Trip with AI',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Budget Trip',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Previous Trips',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Fuel',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Route You Took',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Active Trip',
    icon: <LayersIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Upgrade To Pro',
  },
  {
    segment: 'orders',
    title: '39 INR',
    icon: <CurrencyRupeeIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: { main: '#FF5722' },  // Example color
    secondary: { main: '#2196F3' },  // Example color
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function CustomUserProfileButton() {
  const [location, setLocation] = useState('Pune');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Optionally, use a geocoding service to get a more readable location
        setLocation(`Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`);
      }, (error) => {
        console.error('Error getting location:', error);
        setLocation('Location not available');
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      setLocation('Location not supported');
    }
  }, []);

  return (
    <button className="bg-gray-100 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors flex items-center gap-2 fixed top-2 right-20 md:right-10 sm:right-5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-white rounded border border-gray-200 text-sm sm:text-base md:text-lg">
          Ashish Yadav
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs sm:text-sm md:text-base">{location}</span>
        </div>
      </div>
    </button>
  );
  
}

export default function DashboardLayoutWithCustomUserProfile(props) {
  const { window } = props;

  const router = useDemoRouter('/');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Ashish Beta',
        homeUrl: '/toolpad/core/introduction',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: CustomUserProfileButton,
        }}
      >
        <PageContainer>
          <Landing />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
