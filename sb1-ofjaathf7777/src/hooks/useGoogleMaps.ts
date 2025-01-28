import { useState, useEffect } from 'react';

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        // Wait for the Google Maps script to load
        while (!window.google?.maps) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Load the places library
        const { Autocomplete } = await window.google.maps.importLibrary('places') as any;
        if (Autocomplete) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Google Maps Places:', error);
        setLoadError(error as Error);
      }
    };

    loadPlaces();
  }, []);

  return { isLoaded, loadError };
};