import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title='Снова Вместе!' subtitle='Еще немного и мы снова Вместе' className='w-[350px]'>

            <Head title="Логин" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="login" value="Логин" className='font-medium text-[14px] leading-103 text-[#696969]'/>

                    <TextInput
                        id="login"
                        type="text"
                        name="login"
                        placeholder="Введите свой логин"
                        value={data.login}
                        className="mt-1 block"
                        autoComplete="current-login"
                        onChange={(e) => setData('login', e.target.value)}
                    />

                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Пароль" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]'/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Введите свой пароль"
                        value={data.password}
                        className="mt-1 block"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 text-[14px]">
                            Запомнить меня на этом компьютере
                        </span>
                    </label>
                </div>

                <div className="flex flex-col items-center justify-end mt-[50px]">
                    <PrimaryButton  disabled={processing} className='p-[150px]'>
                        Войти
                    </PrimaryButton>
                    <div className="mt-[13px]">
                    <span className="font-normal leading-[103%] text-[13px] text-[#57595C]">
                    Еще нет аккаутна?
                    </span>
                    <span className="text-[18px]"> </span>
                    <Link
                            href={route('register')}
                            className="underline decoration-solid underline-offset-4 text-night text-[13px]"
                        >
                            Зарегистрироваться
                        </Link>
                    </div>
                    
                </div>
            </form>
        </GuestLayout>
    );
}
