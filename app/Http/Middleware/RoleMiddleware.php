<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        foreach ($roles as $role) {
            // Verifica si el usuario tiene alguno de los roles permitidos
            if (Auth::user()->hasRole($role)) {
                return $next($request);
            }
        }

        // Redirige si no tiene ninguno de los roles permitidos
        return redirect('/unauthorized');
    }
}
