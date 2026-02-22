"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, QrCode, Clock, Navigation } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const activeReservation = {
    id: "RES-4829",
    slot: "A12",
    location: "Downtown Plaza B1",
    timeRemaining: "15:24",
    status: "Active",
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-headline">Welcome back, John!</h1>
          <p className="text-muted-foreground">You have one active reservation.</p>
        </div>

        {/* Active Reservation Card */}
        <Card className="bg-primary text-white border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">Active Reservation</CardTitle>
                <CardDescription className="text-white/70">Arrive within the next 15 mins</CardDescription>
              </div>
              <Badge className="bg-accent hover:bg-accent text-white border-none">
                {activeReservation.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">{activeReservation.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm font-mono text-xl">{activeReservation.timeRemaining}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/reservation/${activeReservation.id}`} className="flex-1">
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  <QrCode className="mr-2 h-4 w-4" />
                  Show QR Code
                </Button>
              </Link>
              <Button variant="outline" className="text-white border-white hover:bg-white/10 flex-1">
                <Navigation className="mr-2 h-4 w-4" />
                Navigate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/map">
            <Card className="hover:bg-accent/5 cursor-pointer transition-colors border-dashed border-2">
              <CardContent className="flex items-center gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="text-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Book a New Spot</h3>
                  <p className="text-xs text-muted-foreground">Find real-time availability</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/predict">
            <Card className="hover:bg-primary/5 cursor-pointer transition-colors border-dashed border-2">
              <CardContent className="flex items-center gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Peak Hour Prediction</h3>
                  <p className="text-xs text-muted-foreground">Plan ahead with AI analysis</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent History */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold font-headline">Recent Activity</h2>
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-none">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <Clock className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Central Mall Garage</h4>
                    <p className="text-xs text-muted-foreground">Slot B4 • Oct {10 + i}, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">$12.50</p>
                  <Badge variant="outline" className="text-[10px] px-1 h-4">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="link" className="text-accent">View All History</Button>
        </div>
      </div>
    </div>
  );
}