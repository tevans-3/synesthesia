import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { HexColorPicker } from 'react-colorful'; 

const drawerWidth = 240;

export default function MainLayout() {


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                <Toolbar style={{ backgroundColor: "#fcfcfc"}}>
                    <Typography variant="h6" align="left" color={'#000'} >SYNESTHESIA</Typography>
                    <Typography variant="b2" color={'#000'} sx={{marginLeft:"auto"}}>Make music with a hex colorpicker. </Typography>
                    <List sx={{ paddingLeft: '5.8em'} }>
                        <ListItem button component={Link} to="https://github.com/tevans-3/synesthesia">
                            <ListItemText primary="Source Code"
                                primaryTypographyProps={{
                                    fontSize: '1em', color: '#b3b3b3'}}>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Toolbar>

                <section className="custom-colorpicker">
                  <HexColorPicker/>
                </section>
          </AppBar>
        </Box> 
    );
}
