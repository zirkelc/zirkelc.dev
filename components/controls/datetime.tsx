import { parseISO, format, formatDistanceToNow } from 'date-fns';
import { DateTime } from 'millis-js';

type Props = {
  dateString: string;
};

export default function ({ dateString }: Props) {
  const date = DateTime.from(dateString);
  return <time dateTime={dateString}>{date.format('YYYY-MM-DD')}</time>;
}
