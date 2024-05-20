<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_id',
        'client_name',
        'invoice_number',
        'total_amount',
    ];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}
