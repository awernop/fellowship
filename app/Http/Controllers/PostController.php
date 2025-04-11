<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts=Post::all();

        return Inertia::render('Dashboard', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        $posts=Post::all();
        $tags=Tag::all();
        $user_id=Auth::id();

        return Inertia::render('Create', [
            'tags'=>$tags,
            'posts'=>$posts,
            'userId'=>$user_id
        ]);
    }

    public function store(Request $request): RedirectResponse {
        $request->validate([
            'title'=>['required', 'string', 'max:255'],
            'description'=>['required', 'string', 'max:2000'],
            'reports_count'=>['int'],
            'paid'=>['boolean'],
            'archived'=>['boolean'],
            'path_img'=>['image|mimes:png,jpg,jpeg,gif|max:1000'],
        ]);

        /*$imageName = time() . '.' . $request['path_img']->extension();
        $request['path_img']->move(public_path('images'), $imageName);*/

        Post::create([
            'title' => $request->title,
            'description'=>$request->description,
            'reports_count'=>null,
            'paid'=>$request->paid,
            'archived'=>false,
            'path_img' => null,
            "user_id" => Auth::user()->id,
            "tag_id" => 1,
        ]);

        return redirect()->route('dashboard');
    }

    public function update(Request $request) {
        $request->validate([
            'archived' => ['required'],
            'id' => ['required']
        ]);

        Post::where('id', $request->id)->update([
            'archived' => true,
        ]);
        return redirect()->back();
    }

    public function updateCount(Request $request) {
        $request->validate([
            'id' => ['required']
        ]);

        $count = $request->reports_count; 

        Post::where('id', $request->id)->update([
            'reports_count' => $count+1,
        ]);
        return redirect()->back();
    }
}
