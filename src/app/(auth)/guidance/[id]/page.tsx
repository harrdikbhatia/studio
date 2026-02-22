"use client";

import React, { useEffect, useState, Suspense, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation, MapPin, Zap, ArrowUp, ArrowRight } from "lucide-react";
import { InteractiveMap } from "@/components/parking/interactive-map";
import { useSearchParams } from "next/navigation";

function GuidanceContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const slotId = searchParams.get("slot") || "A12";
  const [distance, setDistance] = useState(45);
  const [instruction, setInstruction] = useState("Drive forward 20 meters");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 2) {
          clearInterval(timer);
          setInstruction(`You have arrived! Park in Slot ${slotId}.`);
          setPhase(2);
          return 0;
        }
        if (prev < 25 && phase === 0) {
          setInstruction("Turn right at the end of the aisle");
          setPhase(1);
        }
        return prev - 1;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [phase, slotId]);

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Zap className="text-accent h-6 w-6 animate-pulse" />
            Live Sensor Guidance
          </h1>
          <p className="text-sm text-muted-foreground">Follow the floor sensors to your spot</p>
        </div>
        <Badge variant="outline" className="border-accent text-accent animate-pulse">
          Syncing with Level 1 Sensors
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Navigation HUD */}
        <Card className="lg:col-span-1 bg-primary text-white border-none shadow-2xl overflow-hidden flex flex-col justify-between">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-inner">
                {phase === 0 ? (
                  <ArrowUp className="h-7 w-7 text-white" />
                ) : phase === 1 ? (
                  <ArrowRight className="h-7 w-7 text-white" />
                ) : (
                  <MapPin className="h-7 w-7 text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Next Instruction</span>
                <span className="text-lg font-bold leading-tight">{instruction}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-4xl font-black font-mono">{distance}m</span>
                <span className="text-sm text-white/50">to Slot {slotId}</span>
              </div>
              <Progress value={((45 - distance) / 45) * 100} className="bg-white/10" />
            </div>
          </div>

          <div className="bg-white/5 p-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-bold uppercase tracking-wider">Aisle B Sensors</span>
              </div>
              <span className="text-xs text-white/50">100% Signal</span>
            </div>
          </div>
        </Card>

        {/* Live Map View */}
        <Card className="lg:col-span-2 shadow-sm relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white/90 text-primary hover:bg-white border-none shadow-sm flex gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
              Tracking Vehicle
            </Badge>
          </div>
          <CardContent className="p-4">
            <InteractiveMap 
              selectedSlotId={slotId} 
              onSelectSlot={() => {}} 
            />
          </CardContent>
        </Card>
      </div>

      {/* Sensor Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard 
          icon={<Zap className="h-4 w-4 text-accent" />} 
          title="Floor Sensors" 
          desc="Lighting the path every 2 meters" 
        />
        <InfoCard 
          icon={<Navigation className="h-4 w-4 text-accent" />} 
          title="Turn Signals" 
          desc="Directional indicators active" 
        />
        <InfoCard 
          icon={<MapPin className="h-4 w-4 text-accent" />} 
          title="Final Destination" 
          desc={`Slot ${slotId} reserved for check-in`} 
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, desc }: any) {
  return (
    <Card className="bg-muted/10 border-none">
      <CardContent className="p-4 flex gap-3">
        <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold">{title}</h4>
          <p className="text-[11px] text-muted-foreground">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SensorGuidancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading guidance...</div>}>
      <GuidanceContent id={id} />
    </Suspense>
  );
}
