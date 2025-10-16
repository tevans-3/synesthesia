import React, { useState, useEffect } from 'react';
import "../App.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { HexColorPicker } from 'react-colorful'; 
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function MainLayout() {

    const theme = useTheme();  
    const large = useMediaQuery(theme.breakpoints.up("lg")); 
    const medium = useMediaQuery(theme.breakpoints.up("md")); 
    const small = useMediaQuery(theme.breakpoints.up("sm")); 

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar style={{ backgroundColor: "#fcfcfc"}}>
                    <Typography variant="h6" align="left" color={'#000'} >SYNESTHESIA</Typography>
                     <Typography variant={large ? "b1" : medium ? "b1" : small ? "b2" : "b2"} 
                      color={'#000'} 
                      sx={{paddingLeft:"15px", marginLeft:"auto", whiteSpace:"nowrap"}}>
                        Make music with a hex colorpicker.
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
               <HexColorPicker sx={{ height: "100% !important", width:"100% !important"}}/>
          </AppBar>
        </Box> 
    );
}
