import { calculateDistance } from './mapsService';

// Base rates per vehicle type (in EUR)
const BASE_RATES = {
  standard: { base: 40, perKm: 1.8, maxPassengers: 4 },
  executive: { base: 60, perKm: 2.2, maxPassengers: 3 },
  van: { base: 80, perKm: 2.5, maxPassengers: 8 },
  minibus: { base: 100, perKm: 3.0, maxPassengers: 16 }
};

// Airport and port surcharges
const LOCATION_SURCHARGES = {
  airport: 15, // Extra for airport pickups
  port: 20     // Extra for port pickups
};

const getVehicleType = (passengers: number) => {
  if (passengers <= 3) return 'standard';
  if (passengers <= 4) return 'executive';
  if (passengers <= 8) return 'van';
  if (passengers <= 16) return 'minibus';
  return 'custom';
};

export const calculatePrice = async (
  pickupAddress: string,
  dropoffAddress: string,
  passengers: number = 1,
  vehicleType?: string
): Promise<{
  price: number;
  distance: number;
  duration: number;
  isCustomQuote: boolean;
}> => {
  try {
    // Input validation
    if (!pickupAddress || !dropoffAddress) {
      throw new Error('Both pickup and dropoff addresses are required');
    }

    if (passengers < 1) {
      throw new Error('Number of passengers must be at least 1');
    }

    // For groups larger than 16, return special handling
    if (passengers > 16) {
      const { distance, duration } = await calculateDistance(pickupAddress, dropoffAddress);
      return {
        price: 0,
        distance: distance / 1000,
        duration,
        isCustomQuote: true
      };
    }

    // Calculate distance and duration
    const { distance, duration } = await calculateDistance(pickupAddress, dropoffAddress);
    
    // Convert distance to kilometers
    const distanceInKm = distance / 1000;
    
    // Get appropriate vehicle type based on passengers or use provided type
    const selectedVehicleType = vehicleType || getVehicleType(passengers);
    const rate = BASE_RATES[selectedVehicleType as keyof typeof BASE_RATES];
    
    if (!rate) {
      throw new Error(`Invalid vehicle type: ${selectedVehicleType}`);
    }

    // Validate passenger count for vehicle type
    if (passengers > rate.maxPassengers) {
      throw new Error(`Too many passengers (${passengers}) for ${selectedVehicleType} (max: ${rate.maxPassengers})`);
    }
    
    // Calculate base price
    let price = rate.base + (distanceInKm * rate.perKm);
    
    // Add surcharges for airports/ports
    const isAirport = /airport|aeroporto|letališče|flughafen/i.test(pickupAddress);
    const isPort = /port|porto|luka|hafen/i.test(pickupAddress);
    
    if (isAirport) price += LOCATION_SURCHARGES.airport;
    if (isPort) price += LOCATION_SURCHARGES.port;
    
    // Round to nearest euro
    price = Math.ceil(price);
    
    return {
      price,
      distance: distanceInKm,
      duration,
      isCustomQuote: false
    };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};