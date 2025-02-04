import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Stack,
  Stepper,
  Step,
  StepLabel,
  styled,
  createTheme,
  ThemeProvider
} from "@mui/material";
import {
  LocationOn,
  CurrencyRupee,
  People,
  DirectionsCar,
  TwoWheeler,
  DriveEta,
  Input
} from '@mui/icons-material';

const theme = createTheme({
    palette: {
      primary: {
        main: '#202123',
        light: '#353740',
        dark: '#10111A',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#FFFFFF',
        paper: '#FFFFFF'
      },
      text: {
        primary: '#202123',
        secondary: '#6E6E80'
      },
      action: {
        hover: 'rgba(0, 0, 0, 0.04)'
      }
    }
  });

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    maxWidth: '700px',
    border: '1px solid rgba(0, 0, 0, 0.15)'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    padding: '8px 24px',
    textTransform: 'none',
    boxShadow: 'none',
    minWidth: '120px',
    border: '1px solid #E5E5E5',
    color: '#202123',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#F7F7F8',
      borderColor: '#D9D9E3'
    },
    '&.MuiButton-contained': {
      backgroundColor: '#202123',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#353740'
      }
    }
  }));

  const OptionButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    padding: '8px 16px',
    textTransform: 'none',
    boxShadow: 'none',
    minWidth: '120px',
    margin: '4px',
    border: '1px solid #E5E5E5',
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-start',
    color: '#202123',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#F7F7F8',
      borderColor: '#D9D9E3'
    },
    '&.selected': {
      backgroundColor: '#F7F7F8',
      borderColor: '#202123',
      color: '#202123',
      '&:hover': {
        backgroundColor: '#F7F7F8',
        borderColor: '#202123'
      }
    },
    '& .MuiSvgIcon-root': {
      color: '#6E6E80'
    }
  }));
  

export default function TravelPlannerModal({ open = true, onClose}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: '',
    selectedPreset: null,
    budget: '',
    people: '',
    vehicleType: '',
    vehicleName: ''
  });
  const [destination, setDestination] = useState("");
