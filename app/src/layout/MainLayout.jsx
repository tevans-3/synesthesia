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
import _ from 'lodash';

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

    const [saturationWidth, setSaturationWidth] = useState(null); 
    const [saturationHeight, setSaturationHeight] = useState(null);

    const [oscillatorType, setOscillatorType] = useState("sine"); 


    async function DoPost(){
      console.log(userId);
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
    function handleClick(newColor) {

      setColor(newColor); 
      setHsva({ h:newColor.h, s:newColor.s, v:newColor.v, a: hsva.a });
      console.log(newColor); 
    };

    useEffect(() => 
    {
      setOscillator(); 
      console.log(hsva);
      const hexVal = hsvaToHex(hsva); 
      console.log(hexVal); 
      setHex(hexVal); 
      DoPost(JSON.stringify({hexVal}));
    
    }, [hsva]); 
 

    const N = 24; //number of equal divisions in the 24 TET scale
    const A = 440; //frequency of reference note A 
    var notes = []; 

    function generate24TetScale() {
      for (let i = 1; i <= 24; i++) {
        var randFloat = getRandomArbitrary(0, 2); 
        notes.push(A*Math.pow(randFloat, i/N))
      }
    }

    function getRandomArbitrary(min, max) {
      //Source credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      return Math.random() * (max - min) + min;
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

    function GenerateAudio(hexCode, oscillatorType){
     // generate24TetScale();
      Tone.start(); 
      console.log(oscillatorType);  
      var chord = getChord(hexCode); 
      const synth = new Tone.PolySynth(Tone.Synth, {oscillator:{type:oscillatorType}}).toDestination(); 
      const now = Tone.now();

      synth.triggerAttackRelease(chord, 5.5); 

    } 

    function setOscillator(){
      var hval = hsva.h; 
      if (hval <= 19) { 
          setOscillatorType("sine");     
      }
      else if (hval <= 33) {
          setOscillatorType("sawtooth");
      }
      else if (hval <= 59) {
          setOscillatorType("square"); 
      } 
      else if (hval <= 99) {
          setOscillatorType("triangle"); 
      } 
      else if (hval <= 138) {
          setOscillatorType("pulse"); 
      } 
      else if (hval <= 165) { 
          setOscillatorType("pwm"); 
      }
      else if (hval <= 185) {
          setOscillatorType("sine2"); 
      } 
      else if (hval <= 208) {
        setOscillatorType("fmsine3"); 
      }
      else if (hval <= 225) {
          setOscillatorType("fatsine5"); 
      } 
      else if (hval <= 253) {
          setOscillatorType("fatsawtooth"); 
      } 
      else if (hval <= 273) { 
          setOscillatorType("fattriangle"); 
      }
      else if (hval <= 293) {
          setOscillatorType("fatsquare");
      }
      else if (hval <= 320) {
          setOscillatorType("fmsquare"); 
      } 
      else if (hval <= 358) { 
          setOscillatorType("fmsine"); 
      } 
      console.log(oscillatorType);
    }
   
    generate24TetScale();

    var THROTTLE_TIME = 1500; 
    const GenerateAudioThrottled = useRef(_.throttle(GenerateAudio, THROTTLE_TIME)); 

    const handleChange = (hsva) => {
      
      setHex(hsvaToHex(hsva)); 
      GenerateAudioThrottled.current(hex, oscillatorType);
    }; 
    return (

        <Box sx={{ display: 'flex'}}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar style={{ backgroundColor: "#fcfcfc"}}>
                    <Typography variant="h6" align="left" color={'#000'} >SYNESTHESIA</Typography>
                     <Box sx={{
                         position: 'fixed',
                         top: 2,
                         bottom: 5,
                         right: 20,
                         height:'50px',
                         display: 'flex'
                    }}>
                    <List sx={{ paddingLeft: '0em'} }>
                        <ListItem button component={Link} to="https://github.com/tevans-3/synesthesia">
                            <ListItemText primary="Source Code"
                                primaryTypographyProps={{
                  fontSize: '1em', color: '#b3b3b3', align:"right"}}>
                            </ListItemText>
                        </ListItem>
                    </List>
                  </Box>
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
          onChange={handleChange}
          //onClick={handleClick}
          style={{
            width:"100vw", 
            height: "100vh" 
          }}
      /> 
             </Box> 
       
       
  

    );
}






