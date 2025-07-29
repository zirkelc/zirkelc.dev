import { DateTime } from 'millis-js';

type Props = {
  dateString: string;
};

export default function Date({ dateString }: Props) {
  const date = DateTime.from(dateString);
  return <time dateTime={dateString}>{date.format('YYYY-MM-DD')}</time>;
}
