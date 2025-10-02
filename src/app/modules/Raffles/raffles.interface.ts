export interface IRaffles{
    thumbnail: string;
    title: string;
    details: string;
    price: number;
    totalTicket: number;
    perUserTicketLimit: number;
    ticketSold?: number;
    status?: boolean;
}