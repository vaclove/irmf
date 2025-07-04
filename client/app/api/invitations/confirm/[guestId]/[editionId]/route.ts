import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
let invitations: any[] = [];

export async function GET(
  request: Request,
  { params }: { params: { guestId: string; editionId: string } }
) {
  try {
    const { guestId, editionId } = params;
    console.log(`GET /api/invitations/confirm/${guestId}/${editionId} - Confirming invitation`);
    
    // Find the invitation
    const invitation = invitations.find(
      inv => inv.guestId === parseInt(guestId) && inv.editionId === parseInt(editionId)
    );
    
    if (!invitation) {
      return new Response('Invitation not found', { status: 404 });
    }
    
    // Mark as confirmed
    invitation.confirmed = true;
    invitation.confirmedAt = new Date().toISOString();
    
    console.log('Invitation confirmed successfully:', invitation);
    
    return new Response('Thank you for confirming your attendance!', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error confirming invitation:', error);
    return new Response('Error confirming invitation', { status: 500 });
  }
}