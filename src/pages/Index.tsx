import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CategorySection } from '@/components/dashboard/CategorySection';
import { useDashboardStore } from '@/store/dashboardStore';

const Index = () => {
  const { data } = useDashboardStore();

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <DashboardHeader />
      
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6 md:space-y-8">
        {data.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
