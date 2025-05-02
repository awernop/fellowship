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
                    'link'=>'comics',
                ],
                [
                    'title'=>'Наука',
                    'link'=>'science',
                ],
                [
                    'title'=>'Музыка',
                    'link'=>'music',
                ],
                [
                    'title'=>'Активизм',
                    'link'=>'activism',
                ],
                [
                    'title'=>'Видеоигры',
                    'link'=>'videogames',
                ],
                [
                    'title'=>'Кино и анимация',
                    'link'=>'movie',
                ],
                [
                    'title'=>'Литература',
                    'link'=>'literature',
                ],
                [
                    'title'=>'Технологии',
                    'link'=>'technologies',
                ],
                [
                    'title'=>'Косплей',
                    'link'=>'cosplay',
                ],
                [
                    'title'=>'Бизнес',
                    'link'=>'business',
                ],
            ]
        );
    }
}
