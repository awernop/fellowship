import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';

export default function Archive({ posts, users, reports }) {

    return (
        <AuthenticatedLayout>
            <Head title="Панель администратора" />
            
        </AuthenticatedLayout>
    );
}