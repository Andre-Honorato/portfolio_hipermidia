import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const trabalhos = defineCollection({
  loader: glob({ base: './src/content/trabalhos', pattern: '**/*.md' }),
  schema: z.object({
    numero: z.number().int().positive(),
    titulo: z.string(),
    resumo: z.string().max(200),
    tipo: z.enum(['video', 'audio']),
    data: z.coerce.date(),
    duracao: z.string(), // formato "mm:ss" ou "hh:mm:ss"
    ferramentas: z.array(z.string()).default([]),
    /** Identidade visual: tom da arte de capa e composição abstrata. */
    tom: z.enum(['petroleo', 'ambar', 'ciano', 'grafite']).default('petroleo'),
    arte: z.enum(['aurora', 'prisma', 'onda']).default('aurora'),
    equipe: z.array(z.string()).default(['André Honorato']),
    midia: z
      .object({
        youtube: z.string().optional(), // ID do vídeo no YouTube (ex.: oUGwXLv1s_M)
        src: z.string().optional(), // arquivo servido pelo site (ex.: /midia/audio.mp3)
        poster: z.string().optional(), // capa 16:9 (ex.: /midia/capa.jpg)
        legendas: z.string().optional(), // WebVTT, só para vídeo servido pelo site
      })
      .default({}),
    transcricao: z.string().optional(),
  }),
});

export const collections = { trabalhos };
