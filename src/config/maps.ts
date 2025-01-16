// Google Maps configuration
export const GOOGLE_MAPS_CONFIG = {
  apiKey: 'AIzaSyBlS3XPCgw7mXa7Rc85AEfUDFCAcJtRpJM',
  options: {
    componentRestrictions: { 
      country: ['si', 'hr', 'it', 'at']
    },
    fields: ['formatted_address', 'geometry', 'name'],
    types: ['establishment', 'geocode']
  }
};