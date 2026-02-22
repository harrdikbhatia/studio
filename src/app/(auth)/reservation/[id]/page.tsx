"use client";

import React, { useEffect, useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Info, CheckCircle2, QrCode, ArrowRight, Zap, MapPin } from "lucide-react";
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
      <Link href="/dashboard" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mb-6 group transition-colors">
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
      </Link>

      <div className="flex flex-col gap-6">
        <div className="text-center space-y-2">
          <Badge className="bg-accent/10 text-accent border-none animate-pulse">
            {step === "select" ? "Spot Selection" : "Garage Check-in Pass"}
          </Badge>
          <h1 className="text-3xl font-bold font-headline">
            {step === "select" ? "Find Your Vacancy" : "Smart Access Entry"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {step === "select" 
              ? "Scanning was successful. Choose one of the nearest available spots to start floor guidance." 
              : "Scan this QR code at the entrance to see real-time available spots near you."}
          </p>
        </div>

        {step !== "select" ? (
          <Card className="border-none shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
            <CardHeader className="bg-primary text-white text-center py-4 border-b border-primary-foreground/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="h-3 w-3 text-accent fill-accent" />
                <CardTitle className="text-xs font-mono uppercase tracking-widest">{id}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-10">
              <div className="relative w-64 h-64 bg-white p-6 rounded-3xl border-4 border-primary mb-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] group transition-all duration-500 hover:scale-[1.02]">
                <Image 
                  src={`https://picsum.photos/seed/${id}/256/256`} 
                  alt="QR Code" 
                  width={256} 
                  height={256}
                  className="mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100"
                  data-ai-hint="qr code"
                />
                <div className="absolute inset-0 border-8 border-white rounded-2xl pointer-events-none" />
                {step === "scanning" && (
                  <div className="absolute inset-0 bg-accent/90 flex items-center justify-center animate-in fade-in zoom-in duration-300 rounded-2xl">
                    <div className="text-center text-white scale-110">
                      <CheckCircle2 className="h-16 w-16 mx-auto mb-3 animate-bounce" />
                      <p className="font-bold text-xl">Entry Authorized</p>
                      <p className="text-xs text-white/70">Scanning vacancy sensors...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl font-mono font-black text-primary tracking-[0.2em]">
                  {formatTime(countdown)}
                </span>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Entry Window Closes In</p>
              </div>
            </CardContent>
            <div className="bg-muted p-6 grid grid-cols-2 gap-4 border-t border-muted-foreground/10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Facility</span>
                <span className="font-bold text-lg leading-tight">Downtown Plaza Garage</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Pass Status</span>
                <span className="font-bold text-lg text-accent">Active Now</span>
              </div>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Nearby Vacancies
              </h2>
              <Badge variant="outline" className="text-[10px] font-bold">L1 SECTION A</Badge>
            </div>
            {NEAREST_SLOTS.map((slot) => (
              <Card 
                key={slot.id} 
                onClick={() => setSelectedSlot(slot.id)}
                className={cn(
                  "cursor-pointer transition-all border-2 duration-300",
                  selectedSlot === slot.id ? "border-accent bg-accent/5 ring-4 ring-accent/10 scale-[1.02]" : "hover:border-accent/40 bg-white"
                )}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-colors",
                      selectedSlot === slot.id ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {slot.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-xl">{slot.distance} away</span>
                        <Badge variant="outline" className="text-[10px] font-bold h-5 px-2 bg-white">{slot.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{slot.level} • NORTH SECTION</p>
                    </div>
                  </div>
                  {selectedSlot === slot.id && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-in zoom-in">
                      <CheckCircle2 className="text-white h-5 w-5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === "qr" && (
          <Button 
            onClick={simulateGateScan} 
            className="w-full h-16 bg-accent hover:bg-accent/90 text-white font-black text-xl shadow-2xl shadow-accent/40 rounded-2xl transform active:scale-95 transition-transform"
          >
            <QrCode className="mr-3 h-6 w-6" />
            SIMULATE GATE SCAN
          </Button>
        )}

        {step === "select" && (
          <Button 
            onClick={handleStartGuidance}
            disabled={!selectedSlot}
            className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-2xl shadow-primary/20 rounded-2xl group transform active:scale-95 transition-transform"
          >
            CONFIRM & START GUIDANCE
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Button>
        )}

        <Card className="bg-primary/5 border-none shadow-none rounded-2xl">
          <CardContent className="flex gap-4 py-6 items-start">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Info className="h-5 w-5 text-primary shrink-0" />
            </div>
            <div className="space-y-1">
              <p className="font-black text-xs uppercase tracking-widest text-primary/80">Smart Allocation Insight</p>
              <p className="text-muted-foreground text-[11px] font-medium leading-relaxed">
                {step === "select" 
                  ? "Your selection activates the intelligent floor sensor grid. Follow the pulsating ground lights directly from the gate to your spot."
                  : "Scanning your Access Pass authorizes entry and performs a sub-second scan of the garage floor sensors to identify your best spots."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
