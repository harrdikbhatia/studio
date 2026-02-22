import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, QrCode, ShieldCheck, Zap } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">ParkWise</span>
        </div>
        <Link href="/dashboard">
          <Button variant="default">Login</Button>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover brightness-[0.4]"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
          <div className="relative z-10 container mx-auto px-6 text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight font-headline">
              Revolutionizing Urban Mobility Through Smart Parking
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Eliminate the 30% traffic congestion caused by parking searches. 
              Pre-book your spot with QR-based instant access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto h-12 px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto h-12 px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-headline">Design-First Engineering</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built to address the core pain points of urban commuters through real-time technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <MapPin className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Predictability</h3>
                  <p className="text-sm text-muted-foreground">
                    Guaranteed spots identified by floor sensors as soon as you arrive.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <QrCode className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Contactless QR entry. No tickets, no paper. Just your phone and instant guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Total Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Integrated floor sensors confirm your vehicle's presence and security in real-time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">ParkWise</span>
            </div>
            <p className="text-sm text-gray-400">
              Transforming urban spaces into smart ecosystems.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>Smart Access</li>
              <li>Floor Guidance</li>
              <li>Facility Control</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>Help Center</li>
              <li>Security</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>About Us</li>
              <li>Research</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
