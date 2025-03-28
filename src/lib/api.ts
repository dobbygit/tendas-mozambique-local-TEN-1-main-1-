// This file contains API functions for the rental system

export interface RentalRequest {
  rentalType: string;
  duration: string;
  phoneNumber: string;
  email?: string;
  name?: string;
  startDate?: string;
  additionalNotes?: string;
}

/**
 * Submit a rental request to the backend
 */
export async function submitRentalRequest(
  data: RentalRequest,
): Promise<{ success: boolean; message: string }> {
  // In a real implementation, this would make an actual API call
  // For now, we'll simulate a successful response after a delay

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          message: "Rental request submitted successfully",
        });
      } else {
        reject(new Error("Network error"));
      }
    }, 1500);
  });
}

/**
 * Get available rental items from the backend
 */
export async function getAvailableRentalItems() {
  // In a real implementation, this would fetch data from an API
  // For now, we'll return hardcoded data with only the two specified products

  return [
    {
      id: 1,
      name: "18x9 200man Marquee tent",
      description:
        "Spacious marquee tent perfect for large events, weddings, and corporate gatherings. Accommodates up to 200 people with professional setup and takedown included.",
      image:
        "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80",
      dailyRate: "$350",
      weeklyRate: "$1,800",
      deposit: "$700",
      category: "tents",
      available: true,
    },
    {
      id: 2,
      name: "5x5 event tents",
      description:
        "Versatile 5x5 meter event tents ideal for smaller gatherings, market stalls, and outdoor displays. Easy to set up and transport.",
      image:
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
      dailyRate: "$120",
      weeklyRate: "$600",
      deposit: "$250",
      category: "tents",
      available: true,
    },
  ];
}

/**
 * Check availability for a specific rental item
 */
export async function checkRentalAvailability(
  itemId: number,
  startDate: string,
  endDate: string,
) {
  // In a real implementation, this would check against a database
  return { available: true };
}
