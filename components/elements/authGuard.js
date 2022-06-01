import { useSession } from 'next-auth/react';
import Router from 'next/router'
import { useEffect } from 'react'
import Loader from '../layout/loader';

export function AuthGuard({ children }) {
  const { data: session, status } = useSession({
    required: true, 
  });

  useEffect(() => {
    const { pathname } = Router; 
    if (status !== "loading") {
      //auth is initialized and there is no user
      if (!session) {
        // redirect
        Router.replace("/auth/signin");
      }else{
        Router.push(pathname);
      }
    }
  }, [status, session]);

  /* show loading indicator while the auth provider is still initializing */
  if (status === 'loading') {
    return <Loader component/>;
  }

  // if auth initialized with a valid user show protected page
  if (status !== 'loading' && session) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}