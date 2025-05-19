<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\Admin;

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

Route::get('/challenges', [PostController::class, 'challengesGuest'])->name('posts.guest');

Route::get('/archive', [PostController::class, 'archivedIndex'])
    ->middleware(['auth', 'verified'])
    ->name('archive');

Route::get('/myreports', [ReportController::class, 'myReports'])
    ->middleware(['auth', 'verified'])
    ->name('user.repors');

Route::get('/reports2myposts', [ReportController::class, 'reports'])
    ->middleware(['auth', 'verified'])
    ->name('user.reportsposts');

Route::get('/tags/{tag}', [TagController::class, 'getPostsByTag'])->name('tags.show');

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

    Route::post('/reports/{report}/reject', [ReportController::class, 'reject'])->name('reports.reject');
    Route::post('/reports/{report}/accept', [ReportController::class, 'accept'])->name('reports.accept');

    Route::delete('/reports/{report}', [ReportController::class, 'destroy'])
        ->name('reports.destroy')
        ->middleware('auth');

    Route::get('/@{login}', [PostController::class, 'userIndex'])->name('users.posts');

    Route::post('/report', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/report/create', [ReportController::class, 'create'])->name('reports.create');

    Route::post('/claims/{claim}/reject', [ClaimController::class, 'reject'])->name('claims.reject');
    Route::post('/claims/{claim}/accept', [ClaimController::class, 'accept'])->name('claims.accept');
    Route::post('/claim', [ClaimController::class, 'store'])->name('claims.store');
    Route::get('/claim/create', [ClaimController::class, 'create'])->name('claims.create');

    // Route::post('/users/{user}/subscribe', [SubscriptionController::class, 'subscribe']);
    // Route::post('/users/{user}/unsubscribe', [SubscriptionController::class, 'unsubscribe']);
    // Route::get('/users/{user}/check-subscription', [SubscriptionController::class, 'check']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/users/{user}/subscribe', [SubscriptionController::class, 'subscribe']);
    Route::post('/users/{user}/unsubscribe', [SubscriptionController::class, 'unsubscribe']);
    Route::get('/users/{user}/check-subscription', [SubscriptionController::class, 'check']);
});

Route::middleware((Admin::class))->group(function(){
    Route::get('/admin', [AdminController::class, 'index']) -> name('admin.index');
});

require __DIR__.'/auth.php';
