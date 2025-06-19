import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ModalPost from '@/Components/ModalCreate';
import SideNavigation from '@/Components/SideNavigation';

export default function AuthenticatedLayout({ header, children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = auth.user?.role === 'admin';

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);

    const closeBanner = () => {
        setIsTopBannerVisible(false);
    };

    return (
        <div className="min-h-screen">
            <main>
                <div className="flex h-screen bg-[#F8F7FB]">
                {/* Зафиксированная часть */}
                <div className="w-55 flex-shrink-0 pt-3 sticky top-0 bg-[#F8F7FB]">
                    <SideNavigation />
                </div>
                {/* Часть с прокруткой */}
                <div className="flex flex-col gap-3 w-full overflow-y-auto pb-10 mx-2 py-6">
                    {children}
                </div>

            </div>
            </main>

            {isModalOpen && (
                <ModalPost
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}