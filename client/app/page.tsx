import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Mail, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-900" data-macaly="app-title">
            Systém správy hostů
          </h1>
          <p className="text-slate-600 mt-1" data-macaly="app-description">
            Efektivní správa hostů, ročníků a pozvánek
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Celkem hostů</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0</div>
              <p className="text-xs text-slate-500">Registrovaných hostů</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Aktivní ročníky</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0</div>
              <p className="text-xs text-slate-500">Ročníky akcí</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Odeslané pozvánky</CardTitle>
              <Mail className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0</div>
              <p className="text-xs text-slate-500">Tento měsíc</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Potvrzení</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0</div>
              <p className="text-xs text-slate-500">Potvrzená účast</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Správa hostů</CardTitle>
              <CardDescription>Zobrazit, přidat a upravit informace o hostech</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guests">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Users className="w-4 h-4 mr-2" />
                  Zobrazit hosty
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Správa ročníků</CardTitle>
              <CardDescription>Vytvořit a spravovat ročníky akcí</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/editions">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Zobrazit ročníky
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Odesílání pozvánek</CardTitle>
              <CardDescription>Přiřadit hosty k ročníkům a odeslat pozvánky</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/invitations">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Správa pozvánek
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}