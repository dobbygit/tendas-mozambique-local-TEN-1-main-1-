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
  // For now, we'll return hardcoded data

  return [
    {
      id: 1,
      name: "Event Tent (Large)",
      description:
        "Spacious tent perfect for weddings, corporate events, and large gatherings. Includes setup and takedown.",
      image:
        "https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80",
      dailyRate: "$250",
      weeklyRate: "$1,200",
      deposit: "$500",
      category: "tents",
      available: true,
    },
    {
      id: 2,
      name: "Family Camping Tent",
      description:
        "Comfortable 6-person tent with weather-resistant materials, perfect for family camping trips.",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      dailyRate: "$45",
      weeklyRate: "$225",
      deposit: "$100",
      category: "tents",
      available: true,
    },
    {
      id: 3,
      name: "Car Shade Port",
      description:
        "Durable shade structure to protect vehicles from sun and weather. Easy to install and highly portable.",
      image:
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80",
      dailyRate: "$35",
      weeklyRate: "$175",
      deposit: "$75",
      category: "shade",
      available: true,
    },
    {
      id: 4,
      name: "Heavy-Duty Tarpaulin",
      description:
        "Waterproof PVC tarpaulin for various outdoor applications. Multiple sizes available.",
      image:
        "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=800&q=80",
      dailyRate: "$15",
      weeklyRate: "$75",
      deposit: "$30",
      category: "covers",
      available: true,
    },
    {
      id: 5,
      name: "Retractable Awning",
      description:
        "Stylish and functional awning for residential and commercial spaces. Professional installation included.",
      image:
        "https://images.unsplash.com/photo-1595111633191-7a8c1b16c722?w=800&q=80",
      dailyRate: "$60",
      weeklyRate: "$300",
      deposit: "$150",
      category: "shade",
      available: true,
    },
    {
      id: 6,
      name: "Market Stall Tent",
      description:
        "Compact and easy-to-setup tent perfect for market stalls, small events, and outdoor displays.",
      image:
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
      dailyRate: "$40",
      weeklyRate: "$200",
      deposit: "$80",
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
