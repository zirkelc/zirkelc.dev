import React from 'react';

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
export function useDevArticle(devArticleId: number) {
  const [loading, setLoading] = React.useState(!!devArticleId);
  const [article, setArticle] = React.useState<DevArticle>();

  React.useEffect(() => {
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
    article,
  };
}
