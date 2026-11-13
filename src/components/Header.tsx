import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Play, Sun, X } from 'lucide-react';
import { alternarTema, temaEscuroAtivo } from '../lib/theme';
import type { LinkNavegacao } from '../data/site';

interface Props {
  links: LinkNavegacao[];
  ativo?: string;
  /** Destino do botão "Assistir". */
  destaque: string;
}

export default function Header({ links, ativo, destaque }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [escuro, setEscuro] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setEscuro(temaEscuroAtivo());

    const observador = new MutationObserver(() => setEscuro(temaEscuroAtivo()));
    observador.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });

    const consulta = window.matchMedia('(min-width: 1024px)');
    const aoMudarLargura = (evento: MediaQueryListEvent) => {
      if (evento.matches) setMenuAberto(false);
    };
    consulta.addEventListener('change', aoMudarLargura);

    return () => {
      observador.disconnect();
      window.removeEventListener('scroll', aoRolar);
      consulta.removeEventListener('change', aoMudarLargura);
    };
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setMenuAberto(false);
        botaoMenu.current?.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [menuAberto]);

  const aoAlternarTema = () => setEscuro(alternarTema());
  const rotuloTema = escuro ? 'Ativar tema claro' : 'Ativar tema escuro';

  return (
    <header className="sticky top-0 z-50 frame pt-3">
      <div
        className={`rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ${
          rolou || menuAberto
            ? 'bg-surface/85 backdrop-blur-xl border-hairline shadow-[0_12px_32px_-18px_rgb(0_0_0/0.35)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center gap-3 h-16 pl-3 pr-2 sm:pl-4">
          <a href="/" className="group flex items-center gap-3 min-h-11 shrink-0 mr-auto" aria-label="Início: André Honorato, Hipermídia e Multimídia">
            <span
              aria-hidden="true"
              className="grid place-items-center w-9 h-9 rounded-[0.625rem] bg-accent text-on-accent shadow-[0_6px_16px_-6px_var(--accent)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current translate-x-[1px]" strokeWidth={2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-semibold text-[0.9375rem] tracking-[-0.01em]">André Honorato</span>
              <span className="text-[0.75rem] font-medium text-ink-soft mt-1">Hipermídia e Multimídia</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={ativo === link.rotulo ? 'page' : undefined}
                    className="inline-flex items-center min-h-11 px-3.5 rounded-lg font-medium text-[0.9375rem] text-ink-soft transition-colors hover:text-ink hover:bg-surface-2 aria-[current=page]:text-ink"
                  >
                    {link.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={aoAlternarTema}
            aria-label={rotuloTema}
            title={rotuloTema}
            className="shrink-0 grid place-items-center w-11 h-11 rounded-xl border border-hairline text-ink-soft hover:text-ink hover:bg-surface-2 transition-[color,background-color,transform] duration-300 active:scale-95"
          >
            <Sun className="w-[1.125rem] h-[1.125rem] hidden dark:block" strokeWidth={1.75} aria-hidden="true" />
            <Moon className="w-[1.125rem] h-[1.125rem] dark:hidden" strokeWidth={1.75} aria-hidden="true" />
          </button>

          <a href={destaque} className="group btn btn-primary hidden sm:inline-flex min-h-11 h-11 px-4">
            Assistir
            <ArrowUpRight className="w-4 h-4 arrow-go" strokeWidth={2} aria-hidden="true" />
          </a>

          <button
            ref={botaoMenu}
            type="button"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="menu-movel"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="lg:hidden shrink-0 grid place-items-center w-11 h-11 rounded-xl border border-hairline active:scale-95 transition-transform"
          >
            {menuAberto ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
          </button>
        </div>

        <div id="menu-movel" className={`mobile-menu lg:hidden${menuAberto ? ' is-open' : ''}`}>
          <nav aria-label="Principal (móvel)" className="overflow-hidden">
            <ul className="grid gap-1.5 px-2 pb-2 pt-1">
              {links.map((link, indice) => (
                <li
                  key={link.href}
                  className="transition-[opacity,translate] duration-500"
                  style={{
                    opacity: menuAberto ? 1 : 0,
                    translate: menuAberto ? '0 0' : '0 -6px',
                    transitionDelay: menuAberto ? `${60 + indice * 40}ms` : '0ms',
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuAberto(false)}
                    aria-current={ativo === link.rotulo ? 'page' : undefined}
                    tabIndex={menuAberto ? undefined : -1}
                    className="flex items-center justify-between gap-4 min-h-13 px-4 rounded-xl bg-surface-2 font-medium text-lg tracking-[-0.01em]"
                  >
                    {link.rotulo}
                    <ArrowUpRight className="w-4 h-4 text-ink-soft" strokeWidth={2} aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={destaque}
                  onClick={() => setMenuAberto(false)}
                  tabIndex={menuAberto ? undefined : -1}
                  className="btn btn-primary w-full sm:hidden"
                >
                  <Play className="w-4 h-4 fill-current" strokeWidth={2} aria-hidden="true" />
                  Assistir agora
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
