<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    const ADMIN_ROLE='admin';

    public function isAdmin(){
        return $this->role===self::ADMIN_ROLE;
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'following_id', 'follower_id');
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'follower_id', 'following_id');
    }

    public function isFollowing(User $user)
    {
        return $this->followings()->where('following_id', $user->id)->exists();
    }

    public function posts(): HasMany{
        return $this->hasMany(Post::class);
    }
    
    public function reports(): HasMany{
        return $this->hasMany(Report::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'login',
        'username',
        'path_img',
        'profile_description',
        'role',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
