
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';


export default function ModalReport ({post_id, onClose}){


  const { data, setData, post, processing, errors, reset } = useForm({
      message: '',
      post_id: post_id,
  });

  const submit = (e) => {
      e.preventDefault();
      post(route('reports.store'), {
          onFinish: () => onClose()
      });
  };

  return(
      <div>
          <button
              onClick={() => {
                  onClose();
                  reset();
              }}
              className="text-gray-500 hover:text-gray-700"
          >
              &times;
          </button>
          <form onSubmit={submit}>
              <div>
                  <InputLabel htmlFor="message" value="Расскадите кратко о себе и своей идее" />

                  <TextInput
                      id="message"
                      name="message"
                      value={data.message}
                      className="mt-1 block w-full"
                      autoComplete="message"
                      isFocused={true}
                      onChange={(e) => setData('message', e.target.value)}
                  />
              </div>

              <input 
            type="hidden" 
            name="post_id" 
            value={post_id} 
          />

              <div className="mt-4 flex items-center justify-end">
                  <PrimaryButton className="ms-4" disabled={processing}>
                      СОЗДАТЬ
                  </PrimaryButton>
              </div>
          </form>
      </div>
  )

}
