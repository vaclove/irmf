'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Building, Phone, Search, Plus, ArrowLeft, Star, Award, Camera } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { apiRequest } from '@/lib/api-config';

interface Guest {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  company?: string;
  note?: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGuest, setNewGuest] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    company: '',
    note: '',
    language: 'czech'
  });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      console.log('Fetching guests...');
      const response = await apiRequest('/api/guests');
      console.log('Guests response:', response);
      setGuests(response);
    } catch (error) {
      console.error('Error fetching guests:', error);
      toast.error('Nepodařilo se načíst hosty');
    } finally {
      setLoading(false);
    }
  };

  const addGuest = async () => {
    try {
      console.log('Adding guest:', newGuest);
      const response = await apiRequest('/api/guests', {
        method: 'POST',
        body: JSON.stringify(newGuest)
      });
      console.log('Add guest response:', response);
      
      setGuests([...guests, response]);
      setNewGuest({
        name: '',
        surname: '',
        email: '',
        phone: '',
        company: '',
        note: '',
        language: 'czech'
      });
      toast.success('Host byl úspěšně přidán');
    } catch (error) {
      console.error('Error adding guest:', error);
      toast.error('Nepodařilo se přidat hosta');
    }
  };

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (guest.company && guest.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-cinema-gradient">
      {/* Header with vintage film strip */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/7991118/pexels-photo-7991118.jpeg?auto=compress&cs=tinysrgb&h=350')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-film-black/80 to-film-black/60" />
        
        <div className="relative container mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="inline-flex items-center text-vintage-gold hover:text-vintage-amber transition-colors mb-4 font-classic">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="font-vintage tracking-wide">ZPĚT NA HLAVNÍ STRÁNKU</span>
              </Link>
              <h1 className="text-5xl font-cinema golden-text mb-4" data-macaly="page-title">
                SPRÁVA HOSTŮ
              </h1>
              <p className="text-vintage-cream font-classic text-lg" data-macaly="page-description">
                VIP hosté, režiséři a osobnosti festivalu
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6 text-cinema-red animate-pulse" />
              <Star className="h-6 w-6 text-vintage-gold animate-pulse" />
              <Award className="h-6 w-6 text-vintage-amber animate-pulse" />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cinema-button shimmer">
                  <Plus className="h-4 w-4 mr-2" />
                  PŘIDAT NOVÉHO HOSTA
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-film-dark to-film-brown border-vintage-gold/30 text-vintage-cream max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-cinema golden-text">Registrace nového hosta</DialogTitle>
                  <DialogDescription className="text-vintage-cream/80 font-classic">
                    Přidejte nového VIP hosta do systému festivalu
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-vintage-gold font-vintage tracking-wide">JMÉNO</Label>
                      <Input
                        id="name"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                        className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream focus:border-vintage-gold"
                        placeholder="Zadejte jméno"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-vintage-gold font-vintage tracking-wide">PŘÍJMENÍ</Label>
                      <Input
                        id="surname"
                        value={newGuest.surname}
                        onChange={(e) => setNewGuest({...newGuest, surname: e.target.value})}
                        className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream focus:border-vintage-gold"
                        placeholder="Zadejte příjmení"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-vintage-gold font-vintage tracking-wide">EMAIL</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newGuest.email}
                      onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                      className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream focus:border-vintage-gold"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-vintage-gold font-vintage tracking-wide">TELEFON</Label>
                      <Input
                        id="phone"
                        value={newGuest.phone}
                        onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                        className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream focus:border-vintage-gold"
                        placeholder="+420 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-vintage-gold font-vintage tracking-wide">SPOLEČNOST</Label>
                      <Input
                        id="company"
                        value={newGuest.company}
                        onChange={(e) => setNewGuest({...newGuest, company: e.target.value})}
                        className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream focus:border-vintage-gold"
                        placeholder="Název společnosti"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="language" className="text-vintage-gold font-vintage tracking-wide">JAZYK</Label>
                    <Select value={newGuest.language} onValueChange={(value) => setNewGuest({...newGuest, language: value})}>
                      <SelectTrigger className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream">
                        <SelectValue placeholder="Vyberte jazyk" />
                      </SelectTrigger>
                      <SelectContent className="bg-film-dark border-vintage-gold/30">
                        <SelectItem value="czech">Čeština</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="german">Deutsch</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="note" className="text-vintage-gold font-vintage tracking-wide">POZNÁMKA</Label>
                    <Textarea
                      id="note"
                      value={newGuest.note}
                      onChange={(e) => setNewGuest({...newGuest, note: e.target.value})}
                      className="bg-film-dark/50 border-vintage-gold/30 text-vintage-cream focus:border-vintage-gold resize-none"
                      placeholder="Speciální požadavky nebo poznámky..."
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={addGuest} 
                    className="w-full cinema-button"
                    disabled={!newGuest.name || !newGuest.surname || !newGuest.email}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    REGISTROVAT HOSTA
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="vintage-card group hover:red-carpet-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                  CELKEM HOSTŮ
                </CardTitle>
                <Users className="h-5 w-5 text-vintage-gold group-hover:animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-vintage-gold">{guests.length}</div>
                <p className="text-xs text-vintage-cream/80">VIP hosté festivalu</p>
              </CardContent>
            </Card>

            <Card className="vintage-card group hover:film-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                  FIREMNÍ KONTAKTY
                </CardTitle>
                <Building className="h-5 w-5 text-cinema-red group-hover:animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-cinema-red">
                  {guests.filter(g => g.company).length}
                </div>
                <p className="text-xs text-vintage-cream/80">Sponzoři a partneři</p>
              </CardContent>
            </Card>

            <Card className="vintage-card group hover:film-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-vintage-cream tracking-wide font-vintage">
                  TELEFONNÍ KONTAKTY
                </CardTitle>
                <Phone className="h-5 w-5 text-vintage-amber group-hover:animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-vintage-amber">
                  {guests.filter(g => g.phone).length}
                </div>
                <p className="text-xs text-vintage-cream/80">Přímé kontakty</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="vintage-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-gold font-cinema">
                <Search className="h-5 w-5 text-vintage-gold" />
                VYHLEDÁVÁNÍ HOSTŮ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-vintage-gold" />
                <Input
                  placeholder="Hledat podle jména, emailu nebo společnosti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-film-dark/50 border-vintage-gold/30 text-vintage-cream placeholder-vintage-cream/60 focus:border-vintage-gold"
                />
              </div>
            </CardContent>
          </Card>

          {/* Guests Table */}
          <Card className="vintage-card">
            <CardHeader>
              <CardTitle className="golden-text text-2xl font-cinema">
                REGISTROVANÍ HOSTÉ ({filteredGuests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse golden-text text-xl font-cinema">
                    Načítám seznam hostů...
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-vintage-gold/30 hover:bg-transparent">
                        <TableHead className="text-vintage-gold font-vintage tracking-wide">JMÉNO</TableHead>
                        <TableHead className="text-vintage-gold font-vintage tracking-wide">EMAIL</TableHead>
                        <TableHead className="text-vintage-gold font-vintage tracking-wide">TELEFON</TableHead>
                        <TableHead className="text-vintage-gold font-vintage tracking-wide">SPOLEČNOST</TableHead>
                        <TableHead className="text-vintage-gold font-vintage tracking-wide">JAZYK</TableHead>
                        <TableHead className="text-vintage-gold font-vintage tracking-wide">STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuests.map((guest) => (
                        <TableRow key={guest.id} className="border-vintage-gold/20 hover:bg-film-dark/30 transition-colors">
                          <TableCell className="font-medium text-vintage-cream font-classic">
                            {guest.name} {guest.surname}
                          </TableCell>
                          <TableCell className="text-vintage-gold font-classic">
                            {guest.email}
                          </TableCell>
                          <TableCell className="text-vintage-cream/80 font-classic">
                            {guest.phone || '-'}
                          </TableCell>
                          <TableCell className="text-vintage-cream/80 font-classic">
                            {guest.company || '-'}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-vintage-gold/20 border-vintage-gold/50 text-vintage-gold">
                              {guest.language === 'czech' ? 'Čeština' : guest.language === 'english' ? 'English' : guest.language}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-gradient-to-r from-cinema-red to-cinema-burgundy text-vintage-cream">
                              VIP HOST
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredGuests.length === 0 && (
                    <div className="text-center py-12 text-vintage-cream/60 font-classic">
                      Žádní hosté nevyhovují vyhledávacím kritériím
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center text-vintage-cream/60 font-classic">
            Debug: Načteno hostů: {guests.length}
          </div>
        </div>
      </div>
    </div>
  );
}