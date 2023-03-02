import { NextResponse } from 'next/server';

export const config = {
  matcher: '/logout',
};

// in middleware request headers are ready only 
export function middleware(request) {
  // creating n new headers object 
  const requestHeaders = new Headers(request.headers)

  // cookie-name is sessionToken
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (sessionToken) {
    // this is important because I am going to catch this header in the Server Component
    requestHeaders.set('x-sessionToken-to-delete', sessionToken)
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  // delete the cookie in the browser
  response.cookies.set({
    name: 'sessionToken',
    maxAge: -1,
  });

  return response; 
}
