import { BookingFormData } from '../types/booking';
import { sendBookingEmail } from './emailService';

export const handleBookingSubmission = async (formData: BookingFormData): Promise<void> => {
  try {
    // Send email notification
    await sendBookingEmail(formData);
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11499562386/DfgGCNq7q_wZEJLLtesq'
      });
    }
    
    console.log('Booking submitted:', formData);
  } catch (error) {
    console.error('Error handling booking submission:', error);
    throw error;
  }
};