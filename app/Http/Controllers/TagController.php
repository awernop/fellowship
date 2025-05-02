<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use Inertia\Inertia;

class TagController extends Controller
{
    public function getPostsByTag($link)
{
    $tag = Tag::where('link', $link)->firstOrFail();

    $posts = $tag->post()->with('tags', 'user')->where('archived', false)->get(); 
    
    return Inertia::render('Thematic', [
        'tag'=>$tag,
        'posts' => $posts,
    ]);
}
}
