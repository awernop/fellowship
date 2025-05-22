import ApplicationLogoMini from '@/Components/ApplicationLogoMini';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex justify-center items-start bg-[#FFFFFF] pt-6 sm:justify-center sm:items-center sm:pt-0 gap-[69px]">
            <div className="flex flex-col items-start">
                <div>
                    <Link href="/">
                        <ApplicationLogoMini className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                    <div className="mt-4">
                    <span className='font-manrope font-bold text-[32px] leading-[103%] text-[#242424] select-none mt-[13px]'>{title}</span>
                    <p className='font-manrope font-medium mt-1 text-[#696969] select-none text-[22px]'>{subtitle}</p>
                    </div>
                </div>

                <div className="mt-[20px] flex items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
