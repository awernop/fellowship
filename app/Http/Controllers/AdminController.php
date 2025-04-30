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
    public function index(){
        $reports = Report::all();
        $users = User::all();
        $posts = Post::all();
        
        return Inertia::render('Admin', [
            'reports'=>$reports,
            'posts'=>$posts,
            'users'=>$users
        ]);
    }
}
