import { SiReact, SiVite, SiRedux, SiSass, SiAxios, SiPrettier } from 'react-icons/si';

export const getStackItems = t => [
  { label: t('stack.react'), icon: SiReact, color: '#61dafb' },
  { label: t('stack.vite'), icon: SiVite, color: '#bd34fe' },
  { label: t('stack.redux'), icon: SiRedux, color: '#764abc' },
  { label: t('stack.scss'), icon: SiSass, color: '#cc6699' },
  { label: t('stack.axios'), icon: SiAxios, color: '#5a29e4' },
  { label: t('stack.prettier'), icon: SiPrettier, color: '#f7b93e' },
];
