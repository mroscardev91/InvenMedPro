<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'surname', 'email', 'phone', 'address', 'photo', 'user_id']; 

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
