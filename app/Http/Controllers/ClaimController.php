<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Post;
use App\Models\Claim;
use App\Models\Tag;
use Inertia\Inertia;

class ClaimController extends Controller
{
    /*public function index()
    {
        $claims=Claim::all();

        return Inertia::render('Dashboard', [
            'reports' => $reports
        ]);
    }*/

    public function create()
    {
        $posts=Post::all();
        $claims=Claim::all();
        $user_id=Auth::id();

        return Inertia::render('Create', [
            'claims'=>$claims,
            'posts'=>$posts,
            'userId'=>$user_id
        ]);
    }

    public function store(Request $request): RedirectResponse {
        $request->validate([
            'reason'=>['nullable', 'string', 'max:200'],
            'post_id' => 'required|exists:posts,id',
        ]);

        Report::create([
            'approved' => null,
            'reason'=>($request->reason) ?? null,
            "user_id" => Auth::user()->id,
            "post_id" => $request->post_id,
        ]);

        return response()->json(['reason'=>'Claim created successfully']);

        
    }

    // public function reports()
    // {
    //     $user = Auth::user();

    //     $posts = Post::with('tags', 'user:id,username,login,path_img')->get();
    
    // $reports = Report::with(['user:id,username,login', 'post'])
    //     ->whereHas('post', function($query) use ($user) {
    //         $query->where('user_id', $user->id);
    //     })
    //     ->get();

    // return Inertia::render('ReportsToMyPosts', [
    //     'reports' => $reports,
    //     'user' => $user->only('id', 'login', 'username', 'path_img'),
    //     'posts' => $posts,
    // ]);
    // }

    public function reject(Claim $claims)
    {
        $claims->update([
            'approved' => false,
        ]);
        return redirect()->back();
    }

    public function accept(Claim $claims)
    {
        $claims->update([
            'approved' => true,
        ]);
        return redirect()->back();
    }
}
