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
                `inline-flex items-center rounded-md bg-night py-[10px] text-[14px] font-semibold text-white transition duration-150 ease-in-out hover:bg-[#37393F] focus:bg-[#37393F] focus:outline-none focus:ring-2  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
