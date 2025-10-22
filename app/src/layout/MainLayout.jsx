import React, { useState, useEffect, useRef } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import HuePointerButton from "../components/HuePointerButton";
import { useUpload} from "../components/UploadContext";

const drawerWidth = 240;

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
      showHuePointer,
      setShowHuePointer
    } = useUpload(); 

    function handleInput(e) {
        const color = e.target.value; 
        console.log(color); 
    }

    return (
        <Box sx={{ display: 'flex'}}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar style={{ backgroundColor: "#fcfcfc"}}>
                    <Typography variant="h6" align="left" color={'#000'} >SYNESTHESIA</Typography> 
                     <Typography variant={large ? "b1" : medium ? "b1" : small ? "b2" : "b2"} 
                      color={'#000'} 
                      sx={{paddingLeft:"15px", marginLeft:"auto", whiteSpace:"nowrap"}}>
                        Make music with a colorpicker.
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
                      display: 'flex',
                    }}>          
                  <HuePointerButton/>
              </Box>

             <Hue/>
            </AppBar>
          
        </Box> 
    );
}

