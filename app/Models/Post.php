<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $guarded = []; 

    public function reports(): HasMany{
        return $this->hasMany(Report::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function tag(): BelongsTo{
        return $this->belongsTo(Tag::class);
    }
}
