<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class inventory_manager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->user()->hasRole('Administrador del Inventario')) {
            return redirect()->route('unauthorized');
        }

        // Si el usuario tiene permisos, la solicitud puede continuar
        return $next($request);
    }
}
