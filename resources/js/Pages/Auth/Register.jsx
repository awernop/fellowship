import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const { tags } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        tags: [],
    });

    const toggleTag = (tagId) => {
        setData('tags', data.tags.includes(tagId)
            ? data.tags.filter(id => id !== tagId)
            : [...data.tags, tagId]
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const validate = () => {
        return data.tags.length >= 3;
    };

    return (
        <GuestLayout title='Будем Вместе?' subtitle='Присоединяйтесь к проекту в один клик'>
            <Head title="Register" />
            <div className='flex items-center w-full  '>
                <form onSubmit={submit}>
                    <div>
                        <div className='flex items-start gap-4'>
                            <div>
                                <div>
                                    <InputLabel htmlFor="login" value="Логин" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]' />

                                    <TextInput
                                        id="login"
                                        name="login"
                                        value={data.login}
                                        className="mt-1 block"
                                        autoComplete="login"
                                        isFocused={true}
                                        placeholder="Введите логин"
                                        onChange={(e) => setData('login', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.login} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="username" value="Имя пользователя" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]' />

                                    <TextInput
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        className="mt-1 block"
                                        autoComplete="username"
                                        placeholder="Введите имя пользователя"
                                        isFocused={true}
                                        onChange={(e) => setData('username', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.username} className="mt-2" />
                                </div>
                                <div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="E-mail" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]' />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block"
                                        autoComplete="username"
                                        placeholder="Введите электронную почту"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Пароль" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]' />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block"
                                        autoComplete="new-password"
                                        placeholder="Придумайте пароль"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                
                            </div>
                            </div>

                            <div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Подтвердите пароль"
                                        className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]'
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block"
                                        autoComplete="new-password"
                                        placeholder="Подтвердите пароль"
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mb-6 mt-4">
                                <label className='font-medium text-[14px] leading-103 text-[#696969] block text-sm mb-2'>Выберите интересующие темы (3):</label>
                                <div className="flex flex-wrap gap-2 w-[350px]">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => toggleTag(tag.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                                    ${data.tags.includes(tag.id)
                                                    ? 'bg-gradient-to-r from-[#8F79E4] to-[#7D64DD] text-white'
                                                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                                }`}
                                        >
                                            {tag.title}
                                        </button>
                                    ))}
                                </div>
                                {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}

                            </div>
                            <div className="flex flex-col items-center justify-end mt-[50px]">
                                <PrimaryButton disabled={processing} className='p-[105px]'>
                                    Зарегистрироваться
                                </PrimaryButton>
                                <div className="mt-3">
                                    <span className="font-normal text-[13px] text-[#57595C]">
                                        Уже есть аккаунт?
                                    </span>
                                    <span className="text-[18px]"> </span>
                                    <Link
                                        href={route('login')}
                                        className="underline decoration-solid underline-offset-4 text-night text-[13px]"
                                    >
                                        Войти
                                    </Link>
                                </div>

                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </GuestLayout >
    );
}
