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
        ]);

        Report::create([
            'approved' => null,
            'message'=>($request->message) ?? null,
            "user_id" => Auth::user()->id,
            "post_id" => $request->post_id,
        ]);

        return redirect()->route('dashboard');

        
    }
}
