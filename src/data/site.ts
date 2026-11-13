import {
  AudioWaveform,
  Clapperboard,
  FileText,
  Film,
  Layers,
  Scissors,
  SlidersHorizontal,
  Volume1,
  Volume2,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';

/** Dados globais do portfólio. */
export const site = {
  url: 'https://hipermidia.andrehonorato.com.br',
  nome: 'Hipermídia e Multimídia',
  autor: 'André Honorato',
  disciplina: 'Hipermídia e Multimídia',
  instituicao: 'Instituto Federal de São Paulo',
  instituicaoSigla: 'IFSP',
  campus: 'Birigui',
  curso: 'Tecnologia em Sistemas para Internet',
  cursoSigla: 'TSI',
  periodo: '6º semestre',
  ano: 2026,
  docentes: ['Renato Correia de Barros', 'Karina Mitiko Toma'],
  descricao:
    'Portfólio de André Honorato com os trabalhos de edição de áudio e vídeo da disciplina Hipermídia e Multimídia, do curso de Tecnologia em Sistemas para Internet do IFSP Birigui.',
  idioma: 'pt-BR',
  locale: 'pt_BR',
} as const;

export interface LinkNavegacao {
  rotulo: string;
  href: string;
}

export const navegacao: LinkNavegacao[] = [
  { rotulo: 'Trabalhos', href: '/#trabalhos' },
  { rotulo: 'Ferramentas', href: '/#ferramentas' },
  { rotulo: 'Técnicas', href: '/#tecnicas' },
  { rotulo: 'Disciplina', href: '/#disciplina' },
  { rotulo: 'Sobre mim', href: '/#sobre' },
];

/** Seção "Sobre mim": só o que tem relação com o curso e a disciplina. */
export const sobreMim = {
  foto: '/midia/andre-honorato.webp',
  fotoAlt: 'André Honorato, de camiseta preta e corrente prateada, sorrindo para a câmera.',
  funcao: 'Sistemas para Internet',
  /** Slug do trabalho favorito. */
  favorito: 'jornal-acabou-de-acontecer',
  porqueFavorito: 'Foi onde mais usei o que aprendi: chromakey, vinheta, clipe gerado no Veo e até erros de gravação nos créditos.',
};

/** Selo exibido no topo da home, apontando para o trabalho mais recente. */
export const aviso = {
  rotulo: 'Último',
  texto: 'Jornal Acabou de Acontecer (Faz Séculos)',
  href: '/trabalhos/jornal-acabou-de-acontecer/',
};

export interface Tecnica {
  rotulo: string;
  icone: LucideIcon;
  /** Slug do trabalho em que a técnica aparece. */
  trabalho: string;
  /** Âncora da seção na página do trabalho. */
  ancora: string;
}

/** Técnicas usadas de fato nos trabalhos, cada uma ligada ao trabalho onde aparece. */
export const tecnicas: Tecnica[] = [
  { rotulo: 'Narração gerada no ElevenLabs', icone: WandSparkles, trabalho: 'video-institucional-ia', ancora: 'como-foi-feito' },
  { rotulo: 'Montagem no DaVinci Resolve', icone: Film, trabalho: 'video-institucional-ia', ancora: 'como-foi-feito' },
  { rotulo: 'Roteiro de propaganda', icone: FileText, trabalho: 'propaganda-food-share', ancora: 'roteiro' },
  { rotulo: 'Cortes na narração', icone: Scissors, trabalho: 'propaganda-food-share', ancora: 'edição-no-audacity' },
  { rotulo: 'Redução de ruído', icone: AudioWaveform, trabalho: 'propaganda-food-share', ancora: 'edição-no-audacity' },
  { rotulo: 'Equalização', icone: SlidersHorizontal, trabalho: 'propaganda-food-share', ancora: 'edição-no-audacity' },
  { rotulo: 'Amplificação', icone: Volume2, trabalho: 'propaganda-food-share', ancora: 'edição-no-audacity' },
  { rotulo: 'Música de fundo e Auto Duck', icone: Volume1, trabalho: 'propaganda-food-share', ancora: 'edição-no-audacity' },
  { rotulo: 'Chromakey', icone: Layers, trabalho: 'jornal-acabou-de-acontecer', ancora: 'a-ideia' },
  { rotulo: 'Vinheta de abertura', icone: Clapperboard, trabalho: 'jornal-acabou-de-acontecer', ancora: 'roteiro' },
  { rotulo: 'Clipe gerado no Veo', icone: WandSparkles, trabalho: 'jornal-acabou-de-acontecer', ancora: 'a-ideia' },
  { rotulo: 'Erros de gravação e créditos', icone: Film, trabalho: 'jornal-acabou-de-acontecer', ancora: 'roteiro' },
];

export interface Software {
  slug: string;
  nome: string;
  logo: string;
  fabricante: string;
  licenca: string;
  plataformas: string;
  /** O que é o programa. */
  oQueE: string;
  /** Para que serve, em tópicos curtos. */
  usos: string[];
  /** Como foi usado na disciplina. */
  naDisciplina: string;
  site: string;
}

/** Softwares usados na disciplina. Logos: Wikimedia Commons (ver README). */
export const softwares: Software[] = [
  {
    slug: 'davinci-resolve',
    nome: 'DaVinci Resolve',
    logo: '/logos/davinci-resolve.svg',
    fabricante: 'Blackmagic Design',
    licenca: 'Gratuito (versão Studio paga)',
    plataformas: 'Windows, macOS e Linux',
    oQueE:
      'Programa de pós-produção de vídeo. Junta edição não linear, correção de cor, efeitos visuais (Fusion) e áudio (Fairlight) no mesmo projeto. Começou como sistema de correção de cor da da Vinci Systems, empresa que a Blackmagic Design comprou em 2009.',
    usos: [
      'Montar e cortar vídeos em uma timeline com várias trilhas',
      'Corrigir a cor das imagens e dar a elas um visual (color grading)',
      'Criar títulos, legendas e transições',
      'Mixar o som e exportar o vídeo no formato de cada plataforma',
    ],
    naDisciplina: 'Montagem e finalização dos dois vídeos feitos em dupla, incluindo o chromakey do jornal.',
    site: 'https://www.blackmagicdesign.com/products/davinciresolve',
  },
  {
    slug: 'audacity',
    nome: 'Audacity',
    logo: '/logos/audacity.svg',
    fabricante: 'Muse Group e comunidade',
    licenca: 'Livre e de código aberto (GPL)',
    plataformas: 'Windows, macOS e Linux',
    oQueE:
      'Editor e gravador de áudio livre e gratuito, criado em 2000 por Dominic Mazzoni e Roger Dannenberg, da Universidade Carnegie Mellon. Mostra cada faixa como forma de onda, então dá para ver onde cortar antes de ouvir.',
    usos: [
      'Gravar voz, entrevistas e locuções pelo microfone',
      'Cortar, copiar e reorganizar trechos da forma de onda',
      'Reduzir ruídos, equalizar, comprimir e normalizar o volume',
      'Exportar em formatos como MP3, WAV e OGG',
    ],
    naDisciplina: 'Usado em toda a edição da propaganda do Food Share: cortes, redução de ruído, equalização e mixagem com a música.',
    site: 'https://www.audacityteam.org',
  },
];

/** Busca um software pelo nome exibido em `ferramentas` dos trabalhos. */
export function softwarePorNome(nome: string): Software | undefined {
  return softwares.find((s) => s.nome.toLowerCase() === nome.toLowerCase());
}
