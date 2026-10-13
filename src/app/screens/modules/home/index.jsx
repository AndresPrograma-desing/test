import { useTranslation } from 'react-i18next';
import { Button, Badge, Callout, CopyText, Container, Frame } from 'anteriority-ui';
import { SiReact } from 'react-icons/si';
import { FiPlay, FiBookOpen } from 'react-icons/fi';
import { getStackItems } from './constants';
import { getRevealStyle } from './utils';
import styles from './styles.module.scss';

const REVEAL_ORDER = [
  'icon',
  'badge',
  'title',
  'description',
  'callout',
  'stack',
  'actions',
  'code',
];

export const Home = () => {
  const { t } = useTranslation();
  const revealStyle = key => getRevealStyle(REVEAL_ORDER.indexOf(key));
  const stackItems = getStackItems(t);
  const title = t('app.title').split(' ');

  return (
    <div className={styles.page}>
      <Container wattermark={false} className={styles.outer}>
        <Frame className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.reveal}`} style={revealStyle('icon')}>
            <SiReact size={40} />
          </div>

          <div className={`${styles.revealWrap} ${styles.reveal}`} style={revealStyle('badge')}>
            <Badge label="Template" value="Ready" />
          </div>

          <h1 className={`${styles.title} ${styles.reveal}`} style={revealStyle('title')}>
            {title[0]} <span className="gradient-text">{title.slice(1).join(' ')}</span>
          </h1>

          <p
            className={`${styles.description} ${styles.reveal}`}
            style={revealStyle('description')}
          >
            {t('app.description')}
          </p>

          <div className={`${styles.revealWrap} ${styles.reveal}`} style={revealStyle('callout')}>
            <Callout title={t('callout.title')} variant="info">
              {t('callout.message')}
            </Callout>
          </div>

          <div className={`${styles.stack} ${styles.reveal}`} style={revealStyle('stack')}>
            {stackItems.map(({ label, icon, color }) => (
              <Badge key={label} value={label} icon={icon} iconColor={color} />
            ))}
            <Badge value={t('stack.ui')} />
          </div>

          <div className={`${styles.actions} ${styles.reveal}`} style={revealStyle('actions')}>
            <Button variant="primary" size="medium" icon={FiPlay}>
              {t('buttons.primary')}
            </Button>
            <Button variant="outline" size="medium" icon={FiBookOpen}>
              {t('buttons.secondary')}
            </Button>
          </div>

          <div className={`${styles.revealWrap} ${styles.reveal}`} style={revealStyle('code')}>
            <CopyText text={t('app.pathLabel')} />
          </div>
        </Frame>
      </Container>
    </div>
  );
};

export default Home;
