import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import 'tailwindcss/tailwind.css';
import {
  TextField,
  Button,
  IconButton,
  Container,
  Typography,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';

const Home = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [recentChats, setRecentChats] = useState([
    { id: 1, preview: 'Previous chat about project setup...', date: '2024-02-15' },
    { id: 2, preview: 'Discussion on API integration...', date: '2024-02-14' },
  ]);
  const { data: session, status } = useSession();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (status !== 'authenticated' || !input.trim()) return;
    
    const newMessages = [
      ...messages,
      { text: input, sender: 'user' },
      { text: 'Please note that developers are working to make it work as quickly as possible.', sender: 'bot' },
    ];
    
    setMessages(newMessages);
    setInput('');
    
    // Add to recent chats
    setRecentChats(prev => [{
      id: Date.now(),
      preview: input.substring(0, 40) + (input.length > 40 ? '...' : ''),
      date: new Date().toISOString().split('T')[0]
    }, ...prev]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-sans h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <Badge badgeContent={recentChats.length} color="primary">
              <MenuIcon />
            </Badge>
          </IconButton>
          <span className="text-xl font-semibold">Ashish Beta</span>
          {status === 'authenticated' && (
            <Typography variant="subtitle1" className="ml-4">
              Welcome, {session.user.name}!
            </Typography>
          )}
        </div>
        <div className="flex gap-2">
          {status === 'authenticated' ? (
            <Button 
              variant="outlined" 
              onClick={() => signOut()}
              sx={{ borderRadius: 20, px: 3, py: 1 }}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button 
                variant="outlined" 
                sx={{ borderRadius: 20, px: 3, py: 1 }}
                onClick={() => signIn()}
              >
                Log in
              </Button>
              <Button 
                variant="contained" 
                sx={{ borderRadius: 20, px: 3, py: 1, bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                onClick={() => signIn()}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Chat History Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <div className="p-4 flex items-center gap-2 bg-gray-100">
          <HistoryIcon fontSize="medium" />
          <Typography variant="h6">Chat History</Typography>
        </div>
        <Divider />
        <List>
          {recentChats.map((chat) => (
            <ListItem 
              button 
              key={chat.id}
              sx={{
                '&:hover': { backgroundColor: '#e0e0e0' },
                borderBottom: '1px solid #eee'
              }}
            >
              <ListItemText
                primary={chat.preview}
                secondary={chat.date}
                primaryTypographyProps={{ noWrap: true }}
                sx={{ maxWidth: '100%' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {status === 'authenticated' ? (
          <>
            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 pt-2 border-t">
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-2 items-center">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Message Ashish Beta"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 20,
                        paddingRight: 1,
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    sx={{
                      borderRadius: 20,
                      px: 4,
                      py: 1.5,
                      bgcolor: 'black',
                      '&:hover': { bgcolor: '#333' }
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Container maxWidth="sm" className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Typography variant="h5" gutterBottom>
                Please sign in to continue
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 20,
                  px: 6,
                  py: 1.5,
                  bgcolor: 'black',
                  '&:hover': { bgcolor: '#333' }
                }}
                onClick={() => signIn()}
              >
                Sign In
              </Button>
            </div>
          </Container>
        )}
      </div>

      {/* Help Button */}
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          bgcolor: 'grey.100',
          '&:hover': { bgcolor: 'grey.200' }
        }}
      >
        <HelpIcon sx={{ color: 'grey.600' }} />
      </IconButton>
    </div>
  );
};

export default Home;