import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ModalClaim({ post_id, onClose }) {
  const [reason, setReason] = useState('');
  
  const { data, setData, post, processing, errors, reset } = useForm({
    reason: '',
    post_id: post_id,
  });

  const submit = (e) => {
    e.preventDefault();
    
    post(route('claims.store'), {
      data: {
        reason: data.reason,
        post_id: post_id,
      },
      onSuccess: () => {
            reset();
            onClose();
          },
      onError: (errors) => {
        console.error('Error creating report:', errors);
      }
    });
  };

  const reasons = [
        { value: 'Содержание сексуального характера', label: 'Содержание сексуального характера' },
        { value: 'Жестокое или отталкивающее содержание', label: 'Жестокое или отталкивающее содержание' },
        { value: 'Дискриминационные высказывания и оскорбления', label: 'Дискриминационные высказывания и оскорбления' },
        { value: 'Вредные или опасные действия', label: 'Вредные или опасные действия' },
        { value: 'Спам', label: 'Спам' }
    ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-200">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Пожаловаться на пост</h2>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="mb-4">
            <InputLabel htmlFor="message" value="Причина жалобы" />
            {reasons.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                type="radio"
                                id={`reason-${option.value}`}
                                name="reason"
                                value={option.value}
                                checked={reason === option.value}
                                onChange={() => setReason(option.value)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <label 
                                htmlFor={`reason-${option.value}`} 
                                className="ml-3 block text-sm font-medium text-gray-700"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
            <InputError message={errors.message} className="mt-2" />
          </div>

          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton className="ms-4" disabled={processing}>
              {processing ? 'Отправка...' : 'ОТПРАВИТЬ'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}