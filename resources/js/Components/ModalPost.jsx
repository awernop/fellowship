import { usePage } from '@inertiajs/react';

export default function ModalPost({ post, onClose }) {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на контент
          >
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">{post.title}</h2>
                  <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                      &times;
                  </button>
              </div>
              {post?.path_img && (
                                        <img
                                            src={`/images/${post.path_img}`}
                                            alt="Work image"
                                        />
                                    )}

              <div className="mb-3">
                  <h3 className="font-semibold">Превью:</h3>
                  <p>{post.preview}</p>
              </div>

              <div>
                  <h3 className="font-semibold">Описание:</h3>
                  <p>{post.description}</p>
              </div>
          </div>
      </div>
  );
}