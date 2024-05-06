<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'details','category_id'];


    // Relación con la categoría del producto
    public function category()
     {
         return $this->belongsTo(Category::class);
     }
 
     // Relación con el proveedor del producto
     public function supplier()
     {
         return $this->belongsTo(Supplier::class);
     }
}
