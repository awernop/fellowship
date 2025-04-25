import ApplicationLogoMini from '@/Components/ApplicationLogoMini';
import { Link } from '@inertiajs/react';
import image from '../../images/register.jpg';

export default function GuestLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#FFFFFF] pt-6 sm:justify-center sm:items-center sm:pt-0 gap-[69px]">
            <div className="mt-[46px] flex flex-col items-center">
                <div>
                    <Link href="/">
                        <ApplicationLogoMini className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                    <div className="mt-[30px]">
                    <span className='font-manrope font-semibold text-[22px] leading-[103%] text-[#242424] select-none mt-[13px]'>{title}</span>
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
