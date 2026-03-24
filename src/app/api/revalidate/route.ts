import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');

  return NextResponse.json({ 
    revalidated: true, 
    timestamp: Date.now() 
  });
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST to revalidate',
    paths: ['/blog', '/blog/[slug]']
  });
}
