import React, { useEffect, useRef } from 'react';

interface LocationMapProps {
  pickupAddress: string;
  dropoffAddress: string;
  className?: string;
}

export default function LocationMap({ pickupAddress, dropoffAddress, className = '' }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      const { Map } = await google.maps.importLibrary('maps') as any;
      const { Geocoder } = await google.maps.importLibrary('geocoding') as any;
      
      const geocoder = new Geocoder();
      
      // Get coordinates for both addresses
      const [pickupResult, dropoffResult] = await Promise.all([
        geocoder.geocode({ address: pickupAddress }),
        geocoder.geocode({ address: dropoffAddress })
      ]);

      const pickupLocation = pickupResult.results[0].geometry.location;
      const dropoffLocation = dropoffResult.results[0].geometry.location;

      // Create map centered between the two points
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupLocation);
      bounds.extend(dropoffLocation);

      const map = new Map(mapRef.current, {
        zoom: 12,
        mapTypeId: 'roadmap',
      });

      map.fitBounds(bounds);

      // Add markers
      new google.maps.Marker({
        position: pickupLocation,
        map,
        title: 'Pick-up Location',
        label: 'A'
      });

      new google.maps.Marker({
        position: dropoffLocation,
        map,
        title: 'Drop-off Location',
        label: 'B'
      });

      // Draw route
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true
      });

      const request = {
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        }
      });
    };

    loadMap();
  }, [pickupAddress, dropoffAddress]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-64 rounded-lg shadow-md ${className}`}
    />
  );
}