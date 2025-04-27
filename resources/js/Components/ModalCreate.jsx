import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Textarea } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';

export default function ModalCreate({ onClose }) {
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
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={onClose} // Закрытие при клике на фон
        >
            <div 
                className="bg-white rounded-lg p-6 max-w-4xl w-full mx-auto my-8 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на контент
            >
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2 z-10">
                    <h2 className="text-2xl font-bold text-gray-800">Создать новый пост</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="space-y-6">
                        {/* Блок загрузки изображения */}
                        <div>
                            <div className="group relative">
                                <input
                                    type="file"
                                    id="path_img"
                                    name="path_img"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                                <div className="flex flex-col items-center justify-center w-full py-16 border-2 border-dashed border-gray-300 rounded-lg group-hover:border-indigo-500 transition-colors duration-300">
                                    {data.path_img ? (
                                        <>
                                            <img 
                                                src={URL.createObjectURL(data.path_img)} 
                                                alt="Preview" 
                                                className="max-h-40 mb-2 rounded"
                                            />
                                            <span className="text-indigo-600 font-medium">Изменить изображение</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" className="mb-2">
                                                <path d="M22.4582 32.6666V16.027L17.1498 21.3354L14.2915 18.375L24.4998 8.16663L34.7082 18.375L31.8498 21.3354L26.5415 16.027V32.6666H22.4582ZM12.2498 40.8333C11.1269 40.8333 10.166 40.4338 9.367 39.6348C8.56803 38.8359 8.16787 37.8742 8.1665 36.75V30.625H12.2498V36.75H36.7498V30.625H40.8332V36.75C40.8332 37.8729 40.4337 38.8345 39.6347 39.6348C38.8357 40.4352 37.8741 40.8347 36.7498 40.8333H12.2498Z" fill="#4E43E5" />
                                            </svg>
                                            <span className="text-gray-600 font-medium">Перетащите изображение или нажмите для загрузки</span>
                                            <span className="text-gray-400 text-sm mt-1">Рекомендуемый размер: 1200×630px</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.path_img} className="mt-2" />
                        </div>

                        {/* Блок заголовка и превью */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="title" value="Заголовок" />
                                <TextInput
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    placeholder="Введите заголовок"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="preview" value="Превью" />
                                <TextInput
                                    id="preview"
                                    name="preview"
                                    value={data.preview}
                                    className="mt-1 block w-full"
                                    placeholder="Краткое описание"
                                    onChange={(e) => setData('preview', e.target.value)}
                                    required
                                />
                                <InputError message={errors.preview} className="mt-2" />
                            </div>
                        </div>

                        {/* Блок описания */}
                        <div>
                            <InputLabel htmlFor="description" value="Описание" />
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full min-h-[150px]"
                                placeholder="Подробное описание вашего поста"
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Блок тегов */}
                        <div>
                            <InputLabel value="Теги" />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => toggleTag(tag.id)}
                                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                            data.tags.includes(tag.id)
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                    >
                                        {tag.title}
                                    </button>
                                ))}
                            </div>
                            <InputError message={errors.tags} className="mt-2" />
                        </div>

                        {/* Чекбокс платного контента */}
                        <div className="flex items-center">
                            <Checkbox
                                id="paid"
                                checked={data.paid}
                                onChange={(e) => setData('paid', e.target.checked)}
                                name="paid"
                            />
                            <InputLabel htmlFor="paid" value="Платный контент" className="ml-2" />
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                                disabled={processing}
                            >
                                Отмена
                            </button>
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'Создание...' : 'Создать пост'}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}