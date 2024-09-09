import { JSX } from 'solid-js';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: Event) => void;
  class?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: JSX.Element | JSX.Element[];
}

export default function Button(props: ButtonProps): JSX.Element {
  const variant = props.variant || 'primary';

  const variants = {
    primary:
      'bg-blue-700 text-white border border-blue-600 p-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out',
    secondary:
      'bg-green-700 text-white border border-green-600 p-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out',
  };

  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      class={`${variants[variant]} ${props.class || ''}`}
    >
      {props.children}
    </button>
  );
}
