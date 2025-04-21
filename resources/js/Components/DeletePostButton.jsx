import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function DeletePostButton({ post }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmDelete = () => {
        setConfirmingDeletion(true);
    };

    const deletePost = () => {
        destroy(route('posts.destroy', post.id), {
            onSuccess: () => setConfirmingDeletion(false),
        });
    };

    return (
        <>
            <button
                onClick={confirmDelete}
                className="text-red-600 hover:text-red-900"
            >
                Удалить
            </button>

            <Modal show={confirmingDeletion} onClose={() => setConfirmingDeletion(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Вы уверены, что хотите удалить этот пост?
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                            onClick={() => setConfirmingDeletion(false)}
                        >
                            Отмена
                        </button>
                        <button
                            onClick={deletePost}
                            disabled={processing}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            {processing ? 'Удаление...' : 'Удалить'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}