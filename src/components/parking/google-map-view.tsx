
"use client";

import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const parkingLocations = [
  { id: 1, name: 'Downtown Plaza Garage', lat: 37.7749, lng: -122.4194, availability: '74%' },
  { id: 2, name: 'Central Mall Parking', lat: 37.7849, lng: -122.4094, availability: '12%' },
  { id: 3, name: 'West Side Lot', lat: 37.7649, lng: -122.4294, availability: '95%' },
];

export function GoogleMapView() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" // Users will need to provide their own key for production
  });

  const options = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  }), []);

  if (!isLoaded) {
    return (
      <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden border">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <p className="text-sm font-medium text-muted-foreground">Loading interactive city map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden border shadow-sm group">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={options}
      >
        {parkingLocations.map(loc => (
          <Marker 
            key={loc.id} 
            position={{ lat: loc.lat, lng: loc.lng }} 
            title={`${loc.name} (${loc.availability} full)`}
          />
        ))}
      </GoogleMap>
      
      {/* Overlay info if no API key is provided - visually useful for prototyping */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        <Card className="bg-white/90 backdrop-blur p-3 shadow-lg pointer-events-auto border-accent/20">
          <p className="text-xs font-bold text-accent mb-1 uppercase tracking-wider">Map Legend</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Marker: Garage Location</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic">
              Tap markers to see real-time capacity and rates.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
