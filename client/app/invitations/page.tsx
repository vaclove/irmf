'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Send, Mail, Users, Calendar, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { apiRequest } from '@/lib/api-config';

interface Guest {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  company: string;
  language: string;
}

interface Edition {
  id: number;
  year: number;
}

interface Invitation {
  guestId: number;
  editionId: number;
  category: string;
  guest: Guest;
  edition: Edition;
  confirmed: boolean;
}

export default function InvitationsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    guestId: '',
    editionId: '',
    category: 'Standard'
  });

  console.log('InvitationsPage component loaded');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const [guestsResponse, editionsResponse] = await Promise.all([
        apiRequest('/api/guests'),
        apiRequest('/api/editions')
      ]);

      if (guestsResponse.ok && editionsResponse.ok) {
        const guestsData = await guestsResponse.json();
        const editionsData = await editionsResponse.json();
        console.log('Guests fetched:', guestsData);
        console.log('Editions fetched:', editionsData);
        setGuests(guestsData);
        setEditions(editionsData);
      } else {
        console.error('Failed to fetch data');
        toast.error('Nepodařilo se načíst data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Chyba při načítání dat');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting invitation:', formData);
    
    try {
      const response = await apiRequest('/api/invitations/assign', {
        method: 'POST',
        body: JSON.stringify({
          guestId: parseInt(formData.guestId),
          editionId: parseInt(formData.editionId),
          category: formData.category
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Invitation sent successfully:', result);
        
        // Add the invitation to local state
        const guest = guests.find(g => g.id === parseInt(formData.guestId));
        const edition = editions.find(e => e.id === parseInt(formData.editionId));
        
        if (guest && edition) {
          const newInvitation: Invitation = {
            guestId: parseInt(formData.guestId),
            editionId: parseInt(formData.editionId),
            category: formData.category,
            guest,
            edition,
            confirmed: false
          };
          setInvitations([...invitations, newInvitation]);
        }
        
        setIsAddDialogOpen(false);
        setFormData({
          guestId: '',
          editionId: '',
          category: 'Standard'
        });
        toast.success('Pozvánka byla úspěšně odeslána!');
      } else {
        console.error('Failed to send invitation:', response.status);
        toast.error('Nepodařilo se odeslat pozvánku');
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Chyba při odesílání pozvánky');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
        return 'bg-gold-100 text-gold-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zpět na přehled
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" data-macaly="invitations-title">
                  Správa pozvánek
                </h1>
                <p className="text-slate-600 mt-1" data-macaly="invitations-description">
                  Přiřazujte hosty k ročníkům a odesílejte pozvánky
                </p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Odeslat pozvánku
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Odeslat novou pozvánku</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="guestId">Host</Label>
                    <Select value={formData.guestId} onValueChange={(value) => setFormData({...formData, guestId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte hosta" />
                      </SelectTrigger>
                      <SelectContent>
                        {guests.map((guest) => (
                          <SelectItem key={guest.id} value={guest.id.toString()}>
                            {guest.name} {guest.surname} ({guest.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editionId">Ročník</Label>
                    <Select value={formData.editionId} onValueChange={(value) => setFormData({...formData, editionId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte ročník" />
                      </SelectTrigger>
                      <SelectContent>
                        {editions.map((edition) => (
                          <SelectItem key={edition.id} value={edition.id.toString()}>
                            {edition.year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Kategorie</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte kategorii" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    <Send className="w-4 h-4 mr-2" />
                    Odeslat pozvánku
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Celkem pozvánek</CardTitle>
              <Mail className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{invitations.length}</div>
              <p className="text-xs text-slate-500">Odeslaných pozvánek</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Potvrzeno</CardTitle>
              <UserCheck className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {invitations.filter(inv => inv.confirmed).length}
              </div>
              <p className="text-xs text-slate-500">Potvrzená účast</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Dostupní hosté</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{guests.length}</div>
              <p className="text-xs text-slate-500">Celkem hostů</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Aktivní ročníky</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{editions.length}</div>
              <p className="text-xs text-slate-500">Ročníky akcí</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Potřebujete více hostů?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">Přidejte více hostů do databáze před odesíláním pozvánek.</p>
              <Link href="/guests">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Users className="w-4 h-4 mr-2" />
                  Správa hostů
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Potřebujete více ročníků?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700 mb-4">Vytvořte nové ročníky akcí pro odesílání pozvánek.</p>
              <Link href="/editions">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Správa ročníků
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Invitations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Odeslané pozvánky ({invitations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Načítám pozvánky...</p>
              </div>
            ) : invitations.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-sm font-medium text-slate-900">Zatím nebyly odeslány žádné pozvánky</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Začněte odesláním první pozvánky hostovi.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Host</TableHead>
                    <TableHead>Ročník</TableHead>
                    <TableHead>Kategorie</TableHead>
                    <TableHead>Stav</TableHead>
                    <TableHead>Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation, index) => (
                    <TableRow key={`${invitation.guestId}-${invitation.editionId}-${index}`}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {invitation.guest.name} {invitation.guest.surname}
                          </div>
                          <div className="text-slate-500 text-sm">
                            {invitation.guest.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {invitation.edition.year}
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(invitation.category)}>
                          {invitation.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={invitation.confirmed ? "default" : "secondary"}>
                          {invitation.confirmed ? "Potvrzeno" : "Čeká na potvrzení"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" disabled>
                          Zobrazit detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}