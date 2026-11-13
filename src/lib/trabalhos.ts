import { getCollection, type CollectionEntry } from 'astro:content';

export type Trabalho = CollectionEntry<'trabalhos'>;

export const rotuloTipo: Record<Trabalho['data']['tipo'], string> = {
  video: 'Vídeo',
  audio: 'Áudio',
};

export async function listarTrabalhos(): Promise<Trabalho[]> {
  const todos = await getCollection('trabalhos');
  return todos.sort((a, b) => a.data.numero - b.data.numero);
}

export function numeroFormatado(numero: number): string {
  return String(numero).padStart(2, '0');
}

export function urlTrabalho(trabalho: Trabalho): string {
  return `/trabalhos/${trabalho.id}/`;
}

const formatoData = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatoDataCompleta = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "16 set 2026" */
export function dataCompleta(data: Date): string {
  return formatoDataCompleta.format(data).replace(/\./g, '').replace(/ de /g, ' ');
}

export function dataCurta(data: Date): string {
  return formatoData.format(data).replace('.', '').replace(' de ', ' ');
}

/** Converte "mm:ss" / "hh:mm:ss" para duração ISO 8601 (schema.org). */
export function duracaoIso(duracao: string): string {
  const partes = duracao.split(':').map(Number);
  const [h, m, s] = partes.length === 3 ? partes : [0, ...partes];
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || 'PT0S';
}

/** Duração legível para leitores de tela: "4 minutos e 32 segundos". */
export function duracaoExtenso(duracao: string): string {
  const partes = duracao.split(':').map(Number);
  const [h, m, s] = partes.length === 3 ? partes : [0, ...partes];
  const plural = (n: number, palavra: string) => `${n} ${palavra}${n === 1 ? '' : 's'}`;
  return [h && plural(h, 'hora'), m && plural(m, 'minuto'), s && plural(s, 'segundo')]
    .filter(Boolean)
    .join(' e ');
}

/** Paleta da arte de capa de cada tom (igual nos dois temas). */
export const paletaTom: Record<Trabalho['data']['tom'], [string, string, string]> = {
  petroleo: ['#0f6f7a', '#1aa3a3', '#1f4f7a'],
  ambar: ['#c9662a', '#a8324a', '#d9a04a'],
  ciano: ['#168f9c', '#2a5fa8', '#5fc9d6'],
  grafite: ['#3a4a55', '#1f6f7a', '#5a6b78'],
};

/** Soma as durações ("mm:ss") e devolve minutos arredondados. */
export function minutosTotais(trabalhos: Trabalho[]): number {
  const segundos = trabalhos.reduce((total, t) => {
    const partes = t.data.duracao.split(':').map(Number);
    const [h, m, s] = partes.length === 3 ? partes : [0, ...partes];
    return total + h * 3600 + m * 60 + s;
  }, 0);
  return Math.round(segundos / 60);
}
