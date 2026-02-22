
"use client";

import React, { useState } from "react";
import { InteractiveMap } from "@/components/parking/interactive-map";
import { GoogleMapView } from "@/components/parking/google-map-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Info, Map as MapIcon, Grid3X3 } from "lucide-react";
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
            <h1 className="text-3xl font-bold font-headline text-primary">Find a Spot</h1>
            <p className="text-muted-foreground">Real-time availability at Downtown Plaza and nearby facilities</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10 h-12 bg-white border-muted shadow-sm" placeholder="Search another facility or city area..." />
          </div>

          <Tabs defaultValue="facility" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="facility" className="flex gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Facility View
                </TabsTrigger>
                <TabsTrigger value="city" className="flex gap-2">
                  <MapIcon className="h-4 w-4" />
                  City Map
                </TabsTrigger>
              </TabsList>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest hidden sm:block">
                Downtown Plaza Garage
              </div>
            </div>
            
            <TabsContent value="facility" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <InteractiveMap 
                selectedSlotId={selectedSlot} 
                onSelectSlot={setSelectedSlot} 
              />
            </TabsContent>
            
            <TabsContent value="city" className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <GoogleMapView />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {selectedSlot ? (
            <Card className="border-accent ring-2 ring-accent/20 sticky top-24 shadow-xl">
              <CardHeader className="bg-accent/5 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                    <Info className="h-4 w-4" />
                  </div>
                  Slot {selectedSlot} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Rate:</span>
                  <span className="font-bold text-primary">$2.50 / hr</span>
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
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    * Booking guarantees access for 15 minutes prior to your arrival time.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pb-6">
                <Button onClick={handleBooking} className="w-full bg-accent hover:bg-accent/90 h-11 text-white font-bold">
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-muted/10 border-dashed border-2 flex items-center justify-center py-20 sticky top-24">
              <CardContent className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-muted">
                  <MapPin className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Select a slot on the Facility Map<br/>to proceed with booking.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
