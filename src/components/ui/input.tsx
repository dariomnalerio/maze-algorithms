import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';

type InputProps = JSX.IntrinsicElements['input'] & {
  onInput?: (event: Event) => void;
  class?: string;
};

export default function Input(props: InputProps): JSX.Element {
  const [local, rest] = splitProps(props, ['onInput', 'class']);

  return (
    <input
      onInput={local.onInput}
      class={`bg-gray-800 text-white border border-gray-600 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-700 backdrop-blur-sm transition duration-200 ease-in-out ${
        local.class || ''
      }`}
      {...rest}
    />
  );
}
