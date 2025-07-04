import { NextResponse } from 'next/server';

// In-memory storage for demo purposes with sample data
let guests: any[] = [
  {
    id: 1,
    name: 'Jan',
    surname: 'Novák',
    email: 'jan.novak@tech.cz',
    phone: '+420 777 123 456',
    company: 'Tech Solutions s.r.o.',
    note: 'VIP host z minulého roku, zájem o novinky',
    language: 'czech',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Marie',
    surname: 'Svobodová',
    email: 'marie.svobodova@business.cz',
    phone: '+420 608 987 654',
    company: 'Business Consulting a.s.',
    note: 'Potenciální sponzor, kontakt na vedení',
    language: 'czech',
    createdAt: '2024-02-20T14:45:00Z',
    updatedAt: '2024-02-20T14:45:00Z'
  },
  {
    id: 3,
    name: 'Petr',
    surname: 'Dvořák',
    email: 'petr.dvorak@startup.cz',
    phone: '+420 723 456 789',
    company: 'Inovační startup s.r.o.',
    note: 'Zájem o networkingové sekce a workshopy',
    language: 'czech',
    createdAt: '2024-03-10T09:15:00Z',
    updatedAt: '2024-03-10T09:15:00Z'
  },
  {
    id: 4,
    name: 'Anna',
    surname: 'Procházková',
    email: 'anna.prochazkova@digital.cz',
    phone: '+420 776 234 567',
    company: 'Digital Marketing Praha',
    note: 'Expertka na digitální marketing, přednášející',
    language: 'czech',
    createdAt: '2024-04-05T16:20:00Z',
    updatedAt: '2024-04-05T16:20:00Z'
  }
];
let nextId = 5;

export async function GET() {
  console.log('GET /api/guests - Fetching all guests');
  return NextResponse.json(guests);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST /api/guests - Creating new guest:', body);
    
    const newGuest = {
      id: nextId++,
      name: body.name,
      surname: body.surname,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      note: body.note || '',
      language: body.language || 'english',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    guests.push(newGuest);
    console.log('Guest created successfully:', newGuest);
    
    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    );
  }
}