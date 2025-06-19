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
            'contact'=>['string', 'max:200'],
            'post_id' => 'required|exists:posts,id',
        ]);

        Report::create([
            'approved' => null,
            'message'=>($request->message) ?? null,
            'contact'=>($request->contact),
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

    /*public function destroy(Report $report){
        if(auth()->id() !== $report->user_id){
            abort(403);
        }

        $report->delete();

        return redirect()->route('user.repors')
            ->with('success', 'отклик удален');
    }*/

    public function reports()
    {
        $user = Auth::user();

        $posts = Post::with('tags', 'user:id,username,login,path_img')->get();
    
    $reports = Report::with(['user:id,username,login,path_img', 'post'])
        ->whereHas('post', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->get();

    return Inertia::render('ReportsToMyPosts', [
        'reports' => $reports,
        'user' => $user->only('id', 'login', 'username', 'path_img'),
        'posts' => $posts,
    ]);
    }

    public function reject(Report $report)
    {
        $report->update([
            'approved' => false,
        ]);
        return redirect()->back();
    }

    public function accept(Report $report)
    {
        $report->update([
            'approved' => true,
        ]);
        return redirect()->back();
    }
}