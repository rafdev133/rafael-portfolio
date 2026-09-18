interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export default function LiveProjectButton({
  label = 'Live Project',
  href,
  onClick,
  className = '',
  compact = false,
}: LiveProjectButtonProps) {
  const sizeClasses = compact
    ? 'px-6 py-2.5 text-xs sm:text-sm'
    : 'px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base';

  const sharedClassName = `rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-200 hover:bg-[#D7E2EA]/10 hover:scale-[1.03] inline-block text-center ${sizeClasses} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={sharedClassName}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={sharedClassName}>
      {label}
    </button>
  );
}
