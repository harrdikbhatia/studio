"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Slot {
  id: string;
  x: number;
  y: number;
  status: "available" | "occupied";
}

// Generate slots for Section A and Section B
const BASE_SLOTS: Omit<Slot, "status">[] = [
  // Section A: 10 slots
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `A${i + 1}`,
    x: (i % 5) * 65 + 15,
    y: Math.floor(i / 5) * 75 + 15,
  })),
  // Section B: 10 slots
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `B${i + 1}`,
    x: (i % 5) * 65 + 15,
    y: Math.floor(i / 5) * 75 + 195,
  })),
];

interface InteractiveMapProps {
  onSelectSlot?: (slotId: string) => void;
  selectedSlotId: string | null;
  isArrived?: boolean;
}

export function InteractiveMap({ onSelectSlot, selectedSlotId, isArrived = false }: InteractiveMapProps) {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    // Generate status randomly only on the client side after hydration
    const randomizedSlots: Slot[] = BASE_SLOTS.map((slot) => ({
      ...slot,
      status: Math.random() > 0.3 ? "available" : "occupied",
    }));
    setSlots(randomizedSlots);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] bg-muted/5 rounded-xl border-2 border-dashed border-muted flex items-center justify-center p-4">
      <svg
        viewBox="0 0 350 350"
        className="w-full h-full max-w-md drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Parking Lot Structure */}
        <rect x="0" y="0" width="350" height="350" fill="#f8fafc" rx="10" />
        
        {/* Central Driveway */}
        <rect x="0" y="160" width="350" height="30" fill="#e2e8f0" />
        
        {/* Entrance Marker */}
        <path d="M 340 160 L 350 175 L 340 190" fill="none" stroke="#94a3b8" strokeWidth="2" />

        {/* Section Labels */}
        <text x="5" y="12" fontSize="8" className="fill-muted-foreground font-bold uppercase tracking-widest">Section A</text>
        <text x="5" y="192" fontSize="8" className="fill-muted-foreground font-bold uppercase tracking-widest">Section B</text>

        {/* Slots */}
        {slots.length > 0 ? (
          slots.map((slot) => {
            const isTarget = selectedSlotId === slot.id;
            // If we have arrived, the target slot should appear occupied
            const isOccupied = slot.status === "occupied" || (isArrived && isTarget);
            // Only show as "selected/pulsing" if we haven't arrived yet
            const isSelected = !isArrived && isTarget;
            
            return (
              <g
                key={slot.id}
                onClick={() => !isOccupied && onSelectSlot?.(slot.id)}
                className={isOccupied ? "cursor-not-allowed" : "cursor-pointer"}
              >
                <rect
                  x={slot.x}
                  y={slot.y}
                  width="50"
                  height="60"
                  rx="4"
                  strokeWidth="2"
                  className={cn(
                    "transition-all duration-300",
                    isOccupied ? "parking-slot-occupied" : (isSelected ? "parking-slot-selected" : "parking-slot-available")
                  )}
                />
                <text
                  x={slot.x + 25}
                  y={slot.y + 35}
                  textAnchor="middle"
                  fontSize="10"
                  className={cn(
                    "font-bold select-none",
                    isSelected ? "fill-white" : (isOccupied ? "fill-muted-foreground/50" : "fill-primary")
                  )}
                >
                  {slot.id}
                </text>
              </g>
            );
          })
        ) : (
          /* Placeholder / Loading State for SSR */
          BASE_SLOTS.map((slot) => (
            <rect
              key={`placeholder-${slot.id}`}
              x={slot.x}
              y={slot.y}
              width="50"
              height="60"
              rx="4"
              className="fill-muted animate-pulse"
            />
          ))
        )}
      </svg>

      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/80 backdrop-blur p-2 rounded-lg border shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <div className="w-2 h-2 bg-accent rounded-sm" />
          <span>Your Route</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <div className="w-2 h-2 bg-accent/20 border border-accent rounded-sm" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <div className="w-2 h-2 bg-muted border border-muted-foreground rounded-sm" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}
