export type DevArticle = {
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

export async function getDevArticle(devArticleId?: number): Promise<DevArticle | null> {
  if (!devArticleId) return null;

  try {
    const response = await fetch(`https://dev.to/api/articles/${devArticleId}`);
    const article = await response.json();

    return 'error' in article ? null : article;
  } catch (error) {
    return null; //! null is serializable in JSON
  }
}
