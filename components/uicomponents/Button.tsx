type ButtonProps = {
  title: string;
  css: string;
  disabled?: boolean;
  onclick?: () => void;
  children?: React.ReactNode;
};

export default function Button({
  title,
  css,
  disabled,
  onclick,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onclick}
      className={`${css} py-2 rounded-md text-sm font-medium transition-colors duration-200`}
      disabled={disabled}
    >
      {children ? children : title}
    </button>
  );
}
