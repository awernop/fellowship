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
        $user=Auth::user();

        $userPosts = Post::where('user_id', $user->id)
        ->with(['tags', 'user:id,username,login,path_img'])
        ->latest()
        ->take(4)
        ->get();

        $userTagIds = $user->tags()->pluck('tags.id');
        $followingIds = $user->followings()->pluck('users.id');
        $followingIds->push($user->id);
        
        $posts = Post::with(['user', 'tags'])
            ->where(function($query) use ($userTagIds, $followingIds) {
                // Посты с тегами пользователя
                $query->whereHas('tags', function($q) use ($userTagIds) {
                    $q->whereIn('tags.id', $userTagIds);
                })
                // ИЛИ посты от пользователей, на которых подписан
                ->orWhereIn('user_id', $followingIds);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dashboard', [
            'posts' => $posts,
            'userPosts' => $userPosts
        ]);
    }

    public function welcome()
    {
        $posts=Post::with('tags', 'user:id,username,login,path_img')->get();

        return Inertia::render('Welcome', [
            'posts' => $posts
        ]);
    }

    public function challengesGuest()
    {
        $posts=Post::with('tags', 'user:id,username,login,path_img')->latest()->get();

        return Inertia::render('Challenges', [
            'posts' => $posts
        ]);
    }

    //выгрузка заархивированных постов
    public function archivedIndex()
    {
        $userId = Auth::id();
        $posts = Post::where('user_id', $userId)
                ->where('archived', true) 
                ->with(['tags', 'user' => function($query) {
                    $query->select('id', 'username', 'login', 'path_img');
                }])
                ->get();
        $user = Auth::user();

        return Inertia::render('Archive', [
            'user' => $user->load('tags'),
            'posts' => $posts
        ]);
    }

    //выгрузка постов пользователя
    public function userIndex($login)
    {
        $user=User::where('login', $login)->firstOrFail();
        
        $posts=Post::where('user_id', $user->id)->with('tags', 'user:id,username,login,path_img')->get();

        return Inertia::render('UserProfile', [
            'user'=>$user->load('tags'),
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
            'contact'=>['required', 'string', 'max:1000'],
            //'post_id' => 'required|integer|exists:posts,id'
        ]);

        if ($request->hasFile('path_img')) {
            // Если пользователь загрузил изображение
            $imagePath = time() . '.' . $request->file('path_img')->extension();
            $request->file('path_img')->move(public_path('images'), $imagePath);
        } else {
            $defaultImages = ['cover1.jpg', 'cover2.jpg', 'cover3.jpg', 'cover4.jpg'];
            $randomImage = $defaultImages[array_rand($defaultImages)];
            $imagePath = $randomImage;
        }

        /*$imageName = null;
    
        if ($request->hasFile('path_img')) {
            $imageName = time() . '.' . $request->file('path_img')->extension();
            $request->file('path_img')->move(public_path('images'), $imageName);
        }*/
    

        $post = Post::create([
            'title' => $request->title,
            'description'=>$request->description,
            'preview'=>$request->preview,
            'reports_count'=>0,
            'paid'=>$request->paid,
            'archived'=>false,
            'path_img' => $imagePath,
            'contact'=>$request->contact,
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

     public function getPost(Post $post)
    {
        return Inertia::render('PostPage', [
            'post' => $post->load('user')
        ]);
    }
}
