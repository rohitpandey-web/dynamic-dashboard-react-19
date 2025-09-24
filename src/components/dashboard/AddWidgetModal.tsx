import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { WIDGET_CATEGORIES } from '@/types/dashboard';
import { useDashboardStore } from '@/store/dashboardStore';
import { toast } from 'sonner';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const AddWidgetModal = ({ isOpen, onClose, defaultCategory }: AddWidgetModalProps) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultCategory ? [defaultCategory] : []
  );
  
  const { addWidget } = useDashboardStore();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleConfirm = () => {
    if (!widgetName.trim() || !widgetText.trim()) {
      toast.error('Please fill in both widget name and text');
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category');
      return;
    }

    // Add widget to each selected category
    selectedCategories.forEach(categoryId => {
      // Map category selection to actual dashboard categories
      let targetCategoryId = categoryId;
      if (categoryId === 'cspm') targetCategoryId = 'cspm';
      else if (categoryId === 'cwpp') targetCategoryId = 'cwpp';
      else if (categoryId === 'image') targetCategoryId = 'registry';
      else if (categoryId === 'ticket') {
        // For ticket category, we'll add to CSPM as it's not explicitly in the dashboard
        targetCategoryId = 'cspm';
      }

      addWidget(targetCategoryId, {
        name: widgetName.trim(),
        text: widgetText.trim(),
        category: categoryId
      });
    });

    toast.success(`Widget "${widgetName}" added successfully`);
    
    // Reset form
    setWidgetName('');
    setWidgetText('');
    setSelectedCategories(defaultCategory ? [defaultCategory] : []);
    onClose();
  };

  const handleCancel = () => {
    setWidgetName('');
    setWidgetText('');
    setSelectedCategories(defaultCategory ? [defaultCategory] : []);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle>Add Widget</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Personalise your dashboard by adding the following widget
          </p>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Widget Name */}
          <div className="space-y-2">
            <Label htmlFor="widget-name">Widget Name</Label>
            <Input
              id="widget-name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Enter widget name"
            />
          </div>

          {/* Widget Text */}
          <div className="space-y-2">
            <Label htmlFor="widget-text">Widget Text</Label>
            <Textarea
              id="widget-text"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              placeholder="Enter widget content"
              rows={3}
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-muted/30">
              {WIDGET_CATEGORIES.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={category.id} className="text-sm font-medium">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-auto">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-primary text-primary-foreground">
            Confirm
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};