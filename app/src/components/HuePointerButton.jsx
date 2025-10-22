import React, { useState, useEffect } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { HexColorPicker } from 'react-colorful'; 
import { Button, Typography } from '@mui/material';
import { useUpload } from './UploadContext'; 

export default function HuePointerButton() {
  const {
    showHuePointer,
    setShowHuePointer
  } = useUpload(); 

  const handleClick = () => {
    console.log(showHuePointer);
    if (!showHuePointer){ 
      setShowHuePointer(true);
    }
    else {
      setShowHuePointer(false);
    }
  };

  return (
    <Button sx={{
            fontFamily: 'Roboto',
            backgroundColor: "#fff", 
            color: "#ddd"
        }}
        variant="outlined"
        color="#ffffff"
        onClick={handleClick}> 
           < Typography variant="h6" color={'#000'}> CHANGE COLOR </Typography>
        </Button>
  ); 
}
