"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Map as MapIcon, 
  Zap, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from "recharts";

const REVENUE_DATA = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 9800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3800 },
  { name: "Sun", value: 4300 },
];

const OCCUPANCY_DATA = [
  { name: "Section A", value: 85, color: "#1ABC9C" },
  { name: "Section B", value: 42, color: "#34495E" },
  { name: "Section C", value: 98, color: "#e11d48" },
  { name: "Section D", value: 30, color: "#1ABC9C" },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold font-headline">Facility Command Center</h1>
            <p className="text-muted-foreground">Real-time oversight of Downtown Plaza Garage</p>
          </div>
          <Badge variant="outline" className="flex gap-2 items-center px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live System Status
          </Badge>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Active Users" 
            value="1,284" 
            change="+12%" 
            trend="up"
            icon={<Users className="text-primary" />} 
          />
          <StatCard 
            title="Occupancy" 
            value="74%" 
            change="-5%" 
            trend="down"
            icon={<MapIcon className="text-accent" />} 
          />
          <StatCard 
            title="Daily Revenue" 
            value="$4,290" 
            change="+18%" 
            trend="up"
            icon={<TrendingUp className="text-green-600" />} 
          />
          <StatCard 
            title="IoT Gateways" 
            value="12/12" 
            change="Online" 
            trend="neutral"
            icon={<Zap className="text-orange-500" />} 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Revenue Analytics</CardTitle>
              <CardDescription>Transactional volume by day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#34495E", color: "#fff", border: "none", borderRadius: "8px" }}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Bar dataKey="value" fill="#1ABC9C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Section Heatmap Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Section Load Distribution</CardTitle>
              <CardDescription>Current occupancy % across zones</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={OCCUPANCY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ backgroundColor: "#34495E", color: "#fff", border: "none", borderRadius: "8px" }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {OCCUPANCY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold font-headline">Recent System Alerts</h2>
          <Card className="border-red-100 bg-red-50/30">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-500 h-5 w-5" />
                <span className="text-sm font-medium">Critical Alert: Slot C12 sensor reporting anomalous data.</span>
              </div>
              <Badge variant="destructive">Needs Attention</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon }: any) {
  return (
    <Card className="shadow-sm border-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-muted/20 rounded-lg">{icon}</div>
          <div className={`flex items-center text-xs font-bold ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-accent'
          }`}>
            {change}
            {trend === 'up' && <ArrowUpRight className="h-3 w-3 ml-0.5" />}
            {trend === 'down' && <ArrowDownRight className="h-3 w-3 ml-0.5" />}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tracking-tight">{value}</span>
          <span className="text-xs text-muted-foreground">{title}</span>
        </div>
      </CardContent>
    </Card>
  );
}