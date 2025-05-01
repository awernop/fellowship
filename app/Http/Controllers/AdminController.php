<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\User;
use App\Models\Post;
use App\Models\Admin;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request){
        $reports = Report::all();
        $users = User::all();
        $posts = Post::all();

        $activeTab = $request->query('tab', 'posts');
        
        return Inertia::render('Admin', [
            'reports'=>$reports,
            'posts'=>$posts,
            'users'=>$users,
            'initialTab' => $activeTab
        ]);
    }
}
