import emailjs from '@emailjs/browser';
import { BookingFormData } from '../types/booking';
import { PartnerFormData } from '../types/partner';
import { ContactFormData } from '../types/contact';

// EmailJS configuration
const EMAIL_SERVICE_ID = 'service_3r106zo';
const EMAIL_TEMPLATES = {
  BOOKING: 'template_fioe9zi',
  PARTNER: 'template_ohldd0v',
  CONTACT: 'template_fioe9zi'
};
const EMAIL_PUBLIC_KEY = 'Unuj1E45FQnI66OOZ';

// Initialize EmailJS
emailjs.init(EMAIL_PUBLIC_KEY);

export const sendBookingEmail = async (formData: BookingFormData): Promise<void> => {
  try {
    // Get vehicle name based on type
    const getVehicleName = (type: string) => {
      switch (type) {
        case 'standard': return 'Standard Car';
        case 'executive': return 'Executive Car';
        case 'van': return 'Van';
        case 'minibus': return 'Minibus';
        default: return 'Not selected';
      }
    };

    const templateParams = {
      to_email: 'info.rideconnect@gmail.com',
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.phone,
      pickup_address: formData.pickupAddress,
      dropoff_address: formData.dropoffAddress,
      date: formData.date,
      time: formData.time,
      passengers: formData.passengers,
      special_requests: formData.specialRequests,
      // Vehicle information
      vehicle_type: getVehicleName(formData.vehicleType),
      // Price information
      total_price: formData.priceEstimate ? `€${formData.priceEstimate.price}` : 'Not calculated',
      distance: formData.priceEstimate ? `${Math.round(formData.priceEstimate.distance)} km` : 'Not calculated',
      estimated_duration: formData.priceEstimate ? 
        `${Math.round(formData.priceEstimate.duration / 60)} minutes` : 'Not calculated',
      subject: `New Booking Request from ${formData.fullName} - ${getVehicleName(formData.vehicleType)} - €${formData.priceEstimate?.price || 'TBD'}`
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.BOOKING,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send booking email');
    }
  } catch (error) {
    console.error('Error sending booking email:', error);
    throw error;
  }
};

export const sendPartnerApplicationEmail = async (formData: PartnerFormData): Promise<void> => {
  try {
    const templateParams = {
      to_email: 'info.rideconnect@gmail.com',
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      company_name: formData.companyName,
      city: formData.city,
      company_address: formData.companyAddress,
      subject: `New Partner Application from ${formData.companyName}`
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.PARTNER,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send partner application email');
    }
  } catch (error) {
    console.error('Error sending partner application:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const templateParams = {
      to_email: 'info.rideconnect@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: `New Contact Message from ${formData.name}`,
      contact_type: 'Website Contact Form',
      timestamp: new Date().toLocaleString()
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATES.CONTACT,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send contact email');
    }
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};