"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Download, Share2, Info, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ReservationDetail({ params }: { params: { id: string } }) {
  const [countdown, setCountdown] = useState(15 * 60);

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
            {/* Visual representation of a QR code using a placeholder or SVG */}
            <div className="relative w-64 h-64 bg-white p-4 rounded-xl border-2 border-primary mb-6 shadow-inner">
               <Image 
                src={`https://picsum.photos/seed/${params.id}/256/256`} 
                alt="QR Code" 
                width={256} 
                height={256}
                className="mix-blend-multiply opacity-90"
                data-ai-hint="qr code"
              />
              <div className="absolute inset-0 border-8 border-white pointer-events-none" />
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
              <span className="text-[10px] text-white/50 uppercase">Slot Number</span>
              <span className="font-bold text-xl">A12</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase">Level</span>
              <span className="font-bold text-xl">Basement 1</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>

        <Card className="bg-accent/5 border-none">
          <CardContent className="flex gap-3 py-4 items-start">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-accent">Gate Entry Logic</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Ensure your screen brightness is at maximum. Hold your phone 10-15cm away from the scanner.
                Need help? Press the intercom button at the kiosk.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}