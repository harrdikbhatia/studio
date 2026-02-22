"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { predictParkingSlots, type PredictParkingSlotsOutput } from "@/ai/flows/predict-parking-slots";

const HISTORICAL_DATA_MOCK = `
  Downtown Plaza experiences peak occupancy between 8 AM - 10 AM on weekdays. 
  Level 1 is typically 95% full by 8:30 AM. 
  Weekends show steady 60% occupancy with spikes during evening events. 
  Slots near the elevators (Section C) are the most competitive.
`;

export default function PredictionPage() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictParkingSlotsOutput | null>(null);
  const [form, setForm] = useState({
    destination: "Downtown Plaza",
    time: "Tomorrow at 9 AM",
  });

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictParkingSlots({
        destination: form.destination,
        desiredParkingTime: form.time,
        historicalDataSummary: HISTORICAL_DATA_MOCK,
      });
      setPrediction(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <BrainCircuit className="text-white h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold font-headline">AI Smart Planner</h1>
          </div>
          <p className="text-muted-foreground">
            Using Google Gemini to analyze historical trends and suggest the best parking strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Plan Your Visit</CardTitle>
              <CardDescription>Enter your destination and intended arrival time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="destination" 
                    className="pl-10" 
                    value={form.destination}
                    onChange={(e) => setForm({...form, destination: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Desired Time</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="time" 
                    className="pl-10" 
                    value={form.time}
                    onChange={(e) => setForm({...form, time: e.target.value})}
                  />
                </div>
              </div>
              <Button 
                onClick={handlePredict} 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Trends...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Prediction
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {prediction ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-accent bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase text-accent tracking-widest">Prediction Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-accent" /> Peak Hours
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prediction.predictedPeakHours}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-accent" /> Suggested Slots
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.suggestedSlots.map((slot, i) => (
                          <Badge key={i} variant="secondary" className="bg-white border-accent/20">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-accent" /> Recommendation
                      </h4>
                      <p className="text-sm italic text-muted-foreground">
                        "{prediction.recommendation}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-muted/5 border-2 border-dashed rounded-xl">
                <BrainCircuit className="h-12 w-12 text-muted-foreground/20 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Your AI-powered parking insights will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}