<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['transaction_type', 'transaction_date', 'quantity', 'total_price', 'product_id', 'user_id'];

    // Relación con el producto involucrado en la transacción
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Relación con el usuario que realizó la transacción
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
