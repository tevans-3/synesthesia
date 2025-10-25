/* eslint-disable react-refresh/only-export-components */
import React, { useState, useContext, useEffect } from 'react'; 

export const UploadContext = React.createContext(); 

export function UploadProvider({ children }) {

    const [width, setWidth] = useState(window.innerWidth); 
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth); 
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
    });
    
    const [showHuePicker, setShowHuePicker] = useState(false); 
    const [color, setColor] = useState("#adadad");
    const [hex, setHex] = useState('#adadad'); 
    const [hsva, setHsva] = useState({ h: 1, s: 0, v: 68, a: 1 });

    const contextValue = React.useMemo(() => ({
      width, 
      setWidth,
      height, 
      setHeight,
      showHuePicker, 
      setShowHuePicker, 
      color, 
      setColor, 
      hex, 
      setHex, 
      hsva, 
      setHsva
    }), [
      showHuePicker, 
      setShowHuePicker, 
      color, 
      setColor, 
      hex, 
      setHex, 
      hsva, 
      setHsva 
        ]);

    return (
        <UploadContext.Provider value={contextValue}>
            {children}
        </UploadContext.Provider>
    ); 
}

export function useUpload() {
  return useContext(UploadContext);
}

