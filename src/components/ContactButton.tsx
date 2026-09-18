interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export default function ContactButton({
  label = 'Contact Me',
  href = 'mailto:rafaelporgatorio133@gmail.com',
  onClick,
  className = '',
  compact = false,
}: ContactButtonProps) {
  const sizeClasses = compact
    ? 'px-6 py-2.5 text-xs sm:text-sm'
    : 'px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base';

  const sharedClassName = `rounded-full ${sizeClasses} text-white font-medium uppercase tracking-widest transition-transform duration-200 hover:scale-[1.03] inline-block text-center ${className}`;
  const sharedStyle = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  if (onClick) {
    return (
      <button onClick={onClick} className={sharedClassName} style={sharedStyle}>
        {label}
      </button>
    );
  }

  return (
    <a href={href} className={sharedClassName} style={sharedStyle}>
      {label}
    </a>
  );
}
