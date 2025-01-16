import React, { useState } from 'react';
import BookingStepOne from '../booking/BookingStepOne';
import BookingStepTwo from '../booking/BookingStepTwo';
import PaymentInfo from '../payment/PaymentInfo';
import { StepOneData, StepTwoData, BookingFormData } from '../../types/booking';
import { handleBookingSubmission } from '../../services/bookingService';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    pickupAddress: '',
    dropoffAddress: '',
    date: '',
    time: '',
    passengers: 1,
    priceEstimate: undefined
  });
  
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    fullName: '',
    phone: '',
    email: '',
    specialRequests: '',
    vehicleType: ''
  });

  const handleStepOneChange = (data: Partial<StepOneData>) => {
    setStepOneData(prev => ({ ...prev, ...data }));
  };

  const handleStepTwoChange = (data: Partial<StepTwoData>) => {
    setStepTwoData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    const formData: BookingFormData = {
      ...stepOneData,
      ...stepTwoData
    };

    try {
      await handleBookingSubmission(formData);
      alert('Thank you for your booking request! We will contact you shortly with an offer.');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {step === 1 ? (
        <BookingStepOne
          formData={stepOneData}
          onChange={handleStepOneChange}
          onNext={() => setStep(2)}
        />
      ) : (
        <>
          <BookingStepTwo
            formData={stepTwoData}
            locationData={{
              pickupAddress: stepOneData.pickupAddress,
              dropoffAddress: stepOneData.dropoffAddress,
              priceEstimate: stepOneData.priceEstimate
            }}
            passengers={stepOneData.passengers}
            onChange={handleStepTwoChange}
            onSubmit={handleSubmit}
            onBack={() => setStep(1)}
          />
          <PaymentInfo />
        </>
      )}
    </div>
  );
}