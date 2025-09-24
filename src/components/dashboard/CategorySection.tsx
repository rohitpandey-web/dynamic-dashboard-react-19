import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Category } from '@/types/dashboard';
import { Widget } from './Widget';
import { AddWidgetModal } from './AddWidgetModal';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
        <Button
          size="sm"
          onClick={() => setIsAddWidgetOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Widget
        </Button>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
          />
        ))}
        
        {/* Always show an add widget button in the grid */}
        <div 
          onClick={() => setIsAddWidgetOpen(true)}
          className="flex items-center justify-center min-h-[120px] border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
        >
          <div className="text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Add Widget</p>
          </div>
        </div>
      </div>

      <AddWidgetModal
        isOpen={isAddWidgetOpen}
        onClose={() => setIsAddWidgetOpen(false)}
        defaultCategory={category.id}
      />
    </div>
  );
};