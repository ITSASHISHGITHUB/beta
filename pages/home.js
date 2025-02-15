import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import "tailwindcss/tailwind.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Badge, styled } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { fetchGeminiResponse } from "../utils/gemini";

const Home = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapUrl, setMapUrl] = useState("");
  const { data: session, status } = useSession();

  const isRouteQuery = (message) => {
    const routeKeywords = ['route', 'direction', 'from', 'to', 'how to reach', 'way to'];
    return routeKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const extractLocations = (message) => {
    const fromToRegex = /(?:from\s+)([a-zA-Z\s]+)(?:\s+to\s+)([a-zA-Z\s]+)/i;
    const match = message.match(fromToRegex);
    if (match) {
      return {
        origin: match[1].trim(),
        destination: match[2].trim()
      };
    }
    return null;
  };

  const generateMapsUrl = (origin, destination) => {
    const baseUrl = "https://www.google.com/maps/embed/v1/directions";
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `${baseUrl}?key=${key}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving`;
  };

  const handleSendMessage = async () => {
    if (status !== "authenticated" || !input.trim()) return;

    try {
      const userMessage = { text: input, sender: "user" };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      if (isRouteQuery(input)) {
        const locations = extractLocations(input);
        if (locations) {
          const mapsUrl = generateMapsUrl(locations.origin, locations.destination);
          setMapUrl(mapsUrl);
        }
      }

      const aiResponse = await fetchGeminiResponse(input);
      
      setMessages(prev => [...prev, { 
        text: aiResponse || "I apologize, but I couldn't generate a response. Please try again.", 
        sender: "bot",
        isRoute: isRouteQuery(input)
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but an error occurred. Please try again.", 
        sender: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleThumbsUp = (message) => {
    console.log("User liked message:", message);
  };

  useEffect(() => {
    if (status === "authenticated" && messages.length === 0) {
      setMessages([
        { text: "Welcome to Ashish Beta. How can I help you?", sender: "bot" },
      ]);
    }
  }, [status, messages.length]);

  const handleSignOut = () => {
    signOut();
    setMessages([]);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-sans h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b">
        <div className="flex items-center gap-2">
          <IconButton>
            <i className="fas fa-paperclip text-xl" />
          </IconButton>
          <span className="text-xl font-semibold">Ashish Beta</span>
          <IconButton size="small">
            <i className="fas fa-chevron-down text-sm" />
          </IconButton>
        </div>
        <div className="flex items-center gap-4">
          {status === "authenticated" && (
            <Typography
              variant="subtitle1"
              className="ml-4"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Welcome,
              {session.user.name &&
                session.user.name
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={session.user.name}
                  src={session.user.image}
                  sx={{ width: 32, height: 32, ml: 1 }}
                />
              </StyledBadge>
            </Typography>
          )}

          <div className="flex items-center gap-2">
            {status === "authenticated" ? (
              <Button
                variant="outlined"
                onClick={handleSignOut}
                sx={{
                  borderRadius: 20,
                  px: 3,
                  py: 1,
                  minHeight: 40,
                }}
              >
                Log out
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 20,
                    px: 3,
                    py: 1,
                    minHeight: 40,
                  }}
                  onClick={() => signIn()}
                >
                  Log in
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 20,
                    px: 3,
                    py: 1,
                    minHeight: 40,
                    bgcolor: "black",
                    "&:hover": { bgcolor: "#333" },
                  }}
                  onClick={() => signIn()}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {status === "authenticated" ? (
          <>
            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg relative ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      {message.text}
                      {message.sender === "bot" && (
                        <div className="flex justify-end gap-1 mt-2">
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(message.text)}
                            sx={{
                              padding: "4px",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.05)",
                              },
                            }}
                          >
                            <ContentCopyIcon
                              fontSize="small"
                              sx={{ fontSize: 16 }}
                            />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleThumbsUp(message)}
                            sx={{
                              padding: "4px",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.05)",
                              },
                            }}
                          >
                            <ThumbUpAltIcon
                              fontSize="small"
                              sx={{ fontSize: 16 }}
                            />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {mapUrl && (
                  <div className="w-full mt-2 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <CircularProgress size={20} />
                    </div>
                  </div>
                )}
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
                    disabled={isLoading}
                    multiline
                    maxRows={4}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 20,
                        paddingRight: 1,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    sx={{
                      borderRadius: 20,
                      px: 4,
                      py: 1.5,
                      bgcolor: "black",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Sign-in Prompt */
          <Container
            maxWidth="sm"
            className="flex-1 flex items-center justify-center"
          >
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
                  bgcolor: "black",
                  "&:hover": { bgcolor: "#333" },
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
          position: "fixed",
          bottom: 16,
          right: 16,
          bgcolor: "grey.100",
          "&:hover": { bgcolor: "grey.200" },
        }}
      >
        <HelpIcon sx={{ color: "grey.600" }} />
      </IconButton>
    </div>
  );
};

export default Home;