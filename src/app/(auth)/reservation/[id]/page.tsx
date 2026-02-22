"use client";

import React, { useEffect, useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Info, CheckCircle2, QrCode, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NEAREST_SLOTS = [
  { id: "A12", distance: "15m", level: "L1", type: "Standard" },
  { id: "A15", distance: "22m", level: "L1", type: "EV Charging" },
  { id: "B04", distance: "45m", level: "L1", type: "Standard" },
];

export default function ReservationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [countdown, setCountdown] = useState(15 * 60);
  const [step, setStep] = useState<"qr" | "scanning" | "select">("qr");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const simulateGateScan = () => {
    setStep("scanning");
    setTimeout(() => {
      setStep("select");
    }, 1500);
  };

  const handleStartGuidance = () => {
    if (selectedSlot) {
      router.push(`/guidance/${id}?slot=${selectedSlot}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-xl">
      <Link href="/dashboard" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col gap-6">
        <div className="text-center">
          <Badge className="mb-2 bg-accent/10 text-accent border-none">
            {step === "select" ? "Spot Selection" : "Arrival Authorization"}
          </Badge>
          <h1 className="text-2xl font-bold font-headline">
            {step === "select" ? "Choose Your Spot" : "Gate Check-in"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === "select" 
              ? "Select one of the nearest available slots" 
              : "Scan this code at the entry gate to see available spots"}
          </p>
        </div>

        {step !== "select" ? (
          <Card className="border-2 border-accent/20 overflow-hidden shadow-xl">
            <CardHeader className="bg-muted/5 border-b text-center py-4">
              <CardTitle className="text-sm font-mono">{id}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-10">
              <div className="relative w-64 h-64 bg-white p-4 rounded-xl border-2 border-primary mb-6 shadow-inner group">
                <Image 
                  src={`https://picsum.photos/seed/${id}/256/256`} 
                  alt="QR Code" 
                  width={256} 
                  height={256}
                  className="mix-blend-multiply opacity-90 transition-transform group-hover:scale-105"
                  data-ai-hint="qr code"
                />
                <div className="absolute inset-0 border-8 border-white pointer-events-none" />
                {step === "scanning" && (
                  <div className="absolute inset-0 bg-accent/80 flex items-center justify-center animate-in fade-in duration-300">
                    <div className="text-center text-white">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-2 animate-bounce" />
                      <p className="font-bold">Gate Verified</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl font-mono font-bold text-primary tracking-widest">
                  {formatTime(countdown)}
                </span>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Auth Valid For</p>
              </div>
            </CardContent>
            <div className="bg-primary text-white p-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase">Location</span>
                <span className="font-bold text-lg">Downtown Plaza</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase">Status</span>
                <span className="font-bold text-lg">Awaiting Scan</span>
              </div>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {NEAREST_SLOTS.map((slot) => (
              <Card 
                key={slot.id} 
                onClick={() => setSelectedSlot(slot.id)}
                className={cn(
                  "cursor-pointer transition-all border-2",
                  selectedSlot === slot.id ? "border-accent bg-accent/5 ring-2 ring-accent/10" : "hover:border-accent/30"
                )}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl",
                      selectedSlot === slot.id ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {slot.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{slot.distance} away</span>
                        <Badge variant="outline" className="text-[10px] h-4 px-1">{slot.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{slot.level} • Section A</p>
                    </div>
                  </div>
                  {selectedSlot === slot.id && (
                    <CheckCircle2 className="text-accent h-6 w-6" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === "qr" && (
          <Button 
            onClick={simulateGateScan} 
            className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-lg"
          >
            <QrCode className="mr-2 h-5 w-5" />
            Simulate Gate Scan
          </Button>
        )}

        {step === "select" && (
          <Button 
            onClick={handleStartGuidance}
            disabled={!selectedSlot}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg group"
          >
            Start Sensor Guidance
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        )}

        <Card className="bg-accent/5 border-none">
          <CardContent className="flex gap-3 py-4 items-start">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-accent">Smart Slot Allocation</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {step === "select" 
                  ? "Select a spot to activate the floor sensors. They will guide your vehicle from the gate to the exact slot."
                  : "Scanning the QR code will reveal the nearest vacancies based on your current gate entrance."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
