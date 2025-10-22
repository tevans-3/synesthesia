import React, { useState, useEffect, Component } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { CustomPicker } from 'react-color'; 
import { Button, Typography } from '@mui/material';
import { useUpload } from './UploadContext'; 
import { Hue } from 'react-color/lib/components/common';


class CustomColorPicker extends React.Component {
  render() { 
    return <div>CustomColorPicker</div>;

  }
}

export default CustomPicker(CustomColorPicker); 
