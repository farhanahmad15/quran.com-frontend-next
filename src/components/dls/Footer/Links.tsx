import useTranslation from 'next-translate/useTranslation';

import MoonIllustrationSVG from '../../../../public/images/moon-illustration.svg';

import styles from './Footer.module.scss';

import Link, { LinkVariant } from 'src/components/dls/Link/Link';
import useGetChaptersData from 'src/hooks/useGetChaptersData';
import { logTarteelLinkClick } from 'src/utils/eventLogger';

const Links = () => {
  const { t, lang } = useTranslation('common');
  const chaptersData = useGetChaptersData(lang);

  if (!chaptersData) {
    return <></>;
  }
  const getChapterSlug = (id) => `/${chaptersData[id].slug}`;

  const donateLink = (
    <span className={styles.donateLinkContainer}>
      <span className={styles.prefixContainer}>
        <MoonIllustrationSVG />
      </span>
      {t('donate')}
    </span>
  );

  const linksGroup = [
    {
      title: t('navigate'),
      links: [
        { text: t('home'), url: '/' },
        { text: t('quran-radio'), url: '/radio' },
        { text: t('reciters'), url: '/reciters' },
        { text: t('about'), url: '/about-us' },
        { text: t('mobile-apps'), url: '/apps' },
        { text: t('developers'), url: '/developers' },
        { text: t('product-updates'), url: '/product-updates' },
        { text: t('feedback'), url: 'https://feedback.quran.com/', isExternal: true },
        { text: t('help'), url: '/support' },
        {
          text: donateLink,
          isExternal: true,
          className: styles.primaryLink,
          url: 'https://donate.quran.com',
        },
      ],
    },
    {
      title: t('network'),
      links: [
        { text: 'QuranicAudio.com', url: 'https://quranicaudio.com', isExternal: true },
        { text: 'Salah.com', url: 'https://salah.com', isExternal: true },
        { text: 'Sunnah.com', url: 'https://sunnah.com', isExternal: true },
        { text: 'Legacy.Quran.com', url: 'https://legacy.quran.com', isExternal: true },
        { text: 'Previous.Quran.com', url: 'https://previous.quran.com', isExternal: true },
        { text: 'Corpus.Quran.com', url: 'https://corpus.quran.com', isExternal: true },
        { text: 'QuranReflect.com', url: 'https://quranreflect.com', isExternal: true },
        {
          text: 'Tarteel.ai',
          url: 'https://www.tarteel.ai/',
          isExternal: true,
          onClick: () => {
            logTarteelLinkClick('footer_network_attribution');
          },
        },
      ],
    },
    {
      title: t('popular-links'),
      links: [
        { text: t('quick-links:ayat-ul-kursi'), url: '/ayatul-kursi' },
        { text: t('quick-links:yaseen'), url: getChapterSlug('36') },
        { text: t('quick-links:mulk'), url: getChapterSlug('67') },
        { text: t('quick-links:rahman'), url: getChapterSlug('55') },
        { text: t('quick-links:waqiah'), url: getChapterSlug('56') },
        { text: t('quick-links:kahf'), url: getChapterSlug('18') },
        { text: t('quick-links:muzzammil'), url: getChapterSlug('73') },
      ],
    },
  ];
  return (
    <div className={styles.groupListContainer}>
      {linksGroup.map((group) => (
        <div className={styles.group} key={group.title}>
          <div className={styles.groupTitle}>{group.title}</div>
          {group.links.map((link) => (
            <div key={link.url} className={styles.linkContainer}>
              <Link
                href={link.url}
                className={link.className}
                variant={LinkVariant.Primary}
                isNewTab={!!link.isExternal}
                {...(link.onClick && { onClick: link.onClick })}
              >
                {link.text}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Links;
