import { format, parseISO } from 'date-fns';

export default function formatDate(dateString: string): string {
    const date = parseISO(dateString); 
    return format(date, "dd/MM/yyyy hh:mm a");
}