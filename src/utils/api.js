import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYLOAD_API_URL
});

export async function fetchService(slug) {
  try {
    // Fetch all services first
    const allServices = await fetchServices();
    
    // Find the service with the matching slug
    const service = allServices.find(service => service.slug === slug);
    
    // If a service with the matching slug was not found, throw an error
    if (!service) throw new Error(`Service with slug ${slug} not found`);
    
    // Fetch the service based on the ID
    const response = await api.get(`/services/${service.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}

export async function fetchServices() {
    try {
      const response = await api.get('/services');
      // Access 'docs' property from the response
      return response.data.docs;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  }
  
