<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
         'canLogin' => Route::has('login'),
         'canRegister' => Route::has('register'),
         'laravelVersion' => Application::VERSION,
         'phpVersion' => PHP_VERSION,
     ]);
 });*/

/*Route::get('/dashboard',[PostController::class, 'index'])->name('posts.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

Route::get('/dashboard', [PostController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/', [PostController::class, 'welcome'])->name('posts.welcome');

Route::get('/archive', [PostController::class, 'archivedIndex'])
    ->middleware(['auth', 'verified'])
    ->name('archive');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/store', [PostController::class, 'store'])->name('posts.store');
    Route::get('/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts/{id}/increment-reports', [PostController::class, 'updateCount'])->name('posts.reports.increment');
    Route::post('/posts/{post}/archive', [PostController::class, 'updateArchive'])->name('posts.updateArchive');
    Route::post('/posts/{post}/unarchive', [PostController::class, 'updateUnarchive'])->name('posts.updateUnarchive');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])
        ->name('posts.destroy')
        ->middleware('auth');

    Route::get('/@{login}', [PostController::class, 'userIndex'])->name('users.posts');

    Route::post('/report', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/report/create', [ReportController::class, 'create'])->name('reports.create');
});

require __DIR__.'/auth.php';
