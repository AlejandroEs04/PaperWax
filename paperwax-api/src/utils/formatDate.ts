import { format, parseISO } from 'date-fns';

export default function formatDate(dateString: string): string {
    const date = parseISO(dateString);
    console.log(date) 
    return format(date, "dd/MM/yyyy");
}