import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CheckCircle,
  Security,
  Update,
  VerifiedUser,
  Bolt,
} from "@mui/icons-material";

const UpgradeSection = () => {
  const [onefifty, setOnefifty] = useState("");
  const [fifty, setFifty] = useState("");

  console.log(fifty, "clicked");

  function fiftyfunction() {
    setFifty(true);
  }

  const fiftyFunction = () => {
    setFifty(true);
  };

  return (
    <Box sx={{ backgroundColor: "white", py: 6 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "neutral.800", mb: 1 }}
          >
            Upgrade to Pro
          </Typography>
          <Typography variant="h6" sx={{ color: "neutral.600" }}>
            Enhance your travel experience with premium features
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "neutral.200",
                borderRadius: 2,
                backgroundColor: "neutral.50",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "neutral.800" }}
                >
                  Free Plan
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "neutral.800" }}
                  >
                    ₹0
                  </Typography>
                  <Typography variant="body1" sx={{ color: "neutral.600" }}>
                    /month
                  </Typography>
                </Box>
                <List sx={{ mt: 2, mb: 4 }}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Basic trip planning"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Simple expense tracking"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Basic fuel calculator"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                </List>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "neutral.200",
                    color: "neutral.800",
                    "&:hover": { backgroundColor: "neutral.100" },
                  }}
                >
                  Current Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Pro Plan */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 2,
                backgroundColor: "white",
                transform: "scale(1.05)",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "0 8px 0 8px",
                }}
              >
                <Typography variant="body2">Most Popular</Typography>
              </Box>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "neutral.800" }}
                >
                  Premium Plan
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "neutral.800" }}
                  >
                    ₹149
                  </Typography>
                  <Typography variant="body1" sx={{ color: "neutral.600" }}>
                    /month
                  </Typography>
                </Box>
                <List sx={{ mt: 2, mb: 4 }}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="AI-powered trip recommendations"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Advanced expense analytics"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Real-time weather updates"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Priority customer support"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "neutral.200",
                borderRadius: 2,
                backgroundColor: "neutral.50",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "neutral.800" }}
                >
                  Pro Plan
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "neutral.800" }}
                    onClick={fiftyFunction}
                  >
                    ₹49
                  </Typography>
                  <Typography variant="body1" sx={{ color: "neutral.600" }}>
                    /month
                  </Typography>
                </Box>
                <List sx={{ mt: 2, mb: 4 }}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="All Pro features"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Custom trip templates"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Offline access"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "green.500" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="24/7 Premium support"
                      sx={{ color: "neutral.600" }}
                    />
                  </ListItem>
                </List>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "neutral.200",
                    color: "neutral.800",
                    "&:hover": { backgroundColor: "neutral.100" },
                  }}
                >
                  Choose Premium
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Features Comparison */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "semibold", color: "neutral.800", mb: 4 }}
          >
            All plans include:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: "neutral.200",
                  borderRadius: 2,
                  backgroundColor: "neutral.50",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Security
                    sx={{ color: "primary.main", fontSize: 40, mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: "neutral.600" }}>
                    Secure Data
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: "neutral.200",
                  borderRadius: 2,
                  backgroundColor: "neutral.50",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Update sx={{ color: "primary.main", fontSize: 40, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: "neutral.600" }}>
                    Regular Updates
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: "neutral.200",
                  borderRadius: 2,
                  backgroundColor: "neutral.50",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <VerifiedUser
                    sx={{ color: "primary.main", fontSize: 40, mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: "neutral.600" }}>
                    Safe Travel Tips
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: "neutral.200",
                  borderRadius: 2,
                  backgroundColor: "neutral.50",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Bolt sx={{ color: "primary.main", fontSize: 40, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: "neutral.600" }}>
                    Fast Performance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default UpgradeSection;
