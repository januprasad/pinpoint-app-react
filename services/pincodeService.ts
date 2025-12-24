
import { PincodeApiResponse } from '../types';

export const fetchPincodeDetails = async (pincode: string): Promise<PincodeApiResponse[]> => {
  const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
