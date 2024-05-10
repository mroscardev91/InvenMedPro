<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock', function (Blueprint $table) {
            $table->id();
            $table->integer('medicine_id');
            $table->integer('category_id');
            $table->integer('supplier_id');
            $table->integer('user_id');
            $table->double('buying_price');
            $table->double('selling_price');
            $table->double('discount')->default(0);
            $table->integer('stock_quantity');
            $table->integer('current_quantity')->default(0);
            $table->text('note')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock');
    }
};
