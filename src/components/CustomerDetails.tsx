import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Customer } from '../types';
import '../App.css';

interface Props {
  customer: Customer | null;
}

interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
  };
  alt: string;
}

const CustomerDetails: React.FC<Props> = ({ customer }) => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState<boolean[]>([]);

  const fetchRandomPhotos = useCallback(async () => {
    if (!customer) return;

    try {
      const response = await axios.get('https://api.pexels.com/v1/curated', {
        params: {
          per_page: 9,
          page: Math.floor(Math.random() * 100) + 1
        },
        headers: {
          Authorization: '8goWzczeqpEdngxq5GUmPHYgSP4Z8q60lfwtZ7rCwaPlb0i0HgFR27eX'
        }
      });
      
      if (response.data && response.data.photos) {
        setPhotos(response.data.photos);
        setLoading(Array(response.data.photos.length).fill(false)); // Initialize loading states
      } else {
        console.error('Error fetching photos: Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }, [customer]);

  useEffect(() => {
    fetchRandomPhotos();
    const interval = setInterval(fetchRandomPhotos, 10000);
    return () => clearInterval(interval);
  }, [fetchRandomPhotos, customer]);

  // Effect to control the staggered loading of images
  useEffect(() => {
    if (photos.length > 0) {
      photos.forEach((_, index) => {
        setTimeout(() => {
          setLoading(prev => {
            const newLoading = [...prev];
            newLoading[index] = true;
            return newLoading;
          });
        }, index * 300); // 200ms delay for each image
      });
    }
  }, [photos]);

  if (!customer) {
    return <div>Select a customer to view details.</div>;
  }

  return (
    <div className="customer-details">
      <h2 className="mb-3">{customer.name}</h2>
      <p><strong>Title:</strong> {customer.company.catchPhrase}</p>
      <p><strong>Address:</strong> {`${customer.address.street}, ${customer.address.suite}, ${customer.address.city}, ${customer.address.zipcode}`}</p>
      <h3 className="mt-4 mb-3">Photos</h3>
      <div className="row">
        {photos.map((photo, index) => (
          <div key={photo.id} className="col-6 col-md-4 mb-3">
            <img
              src={photo.src.medium}
              alt={photo.alt || 'Random photo'}
              className={`img-fluid rounded ${loading[index] ? 'loaded' : 'loading'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
