'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Calendar, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Edition {
  id: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export default function EditionsPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear()
  });

  console.log('EditionsPage component loaded');

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      console.log('Fetching editions...');
      const response = await fetch('/api/editions');
      if (response.ok) {
        const data = await response.json();
        console.log('Editions fetched:', data);
        setEditions(data);
      } else {
        console.error('Failed to fetch editions:', response.status);
        toast.error('Nepodařilo se načíst ročníky');
      }
    } catch (error) {
      console.error('Error fetching editions:', error);
      toast.error('Chyba při načítání ročníků');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new edition:', formData);
    
    try {
      const response = await fetch('/api/editions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEdition = await response.json();
        console.log('Edition created successfully:', newEdition);
        setEditions([...editions, newEdition]);
        setIsAddDialogOpen(false);
        setFormData({
          year: new Date().getFullYear()
        });
        toast.success('Ročník byl úspěšně přidán!');
      } else {
        console.error('Failed to create edition:', response.status);
        toast.error('Nepodařilo se přidat ročník');
      }
    } catch (error) {
      console.error('Error creating edition:', error);
      toast.error('Chyba při přidávání ročníku');
    }
  };

  const sortedEditions = [...editions].sort((a, b) => b.year - a.year);

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
                <h1 className="text-2xl font-bold text-slate-900" data-macaly="editions-title">
                  Správa ročníků
                </h1>
                <p className="text-slate-600 mt-1" data-macaly="editions-description">
                  Spravujte ročníky akcí a roky
                </p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Přidat ročník
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Přidat nový ročník</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="year">Rok</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      min={2020}
                      max={2050}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Přidat ročník
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
              <CardTitle className="text-sm font-medium text-slate-600">Celkem ročníků</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{editions.length}</div>
              <p className="text-xs text-slate-500">Ročníky akcí</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Nejnovější ročník</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {editions.length > 0 ? Math.max(...editions.map(e => e.year)) : '—'}
              </div>
              <p className="text-xs text-slate-500">Nejnovější rok</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Nejstarší ročník</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {editions.length > 0 ? Math.min(...editions.map(e => e.year)) : '—'}
              </div>
              <p className="text-xs text-slate-500">První rok</p>
            </CardContent>
          </Card>
        </div>

        {/* Editions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Ročníky akcí ({editions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Načítám ročníky...</p>
              </div>
            ) : editions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-sm font-medium text-slate-900">Žádné ročníky nenalezeny</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Začněte přidáním prvního ročníku akce.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rok</TableHead>
                    <TableHead>Vytvořeno</TableHead>
                    <TableHead>Naposledy aktualizováno</TableHead>
                    <TableHead>Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEditions.map((edition) => (
                    <TableRow key={edition.id}>
                      <TableCell className="font-medium text-lg">
                        {edition.year}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(edition.createdAt).toLocaleDateString('cs-CZ')}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {new Date(edition.updatedAt).toLocaleDateString('cs-CZ')}
                      </TableCell>
                      <TableCell>
                        <Link href={`/invitations?edition=${edition.id}`}>
                          <Button variant="outline" size="sm">
                            Zobrazit pozvánky
                          </Button>
                        </Link>
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