export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded bg-gray-100 border-none text-flower shadow-sm focus:ring-flower focus: transition duration-300 ease-in-out' +
                className
            }
        />
    );
}
