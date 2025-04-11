import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const paid = [
        {id: 'false', name: 'НЕ Оплачивается'},
        {id: 'true', name: 'Оплачивается'},
    ];

    const { data, setData, post, processing, errors, reset, register } = useForm({
            title: '',
            description: '',
            paid: false,
            /*path_img: '',*/
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('posts.store'), {
                onFinish: () => reset('title'),
            });
        };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="title" value="Заголовок" />

                    <TextInput
                        id="title"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        isFocused={true}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Описание" />

                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        isFocused={true}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="paid" value="Оплачиваемое" />
                    <input
                    id="paid" 
                    type="checkbox" 
                    onChange={() => setData('paid', true)}/>
                    
                    <InputError message={errors.paid} className="mt-2" />
                </div>


                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        СОЗДАТЬ
                    </PrimaryButton>
                </div>
            </form>
            </div>
        </AuthenticatedLayout>
    );
}
