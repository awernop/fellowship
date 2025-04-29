<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use Inertia\Inertia;

class PostController extends Controller
{
    //выгрузка всех постов
    public function index()
    {
        $posts=Post::all();

        return Inertia::render('Dashboard', [
            'posts' => $posts
        ]);
    }

    public function welcome()
    {
        $posts=Post::all();

        return Inertia::render('Welcome', [
            'posts' => $posts
        ]);
    }

    //выгрузка заархивированных постов
    public function archivedIndex()
    {
        $posts=Post::where('user_id', Auth::user()->id)->get();

        return Inertia::render('Archive', [
            'posts' => $posts
        ]);
    }

    //выгрузка постов пользователя
    public function userIndex($login)
    {
        $user=User::where('login', $login)->firstOrFail();
        
        $posts=$user->posts()->latest()->paginate(10);

        return Inertia::render('UserProfile', [
            'user'=>$user,
            'posts' => $posts
        ]);
    }

    //создание поста
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
            'preview'=>['required', 'string', 'max:1000'],
            'reports_count'=>['int'],
            'paid'=>['boolean'],
            'archived'=>['boolean'],
            'path_img'=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            //'post_id' => 'required|integer|exists:posts,id'
        ]);

        $imageName = null;
    
        if ($request->hasFile('path_img')) {
            $imageName = time() . '.' . $request->file('path_img')->extension();
            $request->file('path_img')->move(public_path('images'), $imageName);
        }
    

        $post = Post::create([
            'title' => $request->title,
            'description'=>$request->description,
            'preview'=>$request->preview,
            'reports_count'=>0,
            'paid'=>$request->paid,
            'archived'=>false,
            'path_img' => $imageName,
            "user_id" => Auth::user()->id,
        ]);

        if ($request->has('tags')) {
            $post->tags()->attach($request->tags);
        }

        return redirect()->route('dashboard');
    }

    //архивация поста
    public function updateArchive(Post $post) {

        $post->update([
            'archived' => true,
        ]);
        return redirect()->back();
        
    }

    //деархивация поста
    public function updateUnarchive(Post $post) {

        $post->update([
            'archived' => false,
        ]);
        return redirect()->back();
        
    }

    //обновление количества откликов
    public function updateCount(Post $post) {

        $post->increment('reports_count');
    
        return redirect()->back();
    }

    //удаление поста
    public function destroy(Post $post){
        if(auth()->id() !== $post->user_id){
            abort(403);
        }

        $post->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Пост удален');
    }
}
