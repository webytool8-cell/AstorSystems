"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";
import { Icon } from "./icons";
import { Logo } from "./logo";
import { Container, cx } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.href) ? "text-ink font-medium" : "text-muted hover:text-ink",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact?type=consultation" className="text-sm text-muted hover:text-ink">
            Book a consultation
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            <Icon name="assistant" className="h-4 w-4" />
            Get a free proposal
          </Link>
        </div>
        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container className="py-6">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line border-y border-line">
                {[...mainNav, { href: "/custom-projects", label: "Custom Projects" }, { href: "/contact", label: "Contact & Consultations" }].map(
                  (item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cx(
                          "flex items-center justify-between py-4 text-lg",
                          isActive(item.href) ? "font-medium text-ink" : "text-ink/80",
                        )}
                      >
                        {item.label}
                        <Icon name="arrow-right" className="h-4 w-4 text-muted-2" />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <Link
              href="/start"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-white"
            >
              <Icon name="assistant" className="h-4 w-4" />
              Get a free proposal
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
