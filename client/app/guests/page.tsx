'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Search, Users, Mail, Building, Phone } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getApiUrl } from '@/lib/utils';

interface Guest {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  company: string;
  note: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    company: '',
    note: '',
    language: 'czech'
  });

  console.log('GuestsPage component loaded');

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      console.log('Fetching guests...');
      const response = await fetch(getApiUrl('/api/guests'));
      if (response.ok) {
        const data = await response.json();
        console.log('Guests fetched:', data);
        setGuests(data);
      } else {
        console.error('Failed to fetch guests:', response.status);
        toast.error('Nepodařilo se načíst hosty');
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
      toast.error('Chyba při načítání hostů');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new guest:', formData);
    
    try {
      const response = await fetch(getApiUrl('/api/guests'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newGuest = await response.json();
        console.log('Guest created successfully:', newGuest);
        setGuests([...guests, newGuest]);
        setIsAddDialogOpen(false);
        setFormData({
          name: '',
          surname: '',
          email: '',
          phone: '',
          company: '',
          note: '',
          language: 'czech'
        });
        toast.success('Host byl úspěšně přidán!');
      } else {
        console.error('Failed to create guest:', response.status);
        toast.error('Nepodařilo se přidat hosta');
      }
    } catch (error) {
      console.error('Error creating guest:', error);
      toast.error('Chyba při přidávání hosta');
    }
  };

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-2xl font-bold text-slate-900" data-macaly="guests-title">
                  Správa hostů
                </h1>
                <p className="text-slate-600 mt-1" data-macaly="guests-description">
                  Spravujte svůj seznam hostů a kontaktní informace
                </p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Přidat hosta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Přidat nového hosta</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Jméno</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname">Příjmení</Label>
                      <Input
                        id="surname"
                        value={formData.surname}
                        onChange={(e) => setFormData({...formData, surname: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Společnost</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">Jazyk</Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte jazyk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="czech">Čeština</SelectItem>
                        <SelectItem value="english">Angličtina</SelectItem>
                        <SelectItem value="spanish">Španělština</SelectItem>
                        <SelectItem value="french">Francouzština</SelectItem>
                        <SelectItem value="german">Němčina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="note">Poznámka</Label>
                    <Textarea
                      id="note"
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                      placeholder="Další poznámky..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Přidat hosta
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Celkem hostů</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{guests.length}</div>
              <p className="text-xs text-slate-500">Registrovaných hostů</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Se společností</CardTitle>
              <Building className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {guests.filter(guest => guest.company).length}
              </div>
              <p className="text-xs text-slate-500">Firemní hosté</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">S telefonem</CardTitle>
              <Phone className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {guests.filter(guest => guest.phone).length}
              </div>
              <p className="text-xs text-slate-500">Telefonní čísla</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hledat hosty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Hledat podle jména, emailu nebo společnosti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Guests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Hosté ({filteredGuests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Načítám hosty...</p>
              </div>
            ) : filteredGuests.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-sm font-medium text-slate-900">Žádní hosté nenalezeni</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {searchTerm ? 'Zkuste upravit vyhledávací výrazy.' : 'Začněte přidáním prvního hosta.'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jméno</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Společnost</TableHead>
                    <TableHead>Jazyk</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Přidáno</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">
                        {guest.name} {guest.surname}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-slate-400" />
                          {guest.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {guest.company || <span className="text-slate-400">—</span>}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {guest.language === 'czech' ? 'Čeština' : 
                           guest.language === 'english' ? 'Angličtina' :
                           guest.language === 'spanish' ? 'Španělština' :
                           guest.language === 'french' ? 'Francouzština' :
                           guest.language === 'german' ? 'Němčina' : guest.language}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {guest.phone || <span className="text-slate-400">—</span>}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(guest.createdAt).toLocaleDateString('cs-CZ')}
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