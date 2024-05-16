<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = ['batch_number', 'name', 'details', 'purchase_price', 'selling_price', 'category_id'];


    // Relación con la categoría del producto
    public function category()
     {
         return $this->belongsTo(Category::class);
     }
 
}
