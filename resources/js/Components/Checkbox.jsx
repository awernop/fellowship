export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#0068ff] shadow-sm focus:ring-[#0068ff] focus: transition duration-300 ease-in-out' +
                className
            }
        />
    );
}
