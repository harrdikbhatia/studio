
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Info, Navigation, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReservationDetail({ params }: { params: { id: string } }) {
  const [countdown, setCountdown] = useState(15 * 60);
  const [isScanning, setIsScanning] = useState(false);
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
    setIsScanning(true);
    setTimeout(() => {
      router.push(`/guidance/${params.id}`);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-xl">
      <Link href="/dashboard" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col gap-6">
        <div className="text-center">
          <Badge className="mb-2 bg-accent/10 text-accent border-none">Active Booking</Badge>
          <h1 className="text-2xl font-bold font-headline">Arrival Authorization</h1>
          <p className="text-sm text-muted-foreground">Scan this code at the entry gate</p>
        </div>

        <Card className="border-2 border-accent/20 overflow-hidden shadow-xl">
          <CardHeader className="bg-muted/5 border-b text-center py-4">
            <CardTitle className="text-sm font-mono">{params.id}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <div className="relative w-64 h-64 bg-white p-4 rounded-xl border-2 border-primary mb-6 shadow-inner group">
              <Image 
                src={`https://picsum.photos/seed/${params.id}/256/256`} 
                alt="QR Code" 
                width={256} 
                height={256}
                className="mix-blend-multiply opacity-90 transition-transform group-hover:scale-105"
                data-ai-hint="qr code"
              />
              <div className="absolute inset-0 border-8 border-white pointer-events-none" />
              {isScanning && (
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
              <span className="text-[10px] text-white/50 uppercase">Assigned Slot</span>
              <span className="font-bold text-xl">A12</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase">Guidance System</span>
              <span className="font-bold text-xl">Active</span>
            </div>
          </div>
        </Card>

        <Button 
          onClick={simulateGateScan} 
          disabled={isScanning}
          className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-lg"
        >
          {isScanning ? "Processing..." : (
            <>
              <QrCode className="mr-2 h-5 w-5" />
              Simulate Gate Scan
            </>
          )}
        </Button>

        <Card className="bg-accent/5 border-none">
          <CardContent className="flex gap-3 py-4 items-start">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-accent">Sensor Sync Activated</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Once scanned, your dashboard will transition to <b>Live Sensor Guidance</b>.
                Sensors in the garage floor will light up to lead you directly to Slot A12.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