const [budget, setBudget] = useState("");
const [fam, setFam] = useState("");
const [typeVehicle, setTypeVehicle] = useState("");
const [vehicleName, setVehicleName] = useState("");

  const handleNext = () => {
    if (!isStepValid()) return;
    setStep((prev) => prev + 1);
    
  };
  
  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.destination.trim() !== '';
      case 1:
        return formData.budget.trim() !== '';
      case 2:
        return formData.people.trim() !== '';
      case 3:
        return formData.vehicleType.trim() !== '';
      case 4:
        return formData.vehicleName.trim() !== '';
      default:
        return true;
    }
  };
    const handleBack = () => setStep((prev) => prev - 1);

    const updateFormData = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
      
        switch (key) {
          case "destination":
            setDestination(value);
            break;
          case "budget":
            setBudget(value);
            break;
          case "people":
            setFam(value);
            break;
          case "vehicleType":
            setTypeVehicle(value);
            break;
          case "vehicleName":
            setVehicleName(value);
            break;
          default:
            break;
        }
      };
      

  const steps = [
    "Destination",
    "Budget",
    "People",
    "Vehicle Type",
    "Vehicle Name"
  ];

  const presetDestinations = [
    "Pune to Bangalore",
    "Pune to Delhi",
    "Pune to Gujarat"
  ];
  const CustomStepper = styled(Stepper)(({ theme }) => ({
    '& .MuiStepLabel-root .Mui-active': {
      color: '#202123'
    },
    '& .MuiStepLabel-root .Mui-completed': {
      color: '#6E6E80'
    },
    '& .MuiStepLabel-label': {
      color: '#6E6E80',
      '&.Mui-active': {
        color: '#202123'
      }
    }
  }));
  console.log(destination, budget, fam, typeVehicle, vehicleName);


  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              {presetDestinations.map((dest) => (
                <OptionButton
                  key={dest}
                  variant="outlined"
                  className={formData.selectedPreset === dest ? 'selected' : ''}
                  onClick={() => {
                    updateFormData('selectedPreset', dest);
                    updateFormData('destination', dest);
                  }}
                  startIcon={<LocationOn />}
                >
                  {dest}
                </OptionButton>
              ))}
            </Box>
            {!formData.selectedPreset && (
              <TextField
                fullWidth
                label="Or enter custom destination"
                variant="outlined"
                value={formData.destination}
                onChange={(e) => updateFormData('destination', e.target.value)}
                InputProps={{
                  startAdornment: <LocationOn color="action" sx={{ mr: 1 }} />
                }}
                sx={{ 
                  mt: 2,
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '12px' 
                  } 
                }}
              />
            )}
          </Stack>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {['5k', '10k', '10+'].map((budget) => (
              <OptionButton
                key={budget}
                variant="outlined"
                className={formData.budget === budget ? 'selected' : ''}
                onClick={() => updateFormData('budget', budget)}
                startIcon={<CurrencyRupee />}
              >
                {budget}
              </OptionButton>
            ))}
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {["Solo", "Couple", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
              <OptionButton
                key={num}
                variant="outlined"
                className={formData.people === num ? 'selected' : ''}
                onClick={() => updateFormData('people', num)}
                startIcon={<People />}
              >
                {num}
              </OptionButton>
            ))}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <OptionButton
              variant="outlined"
              className={formData.vehicleType === 'two-wheeler' ? 'selected' : ''}
              onClick={() => updateFormData('vehicleType', 'two-wheeler')}
              startIcon={<TwoWheeler />}
            >
              Two-Wheeler
            </OptionButton>
            <OptionButton
              variant="outlined"
              className={formData.vehicleType === 'four-wheeler' ? 'selected' : ''}
              onClick={() => updateFormData('vehicleType', 'four-wheeler')}
              startIcon={<DirectionsCar />}
            >
              Four-Wheeler
            </OptionButton>
          </Box>
        );

      case 4:
        return (
          <TextField
            fullWidth
            label="Vehicle Name"
            variant="outlined"
            value={formData.vehicleName}
            onChange={(e) => updateFormData('vehicleName', e.target.value)}
            InputProps={{
              startAdornment: <DriveEta color="action" sx={{ mr: 1 }} />
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '12px' 
              } 
            }}
          />
        );

        case 5: 
        return (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span style={{ color: "green", fontSize: "20px" }}>✔️ Thanks for the information!</span>
          </div>

        )

      default:
        return null;
    }
  };




   return (
    <ThemeProvider theme={theme}>

      <StyledDialog
        open={open}
        onClose={onClose}
        fullWidth
      >
        <DialogTitle sx={{ 
          pb: 1, 
          fontSize: '1.25rem',
          color: '#202123',
          borderBottom: '1px solid #F7F7F8'
        }}>
          Plan Your Trip
        </DialogTitle>
        
        <DialogContent sx={{ bgcolor: '#FFFFFF' }}>
          <Box sx={{ width: '100%', mb: 3 }}>
            <CustomStepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </CustomStepper>
          </Box>
          
          <Box sx={{ 
            minHeight: '120px',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            py: 2 
          }}>
            {renderStep()}
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          p: 2,
          borderTop: '1px solid #F7F7F8',
          bgcolor: '#FFFFFF'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {step > 0 ? (
              <StyledButton
                onClick={handleBack}
                variant="outlined"
                size="small"
              >
                Back
              </StyledButton>
            ) : <div />}
            
            <StyledButton
  onClick={handleNext}
  variant="contained"
  size="small"
  disabled={!isStepValid()} 
>
  {step < steps.length - 1 ? 'Next' : 'Submit'}
</StyledButton>

          </Box>
        </DialogActions>
      </StyledDialog>
    </ThemeProvider>
  );

}