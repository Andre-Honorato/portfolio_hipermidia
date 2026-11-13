import { site } from '../data/site';
import { duracaoIso, urlTrabalho, type Trabalho } from './trabalhos';

const absoluta = (caminho: string) => new URL(caminho, site.url).toString();

export const autorLd = {
  '@type': 'Person',
  name: site.autor,
  url: site.url,
};

export const cursoLd = {
  '@type': 'Course',
  name: site.disciplina,
  description: `Disciplina do ${site.periodo} do curso de ${site.curso} do ${site.instituicaoSigla}, campus ${site.campus}, ministrada por ${site.docentes.join(' e ')}.`,
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite',
    instructor: site.docentes.map((nome) => ({ '@type': 'Person', name: nome })),
  },
  inLanguage: site.idioma,
  provider: {
    '@type': 'CollegeOrUniversity',
    name: `${site.instituicao}, Campus ${site.campus}`,
    alternateName: `${site.instituicaoSigla} ${site.campus}`,
  },
};

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nome,
    url: absoluta('/'),
    inLanguage: site.idioma,
    description: site.descricao,
    author: autorLd,
  };
}

export function colecaoLd(trabalhos: Trabalho[], caminho = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${site.nome}: trabalhos de ${site.autor}`,
    url: absoluta(caminho),
    inLanguage: site.idioma,
    author: autorLd,
    about: cursoLd,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: trabalhos.length,
      itemListElement: trabalhos.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluta(urlTrabalho(t)),
        name: t.data.titulo,
      })),
    },
  };
}

export function trabalhoLd(trabalho: Trabalho) {
  const { titulo, resumo, tipo, data, duracao, midia, transcricao, equipe } = trabalho.data;
  return {
    '@context': 'https://schema.org',
    '@type': tipo === 'video' ? 'VideoObject' : 'AudioObject',
    name: titulo,
    description: resumo,
    url: absoluta(urlTrabalho(trabalho)),
    uploadDate: data.toISOString(),
    duration: duracaoIso(duracao),
    inLanguage: site.idioma,
    thumbnailUrl: absoluta(midia.poster ?? '/og.png'),
    ...(midia.src && { contentUrl: absoluta(midia.src) }),
    ...(midia.youtube && { embedUrl: `https://www.youtube-nocookie.com/embed/${midia.youtube}` }),
    ...(transcricao && { transcript: transcricao }),
    creator: equipe.map((nome) => ({ '@type': 'Person', name: nome })),
    isPartOf: cursoLd,
  };
}

export function trilhaLd(passos: { rotulo: string; caminho: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: passos.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.rotulo,
      item: absoluta(p.caminho),
    })),
  };
}
