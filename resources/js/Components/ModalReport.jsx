import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ModalReport({ post_id, onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    message: '',
    post_id: post_id,
  });

  const submit = (e) => {
    e.preventDefault();
    
    // Сначала создаем жалобу
    post(route('reports.store'), {
      data: {
        message: data.message,
        post_id: post_id,
      },
      onSuccess: () => {
        // После успешного создания жалобы увеличиваем счетчик
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
            &times;
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="mb-4">
            <InputLabel htmlFor="message" value="Расскажите кратко о себе и своей идее" />
            <TextInput
              id="message"
              name="message"
              value={data.message}
              className="mt-1 block w-full"
              autoComplete="off"
              isFocused={true}
              onChange={(e) => setData('message', e.target.value)}
            />
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