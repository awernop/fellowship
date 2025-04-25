import ApplicationLogoMini from '@/Components/ApplicationLogoMini';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const [isTopBannerVisible, setIsTopBannerVisible]=useState(true);

  const closeBanner = () => {
    setIsTopBannerVisible(false);
  };

  return (
    <div className="min-h-screen bg-elephant">
      {isTopBannerVisible && (
        <div className="h-[35px] bg-gray-100 flex items-center justify-center w-full relative text-[14px]">
          <p className="font-normal">Давайте изменим мир Вместе!</p>
          <a href="#" className="ml-2 font-bold">Узнать больше о проекте</a>
          
          {/* Кнопка закрытия */}
          <button 
            onClick={closeBanner}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 font-extrabold text-gray-500 hover:text-gray-700"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
      )}
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <ApplicationLogoMini className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
              </div>

            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3 flex gap-8 items-center">
                <a href="/login" className="font-medium text-[15px] leading-103 text-[#696969]">Войти</a>
                <a href="/register" className="inline-flex items-center rounded-lg border border-transparent bg-flower py-2 px-7 text-[15px] font-semibold text-white transition duration-150 ease-in-out hover:bg-[#564be9] focus:bg-[#564be9] focus:outline-none focus:ring-2">Создать аккаунт</a>
              </div>
            </div>


          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? 'block' : 'hidden') +
            ' sm:hidden'
          }
        >
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink
              href={route('dashboard')}
              active={route().current('dashboard')}
            >
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="border-t border-gray-200 pb-1 pt-4">
            <div className="px-4">
              <div className="relative ms-3 flex">
                <a href="/login">Войти</a>
                <a href="/register">Создать аккаунт</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
