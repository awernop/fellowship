import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Textarea } from '@headlessui/react';

export default function ModalReport({ post_id, onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    message: '',
    contact: '',
    post_id: post_id,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('reports.store'), {
      data: {
        message: data.message,
        post_id: post_id,
      },
      onSuccess: () => {
        post(route('posts.reports.increment', { id: post_id }), {
          preserveScroll: true,
          onSuccess: () => {
            reset();
            onClose();
          }
        });
      },
      onError: (errors) => {
        console.error('Error creating report:', errors);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-100">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Предложить идею</h2>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="mb-4">
            <InputLabel htmlFor="message" value="Расскажите кратко о себе и своей идее" className='text-[#696969]'/>
            <Textarea
                                id="message"
                                name="message"
                                value={data.message}
                                className="w-full h-[120px] rounded-md bg-gray-100 border-transparent  focus:border-[#8F79E4] transition duration-300 ease-in-out text-[15px]"
                                autoComplete="message"
                                placeholder="Моя идея это..."
                                isFocused={true}
                                onChange={(e) => setData('message', e.target.value)}
                                required
                              />
            <InputError message={errors.message} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="contact" value="Ссылка на телеграм" className='text-[14px] leading-103 text-[#696969]' />

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
          </div>

          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton className="ms-4 px-8" disabled={processing}>
              {processing ? 'Отправка...' : 'Отправить'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}