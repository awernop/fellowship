<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\Claim;
use App\Models\User;
use App\Models\Post;
use App\Models\Admin;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request){
        $reports = Report::with('post:id,title,preview', 'user:id,username,login,path_img')->get();
        $claims = Claim::with('post:id,title,preview', 'user:id,username,login,path_img')->get();
        $users = User::all();
        $posts = Post::with('tags', 'user:id,username,login,path_img')->get();

        $activeTab = $request->query('tab', 'posts');
        
        return Inertia::render('Admin', [
            'reports'=>$reports,
            'claims'=>$claims,
            'posts'=>$posts,
            'users'=>$users,
            'initialTab' => $activeTab
        ]);
    }
}
