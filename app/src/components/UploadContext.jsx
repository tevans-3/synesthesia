/* eslint-disable react-refresh/only-export-components */
import React, { useState, useContext, useEffect } from 'react'; 

export const UploadContext = React.createContext(); 

export function UploadProvider({ children }) {

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth); 
            setHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
    });
    
    const [showHuePointer, setShowHuePointer] = useState(false); 

    const contextValue = React.useMemo(() => ({
      showHuePointer, 
      setShowHuePointer 
    }), [
      showHuePointer, 
      setShowHuePointer
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

