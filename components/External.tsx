"use client";

import { usePrefs } from "@/components/prefs";

export function External({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { t } = usePrefs();
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="sr-only">, {t.newTab}</span>
    </a>
  );
}
