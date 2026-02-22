"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Slot {
  id: string;
  x: number;
  y: number;
  status: "available" | "occupied";
}

const BASE_SLOTS: Omit<Slot, "status">[] = Array.from({ length: 20 }, (_, i) => ({
  id: `A${i + 1}`,
  x: (i % 5) * 60 + 20,
  y: Math.floor(i / 5) * 80 + 20,
}));

interface InteractiveMapProps {
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}

export function InteractiveMap({ onSelectSlot, selectedSlotId }: InteractiveMapProps) {
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
        
        {/* Driveways */}
        <rect x="0" y="100" width="350" height="40" fill="#e2e8f0" />
        <rect x="0" y="220" width="350" height="40" fill="#e2e8f0" />

        {/* Entrance Marker */}
        <path d="M 340 100 L 350 120 L 340 140" fill="none" stroke="#94a3b8" strokeWidth="2" />

        {/* Slots */}
        {slots.length > 0 ? (
          slots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;
            const isOccupied = slot.status === "occupied";
            
            return (
              <g
                key={slot.id}
                onClick={() => !isOccupied && onSelectSlot(slot.id)}
                className="cursor-pointer"
              >
                <rect
                  x={slot.x}
                  y={slot.y}
                  width="45"
                  height="65"
                  rx="4"
                  strokeWidth="2"
                  className={cn(
                    "transition-all duration-300",
                    isOccupied ? "parking-slot-occupied" : (isSelected ? "parking-slot-selected" : "parking-slot-available")
                  )}
                />
                <text
                  x={slot.x + 22.5}
                  y={slot.y + 40}
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
              width="45"
              height="65"
              rx="4"
              className="fill-muted animate-pulse"
            />
          ))
        )}
      </svg>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-accent rounded-sm" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-accent/20 border border-accent rounded-sm" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-muted border border-muted-foreground rounded-sm" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}
