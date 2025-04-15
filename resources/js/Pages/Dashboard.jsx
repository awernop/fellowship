import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';

export default function Dashboard({ posts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <a class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-350" href={route('posts.create')}>
                    СОЗДАТЬ
                </a>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {posts.map((item) => (
                            <div>
                                <p>{item.title}</p>
                                <p>{item.description}</p>
                                <p>кол-во откликов: 
                                    {item.reports_count===null?<span>0</span>:<span>{item.reports_count}</span>}
                                </p>
                                <a class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-350" onClick={() => setIsModalOpen(true)}>
                                    У МЕНЯ ЕСТЬ ИДЕЯ
                                </a>
                                {isModalOpen && (
                                    <ModalReport
                                        post_id={item.id}
                                        onClose={() => setIsModalOpen(false)}
                                    />
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
