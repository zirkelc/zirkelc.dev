import { parseISO, format, formatDistanceToNow } from 'date-fns';

type Props = {
  dateString: string;
  relative?: boolean;
};

export default function DateTime({ dateString, relative }: Props) {
  const date = parseISO(dateString);
  const formattedDate = relative ? formatDistanceToNow(date, { addSuffix: true }) : format(date, 'LLL	d, yyyy');
  return <time dateTime={dateString}>{formattedDate}</time>;
}
