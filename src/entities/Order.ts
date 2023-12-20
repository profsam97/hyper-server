export interface Order {
    id: number;
    bookId: number;
    customerId: number;
    createdAt: Date;
    canceled: boolean;
  }
  