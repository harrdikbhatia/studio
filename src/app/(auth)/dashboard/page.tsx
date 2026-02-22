"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  // In a real app, this would come from a database/state
  const activePass = {
    id: "PASS-7721",
    location: "Downtown Plaza Garage",
    status: "Ready for Entry",
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-headline">Hello, John!</h1>
          <p className="text-muted-foreground">Your smart parking session is ready.</p>
        </div>

        {/* Unified Access Pass Card */}
        <Card className="bg-primary text-white border-none shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
          
          <CardHeader className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Badge className="bg-accent hover:bg-accent text-white border-none mb-2">
                  Unified Access Pass
                </Badge>
                <CardTitle className="text-2xl font-bold">{activePass.location}</CardTitle>
                <CardDescription className="text-white/70">Scan at any entry gate to book and park</CardDescription>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                <QrCode className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6 pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Pass Identity</span>
                <span className="font-mono text-lg">{activePass.id}</span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">System Status</span>
                <span className="text-sm font-bold text-green-400 flex items-center gap-1 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {activePass.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link href={`/reservation/${activePass.id}`} className="w-full">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white h-14 text-lg font-bold shadow-lg shadow-accent/20">
                  <QrCode className="mr-2 h-5 w-5" />
                  Show QR & Book Spot
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI & Insights Section */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-muted/30 border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Smart Tip</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "Arriving between 10:00 AM and 11:30 AM usually yields the closest spots to the Level 1 elevators."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent History */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline">Recent Activity</h2>
            <Button variant="link" className="text-accent text-xs">View All</Button>
          </div>
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-none border-muted/50">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Clock className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Central Mall Garage</h4>
                    <p className="text-xs text-muted-foreground">Slot B{String(i * 2).padStart(2, '0')} • Oct {10 + i}, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">$12.50</p>
                  <Badge variant="outline" className="text-[10px] px-1 h-4">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
