import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Textarea, Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.username,
            description: user.description,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Информация профиля
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Измените информацию профиля
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="username" value="Имя пользователя" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Описание профиля" />

                    <Textarea
                        id="description"
                        className="mt-1 block w-full rounded-md border-[#c0c0c0] shadow-sm focus:border-flower focus: transition duration-300 ease-in-out text-[15px] resize-none"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        isFocused
                        autoComplete="description"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className='px-[50px]'>Сохранить</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Изменения сохранены
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
