"use client";

import React, { useState } from "react";
import { InteractiveMap } from "@/components/parking/interactive-map";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function MapPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleBooking = () => {
    if (!selectedSlot) return;
    toast({
      title: "Reservation successful!",
      description: `Slot ${selectedSlot} has been reserved for you.`,
    });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold font-headline">Find a Spot</h1>
            <p className="text-muted-foreground">Real-time availability at Downtown Plaza</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 h-12 bg-white" placeholder="Search another facility..." />
          </div>

          <InteractiveMap 
            selectedSlotId={selectedSlot} 
            onSelectSlot={setSelectedSlot} 
          />
        </div>

        <div className="space-y-6">
          {selectedSlot ? (
            <Card className="border-accent ring-2 ring-accent/20 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  Slot {selectedSlot} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Rate:</span>
                  <span className="font-bold">$2.50 / hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-bold">Level 1, Section A</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-bold">Standard</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    * Booking guarantees access for 15 minutes prior to arrival.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleBooking} className="w-full bg-accent hover:bg-accent/90">
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-muted/10 border-dashed border-2 flex items-center justify-center py-20 sticky top-24">
              <CardContent className="text-center">
                <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Select a slot on the map<br/>to see details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}