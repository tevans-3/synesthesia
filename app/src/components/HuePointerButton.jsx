import React, { useState, useEffect } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { HexColorPicker } from 'react-colorful'; 
import { Button, Typography } from '@mui/material';
import { useUpload } from './UploadContext'; 

export function HuePointerButton {
  const { 
    setShowHuePointer
  } = useUpload(); 

  const handleClick = () => { 
    setShowHuePointer(true); 
  };

  return (
    <Button sx={{
            fontFamily: 'Roboto',
            backgroundColor: "#fce995", 
            color: "#ddd", 
        }}
        onClick={handleClick}> 
           < Typography variant="h6" color={'#000'}> CHANGE COLOR </Typography>
        </Button>
  ); 
}
