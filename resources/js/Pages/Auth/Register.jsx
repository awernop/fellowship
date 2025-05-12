import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [step, setStep] = useState(1);
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

    const nextStep = () => {
        setStep(step+1);
    };

    const prevStep = () =>{
        setStep(step-1);
    };

    return (
        <GuestLayout title='Будем Вместе?' subtitle='Присоединяйтесь к проекту в один клик'>
            <Head title="Register" />
            <div className='flex flex-col items-start'>
            {/* <div className="flex justify-between mb-5">
                {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="w-1/3 text-center">
                        <div className={`h-2 w-[145px]  ${step >= stepNumber ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                        
                    </div>
                ))}
            </div> */}
            <form onSubmit={submit}>
                {step === 1 && (
                    <div>
                        <div>
                    <InputLabel htmlFor="login" value="Логин" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]'/>

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
                    <InputLabel htmlFor="username" value="Имя пользователя" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]'/>

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
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="mt-4">
                    <InputLabel htmlFor="email" value="E-mail" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]'/>

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
                    <InputLabel htmlFor="password" value="Пароль" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]'/>

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

                    </div>
                )}

                {step === 3 && (
                    <div className="mb-6 mt-4">
                    <label className='font-medium text-[14px] leading-103 text-[#696969] block text-sm mb-2'>Выберите интересующие темы:</label>
                    <div className="flex flex-wrap gap-2 w-[350px]">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                                    ${data.tags.includes(tag.id)
                                        ? 'bg-flower text-white shadow-[inset_0_-2px_2px_0_rgba(0,0,0,0.2)]'
                                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1),inset_0_-2px_8px_0_rgba(255,255,255,0.4)]'
                                    }`}
                            >
                                {tag.title}
                            </button>
                        ))}
                    </div>
                    {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}
                    
                </div>
                )}
                
               

                

                <div className="flex flex-col items-center justify-end mt-[50px]">
                                    {/* <PrimaryButton  disabled={processing} className='p-[105px]'>
                                        Зарегистрироваться
                                    </PrimaryButton> */}
                                     <div className="flex justify-between pt-4">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Назад
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Далее
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Зарегистрироваться
                        </button>
                    )}
                </div>
                                    <div className="mt-[13px]">
                                    <span className="font-normal text-[12px] leading-[103%] text-[#696969]">
                                    Уже есть аккаунт?
                                    </span>
                                    <span className="text-[18px]"> </span>
                                    <Link
                                            href={route('login')}
                                            className="underline decoration-solid underline-offset-4 text-black text-[14px]"
                                        >
                                            Войти
                                        </Link>
                                    </div>
                                    
                                </div>
            </form>
            </div>
        </GuestLayout>
    );
}
