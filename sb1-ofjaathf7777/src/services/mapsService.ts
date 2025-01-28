import { GOOGLE_MAPS_CONFIG } from '../config/maps';

export const createAutocomplete = (
  input: HTMLInputElement
): google.maps.places.Autocomplete | null => {
  try {
    const { places } = window.google.maps;
    if (!places?.Autocomplete) {
      console.error('Google Maps Places API not loaded');
      return null;
    }

    const autocomplete = new places.Autocomplete(input, {
      fields: ['formatted_address', 'geometry', 'name'],
      types: ['establishment', 'geocode'],
      componentRestrictions: { country: ['si', 'hr', 'it', 'at'] }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });

    return autocomplete;
  } catch (error) {
    console.error('Error creating autocomplete:', error);
    return null;
  }
};

export const calculateDistance = async (
  origin: string,
  destination: string
): Promise<{
  distance: number;  // in meters
  duration: number;  // in seconds
}> => {
  if (!origin || !destination) {
    throw new Error('Origin and destination addresses are required');
  }

  try {
    // Wait for Google Maps to be loaded
    while (!window.google?.maps) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Load the Distance Matrix Service
    await window.google.maps.importLibrary("routes");

    return new Promise((resolve, reject) => {
      try {
        const service = new google.maps.DistanceMatrixService();
        
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          },
          (response, status) => {
            if (status === 'OK' && response) {
              const result = response.rows[0].elements[0];
              if (result.status === 'OK') {
                resolve({
                  distance: result.distance.value,
                  duration: result.duration.value
                });
              } else {
                reject(new Error(`Could not calculate distance: ${result.status}`));
              }
            } else {
              reject(new Error(`Distance Matrix failed: ${status}`));
            }
          }
        );
      } catch (error) {
        reject(new Error(`Error initializing Distance Matrix: ${error.message}`));
      }
    });
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
};