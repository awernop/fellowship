<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert(
            [
                [
                    'login'=>'admin',
                    'username'=>'Admin Anna',
                    'email'=>'admin@fellowship.com',
                    'role'=>'admin',
                    'password'=> Hash::make('su0101666')
                ],
            ]
        );
    }
}
