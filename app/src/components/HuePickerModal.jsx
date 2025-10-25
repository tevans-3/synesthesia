import React, { useState, useEffect } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { HexColorPicker } from 'react-colorful'; 
import { Button, Typography, Modal, Box } from '@mui/material';
import { useUpload } from './UploadContext';
import { HuePicker } from 'react-color';

export default function HuePickerModal() {
  const {
    showHuePicker,
    setShowHuePicker, 
    color, 
    setColor, 
    hex, 
    setHex, 
    hsva, 
    setHsva
  } = useUpload(); 

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  function handleChangeHuePicker(newColor) { 
      
      setColor(newColor); 
      setHsva(newColor.hsv);
      console.log(newColor);
      
  };

  return (
   <div> 
    <Button sx={{
            fontFamily: 'Roboto',
            backgroundColor: "#fff", 
            color: "#ddd"
        }}
        variant="outlined"
        color="#ffffff"
        onClick={handleOpen}> 
           { !open && < Typography variant="h6" color={'#000'}> CHANGE COLOR </Typography>} 
           { open &&  < Typography variant="h6" color={'#000'}> CLOSE HUE PICKER</Typography>}
        </Button>
      <Modal 
        open={open}
        width="100vw"
        height="25vh"
        onClose={handleClose}
        aria-describedby="modal-modal-content"
      >
       <Box> 
        <HuePicker 
          id="modal-modal-content" 
          color={color}
          width="100%"
          height="1em"
          onChange={handleChangeHuePicker}
        />
       </Box> 
      </Modal>
    </div>
  ); 
}
