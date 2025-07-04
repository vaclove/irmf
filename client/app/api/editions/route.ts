import { NextResponse } from 'next/server';

// In-memory storage for demo purposes with sample data
let editions: any[] = [
  {
    id: 1,
    year: 2024,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    year: 2025,
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  }
];
let nextId = 3;

export async function GET() {
  console.log('GET /api/editions - Fetching all editions');
  return NextResponse.json(editions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST /api/editions - Creating new edition:', body);
    
    // Check if edition year already exists
    const existingEdition = editions.find(edition => edition.year === body.year);
    if (existingEdition) {
      return NextResponse.json(
        { error: 'Edition for this year already exists' },
        { status: 409 }
      );
    }
    
    const newEdition = {
      id: nextId++,
      year: body.year,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    editions.push(newEdition);
    console.log('Edition created successfully:', newEdition);
    
    return NextResponse.json(newEdition, { status: 201 });
  } catch (error) {
    console.error('Error creating edition:', error);
    return NextResponse.json(
      { error: 'Failed to create edition' },
      { status: 500 }
    );
  }
}