<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'details','category_id'];


    // Relación con la categoría del producto
    public function category()
     {
         return $this->belongsTo(Category::class);
     }
 
}