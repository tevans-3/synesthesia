import React, { useState, useEffect, useRef } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Stack, FormControl, InputLabel, Select, MenuItem, Modal } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import HuePickerModal from "../components/HuePickerModal";
import { useUpload} from "../components/UploadContext";
import { HuePicker } from "react-color";
import Saturation from '@uiw/react-color-saturation'; 
import { hsvaToHex } from '@uiw/color-convert';
import { v4 as uuidv4 } from 'uuid';
import * as Tone from "tone";

const drawerWidth = 240;
const userId = uuidv4(); 
export default function MainLayout() {

    const theme = createTheme({ 
      palette: { 
        primary: { 
          main: '#ffffff'
        }
      }
    })
    const large = useMediaQuery(theme.breakpoints.up("lg")); 
    const medium = useMediaQuery(theme.breakpoints.up("md")); 
    const small = useMediaQuery(theme.breakpoints.up("sm"));

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

    const [hexCodes, setHexCodes] = useState([]); 
    const [saturationWidth, setSaturationWidth] = useState(null); 
    const [saturationHeight, setSaturationHeight] = useState(null);

    const [status, setStatus] = useState(null); 

    const N = 24; //number of equal divisions in the 24 TET scale
    const A = 440; //frequency of reference note A 
    var notes = []; 

    function generate24TetScale() {
      for (let i = 1; i <= 24; i++) {
        notes.push(A*Math.pow(2, i/N))
      }
    }

    function getChord(hexCode) {
      var notesInChord = []; 
      hexCode = hexCode.replace('#', '');
      var num = parseInt(hexCode, 16);
       
      var i = 0; 
      while (num) {
        
        if (num & 1) {
          i ++;
          notesInChord.push(notes[i]); 
        }
        num = num >> 1; 
      }
      return notesInChord; 
    } 

    function GenerateAudio(hexCode){
     // generate24TetScale();
      Tone.start(); 
      console.log("happening");
      var chord = getChord(hexCode); 
      const synth = new Tone.PolySynth(Tone.Synth, {oscillator:{type:"sine"}}).toDestination(); 
      const now = Tone.now();
      
      synth.triggerAttackRelease(chord, 1); 
      
    } 
    
    generate24TetScale(); 

    async function PostHexCode(){
      try { 
        const response = await fetch('http://localhost:8080/postHexCode', {
        method: 'POST', 
     
          body: JSON.stringify({ hex, userId})
        }); 
     
      if (!response.ok) {
      throw new Error(`DOOM! status: ${response.status}`)   
    
      const data = await response.json(); 
      console.log('Posted: ', data); 
      }
    }
      catch (error) {
      console.error('Error: ', error);
    }
   }
   function getRandomInt(max) {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
   }
    
   async function handleChange(newColor) {
      //await Tone.start(); 
      setColor(newColor);
       
      setHsva({ h:newColor.h, s:newColor.s, v:newColor.v, a: hsva.a });
      setHex(hsvaToHex(hsva)); 
      if (hexCodes.length >= 5) hexCodes = []; 
      hexCodes.push(hsvaToHex(hsva)); 
      idx = getRandomInt(hexCodes.length); 
      GenerateAudio(hexCodes[idx]); 
  }
  
    return (
    
        <Box sx={{ display: 'flex'}}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar style={{ backgroundColor: "#fcfcfc"}}>
                    <Typography variant="h6" align="left" color={'#000'} >SYNESTHESIA</Typography> 
                     <Typography variant={large ? "b1" : medium ? "b1" : small ? "b2" : "b2"} 
                      color={'#000'} 
                      sx={{paddingLeft:"15px", marginLeft:"auto", whiteSpace:"nowrap"}}>
                      
                     </Typography>
                    <List sx={{ paddingLeft: '5.8em'} }>
                        <ListItem button component={Link} to="https://github.com/tevans-3/synesthesia">
                            <ListItemText primary="Source Code"
                                primaryTypographyProps={{
                                    fontSize: '1em', color: '#b3b3b3'}}>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Toolbar> 
                
                <Box sx={{
                      position: 'fixed',
                      bottom: 10,
                      right: 10,
                      display: 'flex'
                    }}>          
                  <HuePickerModal sx={{top:10, left:10, position:'fixed'}}/>
              </Box>

            </AppBar>
        

        
         <Saturation
          hsva={hsva}
          color={hex}
          onChange={handleChange}
          style={{
            width:"100vw", 
            height: "100vh" 
          }}
      /> 
             </Box> 
       
       
  

    );
}



