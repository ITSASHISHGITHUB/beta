import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TravelExploreIcon from '@mui/icons-material/TravelExplore'; // New icon for "Travel Suite"
import { useRouter } from 'next/router';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('padding', { // Changed transition target to padding
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: open ? 10 : 80, 
    backgroundColor: '#fff',
    boxSizing: 'border-box', // Ensure padding is included in width calculation
  })
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: '#000', // Black background for drawer header
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Subtle white border
}));

export default function PersistentDrawer({ children }) {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const menuItems = [
    { text: 'Trip Ai', path: '/home', icon: <HomeIcon /> },
    { text: 'Trip Tracker', path: '/expensetracker', icon: <TrendingUpIcon /> },
    { text: 'Budget Trip', path: '/buget', icon: <AttachMoneyIcon /> },
    { text: 'Upgrade To Pro', path: '/prosub', icon: <StarIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: open ? drawerWidth : 10,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 80,
            boxSizing: 'border-box',
            backgroundColor: '#000', 
            borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Subtle white border
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleToggleDrawer} sx={{ color: 'white' }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          {open && (
            <TravelExploreIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
          )}
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <List sx={{ px: 1.5, py: 2 }}>
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip
                  title={open ? '' : item.text}
                  placement="right"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#000', 
                        color: 'white', // White tooltip text
                        fontSize: '0.85rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle white border
                        boxShadow: theme.shadows[4],
                      },
                    },
                  }}
                >
                  <ListItemButton
                    onClick={() => router.push(item.path)}
                    sx={{
                      borderRadius: '6px',
                      my: 0.5,
                      mx: 0.5,
                      py: 1.25,
                      px: 1.5,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      ...(isActive && {
                        backgroundColor: 'rgba(251, 249, 249, 0.05) !important',
                        borderLeft: '3px solid white',
                      }),
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)', // Hover state background
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? 'white' : 'white', 
                        minWidth: 'auto',
                        justifyContent: open ? 'initial' : 'center',
                        mr: open ? 2 : 0,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '0.875rem',
                            color: 'white', // White text
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Main open={open}>{children}</Main>
    </Box>
  );
}