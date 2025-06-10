import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Textarea } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';
import imageBg from '../../../public/images/create-bg.jpg';

export default function Create() {
  const [image, setImage] = useState(null);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('path_img', file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setData('path_img', null);
    document.getElementById('path_img').value = '';
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('preview', data.preview);
    formData.append('paid', data.paid);
    formData.append('contact', data.contact);
    if (data.path_img) {
      formData.append('path_img', data.path_img);
    }
    data.tags.forEach(tag => formData.append('tags[]', tag));

    post(route('posts.store'), {
      onFinish: () => reset('title'), forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Новый пост" />
      <div className="flex flex-col gap-3">
        <div className="py-12 mx-auto w-full bg-white border rounded-3xl sm:px-6 lg:px-8 ">
          <span className='font-manrope font-semibold text-[22px] leading-[103%] text-[#242424] select-none mt-[13px]'>Создать новый пост</span>
          <p className='font-manrope font-medium mt-1 text-[#696969] select-none text-[15px]'>Что вы сможете предложить в этот раз?</p>
          <form onSubmit={submit} enctype="multipart/form-data">
            <div className='flex items-start gap-5'>
              <div>
                <div className="mt-4">
                  <div className="relative group">
                    <input
                      type="file"
                      id="path_img"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                    <label
                      htmlFor="path_img"
                      className="flex flex-col items-center w-full py-[50px] px-[35px] rounded-2xl cursor-pointer text-center text-[15px] font-semibold transition duration-300 ease-in-out relative overflow-hidden"
                      style={{
                        backgroundImage: image
                          ? `url(${image})`
                          : `url(${imageBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Overlay */}
                      <div className={`absolute inset-0 ${image ? 'bg-black/40' : 'bg-white/0'} group-hover:bg-black/20 transition-all rounded-md`}></div>

                      {/* Контент */}
                      <div className="relative z-20 flex flex-col items-center">
                        {image ? (
                          <>
                            <span className="mt-2 text-white">Изменить фото</span>
                          </>
                        ) : (
                          <>
                            <span className="mt-2 text-white">Загрузить фото</span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {image ? 'Выбрано ваше изображение' : 'Будет использовано изображение по умолчанию'}
                    </span>
                    {image && (
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 mt-[14px]">
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

                  <div>
                    <InputLabel htmlFor="contact" value="Ссылка на телеграм" className='font-medium text-[14px] leading-103 text-[#696969]' />

                    <TextInput
                      id="contact"
                      name="contact"
                      value={data.contact}
                      className="mt-1 block"
                      autoComplete="contact"
                      placeholder="@никнейм"
                      isFocused={true}
                      onChange={(e) => setData('contact', e.target.value)}
                      required
                    />

                    <InputError message={errors.contact} className="mt-2" />
                    <span className='font-regular italic text-[12px] leading-103 text-gray-400'>это необходимо для последующей связи с соискателем</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4">
                  <InputLabel htmlFor="description" value="Описание" className='font-medium text-[14px] leading-103 text-[#696969] mt-[14px]' />

                  <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="w-[450px] h-[120px] rounded-2xl bg-gray-100 border-transparent  focus:border-[#8F79E4] transition duration-300 ease-in-out text-[15px]"
                    autoComplete="description"
                    placeholder="Введите описание"
                    isFocused={true}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                  />

                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Checkbox
                    id="paid"
                    onChange={() => setData('paid', true)}
                    name="paid"
                  />
                  <InputLabel htmlFor="paid" value="Эта работа будет оплачена" className='font-medium text-[14px] leading-103 text-[#696969]' />

                  <InputError message={errors.paid} className="mt-2" />
                </div>

                <div className="mb-6 w-[400px]">
                  <label className='font-medium text-[14px] leading-103 text-[#696969] block text-sm mb-2 mt-[14px]'>Выберите темы, которым соответсвует пост</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors
                                ${data.tags.includes(tag.id)
                            ? 'bg-[#7D64DD] text-white font-medium'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 font-medium'
                          }`}
                      >
                        {tag.title}
                      </button>
                    ))}
                  </div>
                  {errors.tags && <span className="text-red-500 text-sm">{errors.tags}</span>}

                </div>
                <div className="mt-4 flex items-center">
                  <PrimaryButton className="me-2 px-7" disabled={processing}>
                    Создать пост
                  </PrimaryButton>
                  <a href="dashboard" className="`inline-flex items-center rounded-xl border border-gray-200 py-[10px] px-10 text-[14px] font-semibold text-night transition duration-300 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2">Отмена</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
