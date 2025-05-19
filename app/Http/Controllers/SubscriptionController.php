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

class SubscriptionController extends Controller
{
    public function subscribe(User $user)
    {
        $currentUser = auth()->user();
        
        if ($currentUser->id === $user->id) {
            return response()->json(['error' => 'Cannot subscribe to yourself'], 422);
        }
        
        $currentUser->followings()->syncWithoutDetaching([$user->id]);
        
        return redirect()->back();
    }
    
    public function unsubscribe(User $user)
    {
        auth()->user()->followings()->detach($user->id);
        
        return redirect()->back();
    }
    
    public function check(User $user)
    {
       return Inertia::render('YourPage', [
    'isFollowing' => auth()->user()->isFollowing($user)
  ]);
    }
}
