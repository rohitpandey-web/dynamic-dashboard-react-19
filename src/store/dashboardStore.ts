import { create } from 'zustand';
import { DashboardData, Widget, Category } from '@/types/dashboard';

// Initial dashboard data matching the PDF requirements
const initialData: DashboardData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected (2)',
          category: 'cspm',
          data: {
            connected: 2,
            notConnected: 2,
            total: 4
          }
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment', 
          text: '9659',
          category: 'cspm',
          data: {
            total: 9659,
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            passed: 7253
          }
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          category: 'cwpp'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          category: 'cwpp'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities',
          category: 'image',
          data: {
            total: 1470,
            critical: 9,
            high: 150
          }
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: '2 Total Images',
          category: 'image',
          data: {
            total: 2,
            critical: 2,
            high: 2
          }
        }
      ]
    }
  ]
};

interface DashboardStore {
  data: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  data: initialData,
  addWidget: (categoryId, widget) =>
    set((state) => ({
      data: {
        ...state.data,
        categories: state.data.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                widgets: [
                  ...category.widgets,
                  { ...widget, id: `${categoryId}-${Date.now()}` }
                ]
              }
            : category
        )
      }
    })),
  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      data: {
        ...state.data,
        categories: state.data.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                widgets: category.widgets.filter((w) => w.id !== widgetId)
              }
            : category
        )
      }
    }))
}));