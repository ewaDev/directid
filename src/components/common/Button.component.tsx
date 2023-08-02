import React from "react";

type Props = {
    disabled?: boolean,
    onClick: () => void
    label: string
}

export const Button: React.FC<Props> = ({ onClick, disabled = false, label }) => {
    return (
        <button className={'bg-blue-600 enabled:hover:bg-blue-700 text-white font-bold small-text rounded-full py-2 px-4 rounded-full m-5 disabled:opacity-25'}
                onClick={onClick}
                disabled={disabled}
        >
            {label}
        </button>

    );
};

export default Button
