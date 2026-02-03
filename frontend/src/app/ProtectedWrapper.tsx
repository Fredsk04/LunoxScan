'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function ProtectedWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!pathname) return;

      const publicRoutes = ['/', '/auth', '/catalogue', '/premium', '/originals', '/series'];
      const isPublicPath = publicRoutes.some(path => pathname === path || (path !== '/' && pathname.startsWith(path)));

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      // Unauthenticated access to private routes
      if (!isPublicPath && !token) {
        router.replace('/auth');
        return;
      }

      // If token exists, we should often verify it, especially on sensitive routes or /auth
      if (token) {
        try {
          const res = await fetch('http://localhost:4000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (res.ok) {
            const userData = await res.json();

            // Redirect from /auth if already logged in
            if (pathname === '/auth') {
              router.replace('/');
              return;
            }

            // Check admin rights
            if (pathname.startsWith('/admin') && userData.role !== 'admin') {
              router.replace('/');
              return;
            }
          } else {
            // Token is invalid
            localStorage.removeItem('token');
            if (!isPublicPath) {
              router.replace('/auth');
              return;
            }
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          // If network error, we might want to be lenient on public routes
          if (!isPublicPath) {
            router.replace('/');
            return;
          }
        }
      }

      setChecked(true);
    };

    checkAuth();
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}