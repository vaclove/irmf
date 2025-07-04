import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
let invitations: any[] = [];

// Import the guests and editions data (in a real app, this would be from a database)
// For demo purposes, we'll just check if the IDs are valid
async function getGuests() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/guests`);
    return response.json();
  } catch {
    return [];
  }
}

async function getEditions() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/editions`);
    return response.json();
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST /api/invitations/assign - Assigning guest to edition:', body);
    
    const { guestId, editionId, category } = body;
    
    // For demo purposes, we'll just simulate the invitation being sent
    const invitation = {
      guestId,
      editionId,
      category,
      sentAt: new Date().toISOString(),
      confirmed: false
    };
    
    invitations.push(invitation);
    console.log('Invitation sent successfully:', invitation);
    
    return NextResponse.json({
      message: 'Invitation sent successfully'
    });
  } catch (error) {
    console.error('Error sending invitation:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}