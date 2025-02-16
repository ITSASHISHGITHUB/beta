import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, styled } from '@mui/material';
import { Paperclip, ChevronDown } from '@mui/icons-material'; // Icons for the buttons

// Styled components for custom styling
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff', // White background
  color: '#000', // Black text
  borderBottom: '1px solid #e0e0e0', // Light gray border
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px', // Rounded corners
  textTransform: 'none', // Disable uppercase transformation
  fontWeight: 'bold', // Bold text
}));

function Navbar() {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconButton color="inherit" size="medium">
            <Paperclip fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Ashish Beta
          </Typography>
          <IconButton color="inherit" size="small">
            <ChevronDown fontSize="small" />
          </IconButton>
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <StyledButton variant="outlined" color="primary">
            Log in
          </StyledButton>
          <StyledButton variant="contained" color="primary">
            Sign up
          </StyledButton>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;