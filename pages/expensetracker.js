import React, { useEffect, useState } from "react";
import {
 Box,
 Card,
 CardContent,
 Typography,
 LinearProgress,
 Grid,
 Avatar,
 Stack,
 Chip,
 InputAdornment,
 Divider,
 TextField,
 Button,
 List,
 ListItem,
 ListItemText,
 ListItemIcon,
 IconButton,
 ToggleButtonGroup,
 ToggleButton,
 CircularProgress,
} from "@mui/material";
import {
    DirectionsCar,
    Speed,
    CurrencyRupee,
    Calculate,
    CheckCircleOutline,
    Timeline,
    Route,
    LocationOn,
    Home,
    Restaurant,
    LocalActivity,
    AccessTime,
    AttachMoney,
    LocalGasStation,
    CheckCircle,
    Water,
    Air,
    Add, // ✅ Correct
    LightbulbOutlined,
  } from "@mui/icons-material";
  

const ExpenseTracker = () => {
 const [weatherData, setWeatherData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [tripType, setTripType] = useState("oneWay");

 const [formData, setFormData] = useState({
 distance: "",
 efficiency: "",
 price: "",
 });

 const [calculationResult, setCalculationResult] = useState({
 fuelRequired: 0,
 totalCost: 0,
 roundTripCost: 0,
 costPerKm: 0,
 });

 const API_KEY = "26ddc87370ba4a2c84994116250602";

 useEffect(() => {
 const fetchWeatherData = async (latitude, longitude) => {
 try {
 const response = await fetch(
 `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
 );
 if (!response.ok) {
 throw new Error("Failed to fetch weather data");
 }
 const data = await response.json();
 setWeatherData(data);
 } catch (err) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };

 const getUserLocation = () => {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(
 (position) => {
 const { latitude, longitude } = position.coords;
 fetchWeatherData(latitude, longitude);
 },
 (err) => {
 setError(err.message);
 setLoading(false);
 }
 );
 } else {
 setError("Geolocation is not supported by this browser.");
 setLoading(false);
 }
 };

 getUserLocation();
 }, [API_KEY]);

 if (loading) {
 return <CircularProgress />;
 }

 if (error) {
 return <Typography color="error">{error}</Typography>;
 }

 const { current, location } = weatherData;

 const getWeatherAdvisory = () => {
 if (current.condition.text.toLowerCase().includes("rain")) {
 return {
 message: "Rainy conditions expected",
 advice: "Carry an umbrella and wear waterproof clothing.",
 color: "blue",
 };
 } else if (current.condition.text.toLowerCase().includes("cloud")) {
 return {
 message: "Cloudy skies expected",
 advice: "Perfect weather for outdoor activities.",
 color: "grey",
 };
 } else {
 return {
 message: "Good conditions for traveling",
 advice:
 "Clear skies expected throughout the day. Perfect weather for sightseeing and outdoor activities.",
 color: "green",
 };
 }
 };

 const advisory = getWeatherAdvisory();

 const expenses = [
 {
 category: "Accommodation",
 amount: 450,
 percentage: 40,
 color: "#1976d2",
 icon: Home,
 },
 {
 category: "Food & Dining",
 amount: 337.5,
 percentage: 30,
 color: "#2e7d32",
 icon: Restaurant,
 },
 {
 category: "Transportation",
 amount: 225,
 percentage: 20,
 color: "#ed6c02",
 icon: DirectionsCar,
 },
 {
 category: "Activities",
 amount: 112.5,
 percentage: 10,
 color: "#d32f2f",
 icon: LocalActivity,
 },
 ];

 const recentTransactions = [
 {
 title: "Hotel Payment",
 time: "Today, 2:30 PM",
 amount: -150,
 icon: Home,
 color: "#1976d2",
 },
 {
 title: "Restaurant",
 time: "Today, 1:15 PM",
 amount: -45,
 icon: Restaurant,
 color: "#2e7d32",
 },
 {
 title: "Fuel",
 time: "Yesterday, 4:30 PM",
 amount: -35,
 icon: DirectionsCar,
 color: "#ed6c02",
 },
 ];

 const tripLogs = [
 {
 location: "Paris, France",
 date: "Feb 1-5, 2025",
 status: "In Progress",
 cost: 850,
 highlights: ["Eiffel Tower", "Louvre Museum", "Seine River"],
 },
 {
 location: "Rome, Italy",
 date: "Jan 25-30, 2025",
 status: "Completed",
 cost: 1200,
 highlights: ["Colosseum", "Vatican City", "Roman Forum"],
 },
 {
 location: "Barcelona, Spain",
 date: "Jan 15-20, 2025",
 status: "Completed",
 cost: 950,
 highlights: ["Sagrada Familia", "Park Güell", "Las Ramblas"],
 },
 ];

 const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData({
 ...formData,
 [name]: value,
 });
 };

 const handleTripTypeChange = (event, newTripType) => {
 if (newTripType !== null) {
 setTripType(newTripType);
 }
 };

 const handleCalculate = () => {
 const { distance, efficiency, price } = formData;

 if (!distance || !efficiency || !price) {
 alert("Please fill in all fields.");
 return;
 }

 const distanceValue = parseFloat(distance);
 const efficiencyValue = parseFloat(efficiency);
 const priceValue = parseFloat(price);

 const adjustedDistance =
 tripType === "roundTrip" ? distanceValue * 2 : distanceValue;

 const fuelRequired = (adjustedDistance / efficiencyValue).toFixed(2);
 const totalCost = (fuelRequired * priceValue).toFixed(2);
 const roundTripCost = (
 totalCost * (tripType === "roundTrip" ? 1 : 2)
 ).toFixed(2);
 const costPerKm = (totalCost / adjustedDistance).toFixed(2);

 setCalculationResult({
 fuelRequired,
 totalCost,
 roundTripCost,
 costPerKm,
 });
 };

 const efficiencyTips = [
 "Maintain steady speed and avoid rapid acceleration",
 "Check tire pressure before long trips",
 "Remove excess weight from vehicle",
 "Use cruise control on highways",
 "Regular vehicle maintenance",
 ];

 const previousRecords = [
 {
 route: "Mountain Route",
 distance: 250,
 efficiency: 12,
 cost: 45.83,
 icon: <Timeline />,
 },
 {
 route: "Lake Circuit",
 distance: 180,
 efficiency: 14,
 cost: 28.5,
 icon: <Route />,
 },
 {
 route: "City Loop",
 distance: 120,
 efficiency: 10,
 cost: 22.75,
 icon: <LocationOn />,
 },
 ];

 return (
 <Box sx={{ flexGrow: 1, p: 2 }}>
 <Grid container spacing={3}>
 <Grid item xs={12} lg={4}>
 <Card sx={{ height: "100%" }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Expense by Category
 </Typography>
 <Stack spacing={2}>
 {expenses.map((expense, index) => (
 <Box
 key={index}
 sx={{ display: "flex", alignItems: "center" }}
 >
 <Box
 sx={{
 width: "50%",
 display: "flex",
 alignItems: "center",
 }}
 >
 <Box
 sx={{
 width: 12,
 height: 12,
 borderRadius: "50%",
 bgcolor: expense.color,
 mr: 1,
 }}
 />
 <Typography variant="body2" color="text.secondary">
 {expense.category}
 </Typography>
 </Box>
 <Box
 sx={{
 width: "50%",
 display: "flex",
 alignItems: "center",
 }}
 >
 <Box sx={{ flexGrow: 1, mx: 1 }}>
 <LinearProgress
 variant="determinate"
 value={expense.percentage}
 sx={{
 height: 8,
 borderRadius: 4,
 bgcolor: `${expense.color}20`,
 "& .MuiLinearProgress-bar": {
 bgcolor: expense.color,
 borderRadius: 4,
 },
 }}
 />
 </Box>
 <Typography variant="body2" fontWeight="medium">
 ₹{expense.amount}
 </Typography>
 </Box>
 </Box>
 ))}
 </Stack>
 <Stack spacing={2}></Stack>
 <Divider sx={{ my: 2 }} />
 <Typography variant="h6" gutterBottom>
 AI Travel Assistant
 </Typography>

 <Box sx={{ p: 2, bgcolor: "blue.50", borderRadius: 1, mb: 1 }}>
 <Typography variant="body2" color="primary">
 Based on your interests, you might enjoy the local art
 galleries opening this weekend.
 </Typography>
 </Box>
 <Box sx={{ p: 2, bgcolor: "green.50", borderRadius: 1, mb: 2 }}>
 <Typography variant="body2" color="success.main">
 The weather will be perfect for outdoor activities next
 Wednesday.
 </Typography>
 </Box>
 <TextField
 fullWidth
 variant="outlined"
 placeholder="Ask AI for recommendations..."
 size="small"
 />
 </CardContent>
 </Card>
 </Grid>

 <Grid item xs={12} lg={4}>
 <Card sx={{ height: "100%" }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Recent Transactions
 </Typography>
 <Stack spacing={1}>
 {recentTransactions.map((transaction, index) => (
 <Box
 key={index}
 sx={{
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between",
 p: 1.5,
 bgcolor: "grey.50",
 borderRadius: 2,
 }}
 >
 <Box sx={{ display: "flex", alignItems: "center" }}>
 <Avatar
 sx={{
 bgcolor: `${transaction.color}15`,
 color: transaction.color,
 mr: 2,
 width: 40,
 height: 40,
 }}
 >
 <transaction.icon />
 </Avatar>
 <Box>
 <Typography variant="body1" fontWeight="medium">
 {transaction.title}
 </Typography>
 <Typography variant="body2" color="text.secondary">
 {transaction.time}
 </Typography>
 </Box>
 </Box>
 <Typography variant="body1" fontWeight="medium">
 ₹{transaction.amount}
 </Typography>
 </Box>
 ))}
 </Stack>

 <Card variant="outlined">
 <CardContent>
 <Typography variant="h5" component="div">
 Current Weather in {location.name}, {location.country}
 </Typography>
 <Typography color="text.secondary">
 {new Date(location.localtime).toLocaleString()}
 </Typography>
 <Typography variant="h2" component="div">
 {current.temp_c}°C
 </Typography>
 <Typography color="text.secondary">
 {current.condition.text}
 </Typography>
 <Grid container spacing={2} sx={{ mt: 2 }}>
 <Grid item xs={6}>
 <Box display="flex" alignItems="center">
 <Water />
 <Box ml={1}>
 <Typography variant="body2" color="text.secondary">
 Humidity
 </Typography>
 <Typography variant="body1">
 {current.humidity}%
 </Typography>
 </Box>
 </Box>
 </Grid>
 <Grid item xs={6}>
 <Box display="flex" alignItems="center">
 <Air />
 <Box ml={1}>
 <Typography variant="body2" color="text.secondary">
 Wind Speed
 </Typography>
 <Typography variant="body1">
 {current.wind_kph} km/h
 </Typography>
 </Box>
 </Box>
 </Grid>
 </Grid>
 </CardContent>
 </Card>

 <Stack></Stack>
 </CardContent>
 </Card>
 </Grid>

 <Grid item xs={12} lg={4}>
 <Card sx={{ height: "100%" }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Trip Log
 </Typography>
 <Stack spacing={2}>
 {tripLogs.map((trip, index) => (
 <Box
 key={index}
 sx={{
 p: 2,
 bgcolor: "grey.50",
 borderRadius: 2,
 }}
 >
 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
 <LocationOn color="primary" sx={{ mr: 1 }} />
 <Typography variant="body1" fontWeight="medium">
 {trip.location}
 </Typography>
 </Box>
 <Stack
 direction="row"
 spacing={2}
 alignItems="center"
 sx={{ mb: 1.5 }}
 >
 <Box sx={{ display: "flex", alignItems: "center" }}>
 <AccessTime
 sx={{
 fontSize: 16,
 mr: 0.5,
 color: "text.secondary",
 }}
 />
 <Typography variant="body2" color="text.secondary">
 {trip.date}
 </Typography>
 </Box>
 <Box sx={{ display: "flex", alignItems: "center" }}>
 <AttachMoney
 sx={{
 fontSize: 16,
 mr: 0.5,
 color: "text.secondary",
 }}
 />
 <Typography variant="body2" color="text.secondary">
 ₹{trip.cost}
 </Typography>
 </Box>
 <Chip
 label={trip.status}
 size="small"
 color={
 trip.status === "In Progress" ? "primary" : "success"
 }
 />
 </Stack>
 <Divider sx={{ my: 1 }} />
 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
 {trip.highlights.map((highlight, i) => (
 <Chip
 key={i}
 label={highlight}
 size="small"
 variant="outlined"
 />
 ))}
 </Box>
 </Box>
 ))}
 </Stack>
 </CardContent>
 </Card>
 </Grid>
 </Grid>

 <Grid container spacing={3} sx={{ mt: 3 }}>
 <Grid item xs={12} md={4}>
 <Card elevation={0} sx={{ bgcolor: "grey.50" }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Trip Details
 </Typography>
 <Stack spacing={3}>
 <TextField
 label="Distance"
 name="distance"
 type="number"
 fullWidth
 value={formData.distance}
 onChange={handleInputChange}
 InputProps={{
 startAdornment: (
 <InputAdornment position="start">
 <DirectionsCar />
 </InputAdornment>
 ),
 endAdornment: (
 <InputAdornment position="end">km</InputAdornment>
 ),
 }}
 />
 <TextField
 label="Vehicle Efficiency"
 name="efficiency"
 type="number"
 fullWidth
 value={formData.efficiency}
 onChange={handleInputChange}
 InputProps={{
 startAdornment: (
 <InputAdornment position="start">
 <Speed />
 </InputAdornment>
 ),
 endAdornment: (
 <InputAdornment position="end">km/L</InputAdornment>
 ),
 }}
 />
 <TextField
 label="Fuel Price"
 name="price"
 type="number"
 fullWidth
 value={formData.price}
 onChange={handleInputChange}
 InputProps={{
 startAdornment: (
 <InputAdornment position="start">
 <CurrencyRupee />
 </InputAdornment>
 ),
 endAdornment: (
 <InputAdornment position="end">/L</InputAdornment>
 ),
 }}
 />
 <ToggleButtonGroup
 value={tripType}
 exclusive
 onChange={handleTripTypeChange}
 fullWidth
 sx={{ mt: 2 }}
 >
 <ToggleButton value="oneWay" aria-label="One Way">
 One Way
 </ToggleButton>
 <ToggleButton value="roundTrip" aria-label="Round Trip">
 Round Trip
 </ToggleButton>
 </ToggleButtonGroup>
 <Button
 variant="contained"
 size="large"
 startIcon={<Calculate />}
 onClick={handleCalculate}
 >
 Calculate
 </Button>
 </Stack>
 </CardContent>
 </Card>
 </Grid>

 <Grid item xs={12} md={4}>
 <Stack spacing={3}>
 <Card elevation={0} sx={{ bgcolor: "grey.50" }}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Calculation Results
 </Typography>
 <Grid container spacing={2} sx={{ mb: 3 }}>
 <Grid item xs={6}>
 <Typography color="text.secondary" variant="body2">
 Estimated Fuel Required
 </Typography>
 <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
 {calculationResult.fuelRequired} L
 </Typography>
 </Grid>
 <Grid item xs={6}>
 <Typography color="text.secondary" variant="body2">
 Total Cost
 </Typography>
 <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
 ₹{calculationResult.totalCost}
 </Typography>
 </Grid>
 </Grid>
 <Divider sx={{ my: 2 }} />
 <Stack spacing={1}>
 <Box
 sx={{ display: "flex", justifyContent: "space-between" }}
 >
 <Typography color="text.secondary">Round Trip</Typography>
 <Typography fontWeight="medium">
 ₹{calculationResult.roundTripCost}
 </Typography>
 </Box>
 <Box
 sx={{ display: "flex", justifyContent: "space-between" }}
 >
 <Typography color="text.secondary">Cost per km</Typography>
 <Typography fontWeight="medium">
 ₹{calculationResult.costPerKm}
 </Typography>
 </Box>
 </Stack>
 </CardContent>
 </Card>

 <Card elevation={0}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Efficiency Tips
 </Typography>
 <List dense>
 {efficiencyTips.map((tip, index) => (
 <ListItem key={index}>
 <ListItemIcon>
 <CheckCircleOutline color="success" />
 </ListItemIcon>
 <ListItemText
 primary={tip}
 primaryTypographyProps={{ color: "text.secondary" }}
 />
 </ListItem>
 ))}
 </List>
 </CardContent>
 </Card>
 </Stack>
 </Grid>

 <Grid item xs={12} md={4}>
 <Card elevation={0}>
 <CardContent>
 <Typography variant="h6" gutterBottom>
 Previous Records
 </Typography>
 <Stack spacing={2}>
 {previousRecords.map((record, index) => (
 <Card
 key={index}
 elevation={0}
 sx={{
 bgcolor: "grey.50",
 "&:hover": { bgcolor: "grey.100" },
 transition: "background-color 0.3s",
 }}
 >
 <CardContent
 sx={{
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 }}
 >
 <Box sx={{ display: "flex", alignItems: "center" }}>
 <IconButton
 size="small"
 sx={{
 mr: 2,
 bgcolor: "primary.light",
 color: "primary.main",
 "&:hover": { bgcolor: "primary.light" },
 }}
 >
 {record.icon}
 </IconButton>
 <Box>
 <Typography variant="subtitle1" fontWeight="medium">
 {record.route}
 </Typography>
 <Typography variant="body2" color="text.secondary">
 {record.distance}km • {record.efficiency}km/L
 </Typography>
 </Box>
 </Box>
 <Typography variant="subtitle1" fontWeight="medium">
 ₹{record.cost}
 </Typography>
 </CardContent>
 </Card>
 ))}
 </Stack>
 </CardContent>
 </Card>
 </Grid>
 </Grid>
 </Box>
 );
};


export default ExpenseTracker;