import type { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export default function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 text-[#D7E2EA]/80 hover:text-white text-sm transition-colors duration-200"
    >
      {icon}
      <span>{label}</span>
      <span className="text-xs">↗</span>
    </a>
  );
}
