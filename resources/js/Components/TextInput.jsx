import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-[350px] rounded-xl border-gray-200 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] focus:border-flower focus: transition duration-300 ease-in-out text-[15px] ' +
                className
            }
            ref={localRef}
        />
    );
});
