export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg border border-transparent bg-[#0068ff] py-[12px] px-[45%] text-[14px] font-semibold text-white transition duration-150 ease-in-out hover:bg-[#2879EF] focus:bg-[#2879EF] focus:outline-none focus:ring-2  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
