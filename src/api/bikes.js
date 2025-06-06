// Mock data for bikes
const mockBikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    category: "cruiser",
    price: 195000,
    engine: 349,
    mileage: 35,
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The Royal Enfield Classic 350 is a modern classic motorcycle that combines timeless design with modern technology. Perfect for both city commuting and long rides.",
    features: [
      "Electric Start",
      "Disc Brakes",
      "LED Lighting",
      "Digital Console",
      "ABS"
    ],
    colors: ["Black", "Chrome", "Gunmetal Grey"],
    financeAvailable: true,
    contact: "+919876543210",
    location: "123 Main Street, Mumbai, India"
  },
  {
    id: 2,
    name: "KTM Duke 390",
    brand: "KTM",
    category: "naked",
    price: 320000,
    engine: 373,
    mileage: 30,
    images: [
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The KTM Duke 390 is a high-performance naked street bike known for its aggressive styling and powerful engine. Ideal for riders who want a sporty ride with everyday practicality.",
    features: [
      "Ride-by-Wire",
      "TFT Display",
      "Cornering ABS",
      "Traction Control",
      "Quick Shifter"
    ],
    colors: ["Orange", "Black", "White"],
    financeAvailable: true,
    contact: "+919876543211",
    location: "456 Park Avenue, Delhi, India"
  },
  {
    id: 3,
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    category: "sports",
    price: 145000,
    engine: 200,
    mileage: 40,
    images: [
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The Bajaj Pulsar NS200 is a sporty motorcycle that offers a perfect blend of performance and fuel efficiency. Great for young riders looking for an affordable sports bike.",
    features: [
      "Liquid Cooling",
      "Digital Console",
      "Nitrox Suspension",
      "Twin Spark Ignition",
      "LED Tail Lamp"
    ],
    colors: ["Red", "Blue", "Black"],
    financeAvailable: true,
    contact: "+919876543212",
    location: "789 MG Road, Bangalore, India"
  },
  {
    id: 4,
    name: "Honda CBR 650R",
    brand: "Honda",
    category: "sports",
    price: 850000,
    engine: 649,
    mileage: 25,
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The Honda CBR 650R is a premium sports bike that offers a perfect balance of performance and comfort. Perfect for both track days and long-distance touring.",
    features: [
      "Full LED Lighting",
      "TFT Display",
      "Honda Selectable Torque Control",
      "Assist & Slipper Clutch",
      "Dual Channel ABS"
    ],
    colors: ["Grand Prix Red", "Pearl Glare White", "Matte Black"],
    financeAvailable: true,
    contact: "+919876543213",
    location: "321 Marine Drive, Mumbai, India"
  },
  {
    id: 5,
    name: "Yamaha MT-15",
    brand: "Yamaha",
    category: "naked",
    price: 165000,
    engine: 155,
    mileage: 45,
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The Yamaha MT-15 is a compact naked streetfighter that packs a punch. With its aggressive styling and nimble handling, it's perfect for urban riding.",
    features: [
      "LED Headlight",
      "Digital Instrument Cluster",
      "Variable Valve Actuation",
      "Dual Channel ABS",
      "Slipper Clutch"
    ],
    colors: ["Dark Matte Blue", "Racing Blue", "Ice Fluo"],
    financeAvailable: true,
    contact: "+919876543214",
    location: "567 Connaught Place, Delhi, India"
  },
  {
    id: 6,
    name: "TVS Apache RTR 200 4V",
    brand: "TVS",
    category: "sports",
    price: 135000,
    engine: 197,
    mileage: 35,
    images: [
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The TVS Apache RTR 200 4V is a sporty motorcycle that offers excellent performance and handling. It's designed for riders who want a sporty ride with everyday practicality.",
    features: [
      "Race Tuned Engine",
      "Glide Through Technology",
      "Dual Channel ABS",
      "Race Tuned Suspension",
      "Digital Console"
    ],
    colors: ["Red", "Blue", "Black"],
    financeAvailable: true,
    contact: "+919876543215",
    location: "890 Brigade Road, Bangalore, India"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all bikes
export const getBikes = async () => {
  await delay(500); // Simulate network delay
  return mockBikes;
};

// Get bike by ID
export const getBikeById = async (id) => {
  await delay(300); // Simulate network delay
  const bike = mockBikes.find(bike => bike.id === parseInt(id));
  if (!bike) {
    throw new Error('Bike not found');
  }
  return bike;
};

// Search bikes
export const searchBikes = async (query) => {
  await delay(400); // Simulate network delay
  const searchTerm = query.toLowerCase();
  return mockBikes.filter(bike => 
    bike.name.toLowerCase().includes(searchTerm) ||
    bike.brand.toLowerCase().includes(searchTerm) ||
    bike.category.toLowerCase().includes(searchTerm)
  );
}; 