import React, { useState, useEffect, Component } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { CustomPicker } from 'react-color'; 
import { Button, Typography } from '@mui/material';
import { useUpload } from './UploadContext'; 


class CustomColorPicker extends React.Component {
  render() { 
    var { Hue } = require('react-color/lib/components/common');
    var { Saturation } = require('react-color/lib/components/common');

    return (<div>CustomColorPicker</div>;
    
    <Hue
      {...this.props}
      pointer={ CustomPointer }
      onChange={ this.handleChange }
       direction={ 'horizontal' || 'vertical' } />
    
    ); 
  }
}

export default CustomPicker(CustomColorPicker); 
