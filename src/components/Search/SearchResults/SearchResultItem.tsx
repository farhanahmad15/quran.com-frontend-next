/* eslint-disable react/no-danger */

import React, { useMemo } from 'react';

import useTranslation from 'next-translate/useTranslation';

import styles from './SearchResultItem.module.scss';

import Button, { ButtonVariant } from 'src/components/dls/Button/Button';
import Link from 'src/components/dls/Link/Link';
import QuranWord from 'src/components/dls/QuranWord/QuranWord';
import useGetChaptersData from 'src/hooks/useGetChaptersData';
import { getChapterData } from 'src/utils/chapter';
import { logButtonClick } from 'src/utils/eventLogger';
import { toLocalizedVerseKey } from 'src/utils/locale';
import { getChapterWithStartingVerseUrl } from 'src/utils/navigation';
import { getChapterNumberFromKey } from 'src/utils/verse';
import Verse from 'types/Verse';
import { CharType } from 'types/Word';

export enum Source {
  SearchDrawer = 'search_drawer',
  SearchPage = 'search_page',
  Tarteel = 'tarteel',
}

interface Props {
  result: Verse;
  source: Source;
  setFeedbackVerseKey?: (verseKey: string) => void;
}

const SearchResultItem: React.FC<Props> = ({ result, source, setFeedbackVerseKey }) => {
  const { t, lang } = useTranslation('quran-reader');
  const localizedVerseKey = useMemo(
    () => toLocalizedVerseKey(result.verseKey, lang),
    [lang, result.verseKey],
  );

  const chaptersData = useGetChaptersData(lang);

  if (!chaptersData) return null;

  const chapterNumber = getChapterNumberFromKey(result.verseKey);
  const chapterData = getChapterData(chaptersData, chapterNumber.toString());

  return (
    <div className={styles.container}>
      {setFeedbackVerseKey && (
        <Button
          tooltip={t('common:feedback')}
          onClick={() => {
            setFeedbackVerseKey(result.verseKey);
          }}
          variant={ButtonVariant.Compact}
        >
          {t('common:feedback')}
        </Button>
      )}
      <div className={styles.itemContainer}>
        <Link
          href={getChapterWithStartingVerseUrl(result.verseKey)}
          shouldPassHref
          onClick={() => {
            logButtonClick(`${source}_result_item`);
          }}
        >
          <a className={styles.verseKey}>
            {chapterData.transliteratedName} {localizedVerseKey}
          </a>
        </Link>
        <div className={styles.quranTextContainer}>
          <div className={styles.quranTextResult} translate="no">
            {/* @ts-ignore */}
            {result.qpcUthmaniHafs.split(' ').map((wordText, index) => {
              return (
                <QuranWord
                  isHighlighted={false}
                  key={`${result.verseKey}:${index + 1}`}
                  // @ts-ignore
                  word={{
                    ...result,
                    id: index,
                    charTypeName: CharType.Word,
                    hizbNumber: result.hizbNumber,
                    text: wordText,
                  }}
                  isWordByWordAllowed={false}
                  isAudioHighlightingAllowed={false}
                />
              );
            })}
          </div>
        </div>
        {result.translations?.map((translation) => (
          <div key={translation.resourceId} className={styles.translationContainer}>
            <div dangerouslySetInnerHTML={{ __html: translation.text }} />
            <p className={styles.translationName}> - {translation.resourceName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchResultItem;
