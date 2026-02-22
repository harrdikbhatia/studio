"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Slot {
  id: string;
  x: number;
  y: number;
  status: "available" | "occupied";
}

// Generate 20 slots for Section A and 20 for Section B
// IDs are formatted as A01, A02... B01, B02... for consistent matching
const BASE_SLOTS: Omit<Slot, "status">[] = [
  // Section A: Slots A01 - A20
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `A${String(i + 1).padStart(2, "0")}`,
    x: (i % 5) * 65 + 25,
    y: Math.floor(i / 5) * 55 + 25,
  })),
  // Section B: Slots B01 - B20
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `B${String(i + 1).padStart(2, "0")}`,
    x: (i % 5) * 65 + 25,
    y: Math.floor(i / 5) * 55 + 285,
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
    // Generate status randomly on mount to simulate real sensor data
    const randomizedSlots: Slot[] = BASE_SLOTS.map((slot) => ({
      ...slot,
      // Randomly assign some slots as occupied, keeping target available initially
      status: Math.random() > 0.3 ? "available" : "occupied",
    }));
    setSlots(randomizedSlots);
  }, []);

  return (
    <div className="relative w-full aspect-[35/55] bg-muted/5 rounded-xl border-2 border-dashed border-muted flex items-center justify-center p-4 overflow-hidden">
      <svg
        viewBox="0 0 350 550"
        className="w-full h-full max-w-md drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="0" y="0" width="350" height="550" fill="#f8fafc" rx="10" />
        <rect x="0" y="245" width="350" height="35" fill="#e2e8f0" />
        <path d="M 340 245 L 350 262 L 340 280" fill="none" stroke="#94a3b8" strokeWidth="2" />

        <text x="10" y="15" fontSize="10" className="fill-muted-foreground font-bold uppercase tracking-widest">Section A (L1 North)</text>
        <text x="10" y="278" fontSize="10" className="fill-muted-foreground font-bold uppercase tracking-widest">Section B (L1 South)</text>

        {slots.length > 0 ? (
          slots.map((slot) => {
            const isTarget = selectedSlotId?.trim().toUpperCase() === slot.id.toUpperCase();
            const isParked = isArrived && isTarget;
            const isOccupied = slot.status === "occupied";
            const isSelected = !isArrived && isTarget;
            
            return (
              <g
                key={slot.id}
                onClick={() => !isOccupied && onSelectSlot?.(slot.id)}
                className={isOccupied && !isTarget ? "cursor-not-allowed" : "cursor-pointer"}
              >
                <rect
                  x={slot.x}
                  y={slot.y}
                  width="50"
                  height="45"
                  rx="4"
                  strokeWidth="2"
                  className={cn(
                    "transition-all duration-500",
                    isParked ? "parking-slot-occupied" : 
                    isSelected ? "parking-slot-selected" : 
                    isOccupied ? "parking-slot-occupied" : "parking-slot-available"
                  )}
                />
                <text
                  x={slot.x + 25}
                  y={slot.y + 28}
                  textAnchor="middle"
                  fontSize="12"
                  className={cn(
                    "font-bold select-none transition-colors duration-500",
                    isParked || isOccupied ? "fill-muted-foreground/50" : (isSelected ? "fill-white" : "fill-primary")
                  )}
                >
                  {slot.id}
                </text>
              </g>
            );
          })
        ) : (
          BASE_SLOTS.map((slot) => (
            <rect
              key={`placeholder-${slot.id}`}
              x={slot.x}
              y={slot.y}
              width="50"
              height="45"
              rx="4"
              className="fill-muted animate-pulse"
            />
          ))
        )}
      </svg>

      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/80 backdrop-blur p-2 rounded-lg border shadow-sm z-10">
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <div className="w-2 h-2 bg-accent rounded-sm" />
          <span>Navigating</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <div className="w-2 h-2 bg-muted border border-muted-foreground rounded-sm" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}
