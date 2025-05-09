import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Textarea } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';

export default function Create() {
    const { tags } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        preview: '',
        paid: false,
        path_img: null,
        tags: [],
    });

    const toggleTag = (tagId) => {
        setData('tags', data.tags.includes(tagId)
            ? data.tags.filter(id => id !== tagId)
            : [...data.tags, tagId]
        );
    };

    const handleFileChange = (e) => {
        setData('path_img', e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('preview', data.preview);
        formData.append('paid', data.paid);
        formData.append('path_img', data.path_img);
        data.tags.forEach(tag => formData.append('tags[]', tag));

        post(route('posts.store'), {
            onFinish: () => reset('title'), forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Новый пост
                </h2>
            }
        >
            <Head title="Новый пост" />

            <div className="py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <span className='font-manrope font-semibold text-[22px] leading-[103%] text-[#242424] select-none mt-[13px]'>Создать новый пост</span>
                <p className='font-manrope font-medium mt-1 text-[#696969] select-none text-[15px]'>Что вы сможете предложить в этот раз?</p>
                <form onSubmit={submit} enctype="multipart/form-data">
                    <div className="mt-4">
                        <div className="group relative">
                            <input
                                type="file"
                                id="path_img"
                                name="path_img"
                                onChange={(e) => setData('path_img', e.target.files[0] || null)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center w-full py-[50px] px-[350px] bg-indigo-100 text-indigo-700 rounded-md group-hover:bg-indigo-200 cursor-pointer text-center text-[15px] font-semibold focus: transition duration-300 ease-in-out">
                            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.4582 32.6666V16.027L17.1498 21.3354L14.2915 18.375L24.4998 8.16663L34.7082 18.375L31.8498 21.3354L26.5415 16.027V32.6666H22.4582ZM12.2498 40.8333C11.1269 40.8333 10.166 40.4338 9.367 39.6348C8.56803 38.8359 8.16787 37.8742 8.1665 36.75V30.625H12.2498V36.75H36.7498V30.625H40.8332V36.75C40.8332 37.8729 40.4337 38.8345 39.6347 39.6348C38.8357 40.4352 37.8741 40.8347 36.7498 40.8333H12.2498Z" fill="#4E43E5" />
</svg>
                                <label
                                    htmlFor="path_img"
                                    
                                >
                                    Выберите файл
                                </label>
                            </div>
                        </div>

                        <InputError message={errors.path_img} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4 mt-[14px]">
                    <div>
                        <InputLabel htmlFor="title" value="Заголовок" className='font-medium text-[14px] leading-103 text-[#696969]' />

                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 block"
                            autoComplete="title"
                            placeholder="Введите заголовок"
                            isFocused={true}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="preview" value="Превью" className='font-medium text-[14px] leading-103 text-[#696969]' />

                        <TextInput
                            id="preview"
                            name="preview"
                            value={data.preview}
                            className="mt-1 block"
                            autoComplete="preview"
                            placeholder="Введите превью"
                            isFocused={true}
                            onChange={(e) => setData('preview', e.target.value)}
                            required
                        />

                        <InputError message={errors.preview} className="mt-2" />
                    </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Описание" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]' />

                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-[550px] rounded-md border-[#c0c0c0] shadow-sm focus:border-flower focus: transition duration-300 ease-in-out text-[15px] resize-none"
                            autoComplete="description"
                            placeholder="Введите описание"
                            isFocused={true}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                        />

                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <Checkbox
                            id="paid"
                            onChange={() => setData('paid', true)}
                            name="paid"
                        />
                        <InputLabel htmlFor="paid" value="Эта работа будет оплачена" className='font-medium text-[14px] leading-103 text-[#696969]' />

                        <InputError message={errors.paid} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <label className='font-medium text-[14px] leading-103 text-[#696969] block text-sm mb-2 mt-[14px]'>Выберите темы, которым соответсвует пост:</label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => toggleTag(tag.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${data.tags.includes(tag.id)
                                            ? 'bg-flower text-white'
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
                        <a href="dashboard" className="`inline-flex items-center rounded-lg border-2 border-gray-200 py-[12px] px-[50px] text-[14px] font-semibold text-night transition duration-150 ease-in-out hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2">Отмена</a>
                        <PrimaryButton className="ms-4 px-[50px]" disabled={processing}>
                            Создать пост
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
