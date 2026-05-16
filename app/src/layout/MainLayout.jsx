import React, { useState, useEffect, useRef, useMemo} from 'react';
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

    const limiter = useMemo(() => new Tone.Limiter(-20).toDestination(), []);
    const volume = useMemo(() => new Tone.Volume(-7), []);

    function handleClick(newColor) {

      setColor(newColor); 
      setHsva({ h:newColor.h, s:newColor.s, v:newColor.v, a: hsva.a });
    };

    useEffect(() => 
    {
      setOscillator(); 
      const hexVal = hsvaToHex(hsva); 
      setHex(hexVal); 
    
    }, [hsva]); 
 

    const N = 24; //number of equal divisions in the 24 TET scale
    const A = 440; //frequency of reference note A 
    var notes = []; 

    function generate24TetScale() {
      // only generate the scale once, on initial page load
      if (notes.length != 0) return; 

      for (let i = 1; i <= 24; i++) {
        // this produces 'better' sounding noise than using 2.0 as base 
        // so it's not a true scale mapping, but sometimes, in the pursuit of 
        // aesthetic perfection /s/s/s/s, sacrifices must be made 
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
          notesInChord.push(notes[i]); 
        }
        i ++; 
        num = num >> 1; 
      }
      return notesInChord; 
    } 

    function GenerateAudio(hexCode, oscillatorType){
      Tone.start();
      var chord = getChord(hexCode);
      const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: oscillatorType },
          envelope: { attack: 1.5, decay: 2, sustain: 0.3, release: 1 }
      });
      synth.connect(limiter);
      synth.chain(volume, Tone.getDestination());
      synth.triggerAttackRelease(chord, 5.5, Tone.now(), 0.01);
      setTimeout(() => synth.dispose(), 8000);
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
          setOscillatorType("amsquare"); 
      } 
      else if (hval <= 358) { 
          setOscillatorType("amsine");
      } 
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
          style={{
            width:"100vw", 
            height: "100vh" 
          }}
        /> 
     </Box> 
       
       
  

    );
}






