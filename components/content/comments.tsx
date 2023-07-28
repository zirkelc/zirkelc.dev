import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type DevArticle = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
};

// Copied from:
// https://www.emgoto.com/gatsby-dev-api/
// https://github.com/emgoto/emgoto.com/blob/master/src/components/content/dev-comments/index.js
const useDevArticleComments = (devArticleId: number) => {
  const [loading, setLoading] = useState(!!devArticleId);
  const [article, setArticle] = useState<DevArticle>();

  useEffect(() => {
    devArticleId &&
      fetch(`https://dev.to/api/articles/${devArticleId}`)
        .then((response) => response.json())
        .then((response) => {
          if (response && !response.error) {
            setArticle(response);
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
  }, [devArticleId]);

  return {
    loading,
    data: article && {
      comments: article.comments_count,
      url: article.url,
    },
  };
};

const getMessage = (commentCount) => {
  if (!commentCount) {
    return 'Comment on DEV';
  }

  return commentCount === 1 ? `1 comment` : `${commentCount} comments`;
};

type Props = {
  devArticleId: number;
};

export function Comments({ devArticleId }: Props) {
  const { loading, data } = useDevArticleComments(devArticleId);

  return devArticleId && !loading && data ? (
    <Link href={`${data.url}#comments`}>{getMessage(data.comments)}</Link>
  ) : null;
}
