import { NotionBody, NotionHeader } from './notion';

export const formatPostAsMarkdown = (post: NotionHeader & NotionBody): string => {
  if (!post.markdown) return '';

  // Add title as H1 at the top
  return `# ${post.properties.title}\n\n${post.markdown}`;
};
