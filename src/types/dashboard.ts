export interface Widget {
  id: string;
  name: string;
  text: string;
  category: string;
  data?: {
    [key: string]: number;
  };
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}

export const WIDGET_CATEGORIES = [
  { id: 'cspm', name: 'CSPM' },
  { id: 'cwpp', name: 'CWPP' },
  { id: 'image', name: 'Image' },
  { id: 'ticket', name: 'Ticket' }
] as const;