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
    // Подписаться
    public function subscribe(Request $request, User $user)
    {
        $currentUser = $request->user();

        if ($currentUser->id === $user->id) {
            return back()->with('error', 'Нельзя подписаться на самого себя!');
        }

        $currentUser->followings()->syncWithoutDetaching([$user->id]);

        return back()->with('success', 'Подписка оформлена!');
    }

    // Отписаться
    public function unsubscribe(Request $request, User $user)
    {
        $request->user()->followings()->detach($user->id);
        return back()->with('success', 'Подписка отменена.');
    }

    // Проверить подписку (если нужно в компоненте)
    public function check(User $user)
    {
        return Inertia::render('UserProfile', [
            'isFollowing' => auth()->user()->isFollowing($user),
        ]);
    }
}
