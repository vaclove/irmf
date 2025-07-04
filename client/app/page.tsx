import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Mail, CheckCircle, Film, Star, Camera, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cinema-gradient">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/14725587/pexels-photo-14725587.jpeg?auto=compress&cs=tinysrgb&h=350')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-film-black/70 via-cinema-curtain/50 to-film-black/80" />
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Film className="h-12 w-12 text-vintage-gold animate-film-roll" />
                <h1 className="cinema-title animate-spotlight" data-macaly="main-title">
                  FILMOVÝ FESTIVAL
                </h1>
                <Camera className="h-12 w-12 text-cinema-red animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <p className="festival-subtitle" data-macaly="subtitle">
                  PRESTIŽNÍ KULTURNÍ UDÁLOST
                </p>
                <div className="flex items-center justify-center gap-3 text-vintage-cream">
                  <Star className="h-5 w-5 text-vintage-gold animate-pulse" />
                  <span className="font-classic text-lg">Světová kinematografie</span>
                  <Star className="h-5 w-5 text-vintage-gold animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Mission Statement */}
            <div className="max-w-3xl mx-auto">
              <p className="text-film-cream text-xl font-light leading-relaxed font-classic">
                Elegantní systém pro správu VIP hostů a pozvánek na prestižní 
                filmový festival. Kde se umění setkává s technologií.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vintage Film Strip Separator */}
      <div className="relative h-8 bg-gradient-to-r from-vintage-gold via-vintage-amber to-vintage-gold film-strip">
        <div className="absolute inset-0 flex items-center justify-center space-x-4">
          <div className="w-2 h-2 bg-film-black rounded-full"></div>
          <div className="w-2 h-2 bg-film-black rounded-full"></div>
          <div className="w-2 h-2 bg-film-black rounded-full"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="vintage-card group hover:red-carpet-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                CELKEM HOSTŮ
              </CardTitle>
              <Users className="h-5 w-5 text-vintage-gold group-hover:animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-vintage-gold mb-1">0</div>
              <p className="text-xs text-vintage-cream/80">Registrovaní hosté</p>
            </CardContent>
          </Card>

          <Card className="vintage-card group hover:film-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                AKTIVNÍ ROČNÍKY
              </CardTitle>
              <Calendar className="h-5 w-5 text-cinema-red group-hover:animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-cinema-red mb-1">0</div>
              <p className="text-xs text-vintage-cream/80">Festivalové ročníky</p>
            </CardContent>
          </Card>

          <Card className="vintage-card group hover:film-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                ODESLANÉ POZVÁNKY
              </CardTitle>
              <Mail className="h-5 w-5 text-vintage-amber group-hover:animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-vintage-amber mb-1">0</div>
              <p className="text-xs text-vintage-cream/80">Tento ročník</p>
            </CardContent>
          </Card>

          <Card className="vintage-card group hover:red-carpet-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                POTVRZENÉ ÚČASTI
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-vintage-gold group-hover:animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-vintage-gold mb-1">0</div>
              <p className="text-xs text-vintage-cream/80">Potvrzené návštěvy</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Image Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-cinema golden-text">Atmosféra festivalu</h2>
            <p className="text-vintage-cream font-classic text-lg leading-relaxed">
              Zažijte kouzlo filmového světa v jedinečné atmosféře prestižního 
              festivalu. Kombinujeme světovou kinematografii s elegantním 
              prostředím a moderními technologiemi.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/30335438/pexels-photo-30335438.jpeg?auto=compress&cs=tinysrgb&h=350" 
              alt="Vintage film projector" 
              className="w-full h-64 object-cover rounded-lg shadow-vintage hover:shadow-film transition-all duration-500"
              data-macaly="hero-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-film-black/50 to-transparent rounded-lg" />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="container mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cinema golden-text mb-4">SPRÁVA FESTIVALU</h2>
          <p className="text-vintage-cream font-classic text-lg">Přístup k hlavním funkcím systému</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="vintage-card group hover:red-carpet-glow">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-vintage-gold to-vintage-amber rounded-full flex items-center justify-center group-hover:animate-pulse shadow-vintage">
                <Users className="h-10 w-10 text-film-black" />
              </div>
              <CardTitle className="text-2xl font-cinema golden-text">
                SPRÁVA HOSTŮ
              </CardTitle>
              <CardDescription className="text-vintage-cream font-classic">
                Spravujte VIP hosty, režiséry a hosty festivalu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guests">
                <Button className="w-full cinema-button shimmer">
                  <Award className="h-4 w-4 mr-2" />
                  SPRAVOVAT HOSTY
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="vintage-card group hover:film-glow">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-cinema-red to-cinema-burgundy rounded-full flex items-center justify-center group-hover:animate-pulse shadow-cinema">
                <Calendar className="h-10 w-10 text-film-cream" />
              </div>
              <CardTitle className="text-2xl font-cinema golden-text">
                ROČNÍKY FESTIVALU
              </CardTitle>
              <CardDescription className="text-vintage-cream font-classic">
                Spravujte jednotlivé ročníky a jejich parametry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/editions">
                <Button className="w-full cinema-button shimmer">
                  <Film className="h-4 w-4 mr-2" />
                  SPRAVOVAT ROČNÍKY
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="vintage-card group hover:film-glow">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-vintage-amber to-vintage-bronze rounded-full flex items-center justify-center group-hover:animate-pulse shadow-vintage">
                <Mail className="h-10 w-10 text-film-black" />
              </div>
              <CardTitle className="text-2xl font-cinema golden-text">
                SYSTÉM POZVÁNEK
              </CardTitle>
              <CardDescription className="text-vintage-cream font-classic">
                Posílejte pozvánky a sledujte odpovědi hostů
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/invitations">
                <Button className="w-full cinema-button shimmer">
                  <Star className="h-4 w-4 mr-2" />
                  SPRAVOVAT POZVÁNKY
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vintage Theater Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/32791076/pexels-photo-32791076.jpeg?auto=compress&cs=tinysrgb&h=350" 
          alt="Vintage theater facade" 
          className="w-full h-full object-cover opacity-60"
          data-macaly="theater-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-film-black/50 to-transparent" />
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-vintage-gold font-cinema text-lg">
            "Kde se umění setkává s tradicí"
          </p>
        </div>
      </div>
    </div>
  );
}