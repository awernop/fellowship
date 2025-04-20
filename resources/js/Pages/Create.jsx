import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
    
    const { tags } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
            title: '',
            description: '',
            preview: '',
            paid: false,
            /*path_img: '',*/
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
                    <InputLabel htmlFor="preview" value="Превью" />

                    <TextInput
                        id="preview"
                        name="preview"
                        value={data.preview}
                        className="mt-1 block w-full"
                        autoComplete="preview"
                        isFocused={true}
                        onChange={(e) => setData('preview', e.target.value)}
                        required
                    />

                    <InputError message={errors.preview} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="paid" value="Оплачиваемое" />
                    <input
                    id="paid" 
                    type="checkbox" 
                    onChange={() => setData('paid', true)}/>
                    
                    <InputError message={errors.paid} className="mt-2" />
                </div>

                <div className="mb-6">
                <label className="block text-gray-700 mb-3">Выберите интересующие темы:</label>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggleTag(tag.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${data.tags.includes(tag.id)
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {tag.title}
                        </button>
                    ))}
                </div>
                {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}
                
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
