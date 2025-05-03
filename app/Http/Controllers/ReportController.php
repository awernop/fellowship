<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Post;
use App\Models\Report;
use App\Models\Tag;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $reports=Report::all();

        return Inertia::render('Dashboard', [
            'reports' => $reports
        ]);
    }

    public function create()
    {
        $posts=Post::all();
        $reports=Report::all();
        $user_id=Auth::id();

        return Inertia::render('Create', [
            'reports'=>$reports,
            'posts'=>$posts,
            'userId'=>$user_id
        ]);
    }

    public function store(Request $request): RedirectResponse {
        $request->validate([
            'message'=>['nullable', 'string', 'max:2000'],
            'post_id' => 'required|exists:posts,id',
        ]);

        Report::create([
            'approved' => null,
            'message'=>($request->message) ?? null,
            "user_id" => Auth::user()->id,
            "post_id" => $request->post_id,
        ]);

        return redirect()->route('dashboard');

        
    }

    public function myReports()
    {
        $userId = Auth::id();
        $posts = Post::with('tags', 'user:id,username,login,path_img')->get();
        $user = Auth::user();

        $reports = Report::where('user_id', $userId)
                ->with(['user' => function($query) {
                    $query->select('id', 'username', 'login', 'path_img');
                }])->with('post:id,title,preview')
                ->get();

        return Inertia::render('MyReports', [
            'user'=>$user->load('tags'),
            'posts' => $posts,
            'reports'=>$reports,
        ]);
    }
}