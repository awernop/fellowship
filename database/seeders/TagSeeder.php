<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::insert(
            [
                [
                    'title'=>'Комиксы',
                ],
                [
                    'title'=>'Наука',
                ],
                [
                    'title'=>'Музыка',
                ],
                [
                    'title'=>'Благотворительность',
                ],
                [
                    'title'=>'Видеоигры',
                ],
                [
                    'title'=>'Кино и анимация',
                ],
                [
                    'title'=>'Литература',
                ],
                [
                    'title'=>'Технологии',
                ],
                [
                    'title'=>'Косплей',
                ],
                [
                    'title'=>'Бизнес',
                ],
            ]
        );
    }
}
