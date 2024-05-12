<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\EntryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::middleware(['role:Administrador del Sistema,Administrador del Inventario'])->group(function () {
            Route::resource('categories', CategoryController::class);
            Route::resource('suppliers', SupplierController::class);
            Route::resource('medicines', MedicineController::class);
            Route::resource('entries', EntryController::class);
            Route::resource('sales', SaleController::class);


        });
        Route::middleware(['role:Administrador del Sistema'])->group(function () {
            Route::resource('users', UserController::class);
        });
    });
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/unauthorized', [UserController::class, 'unauthorized'])->name('unauthorized');

});



require __DIR__.'/auth.php';
