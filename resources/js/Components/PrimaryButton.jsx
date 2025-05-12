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
                `inline-flex items-center rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1),inset_0_-2px_8px_0_rgba(255,255,255,0.4)] bg-flower py-[12px] text-[14px] font-semibold text-white transition duration-150 ease-in-out hover:bg-bloom focus:bg-bloom focus:outline-none focus:ring-2  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
