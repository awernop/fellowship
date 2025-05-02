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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('link');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('tag_user', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();;
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();;
            $table->primary(['user_id', 'tag_id']);
        });

        Schema::create('post_tag', function (Blueprint $table) {
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();;
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();;
            $table->primary(['post_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
        Schema::dropIfExists('tag_user');
        Schema::dropIfExists('post_tag');
    }
};
