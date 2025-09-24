import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, ChevronRight, RefreshCw, MoreVertical, Calendar } from 'lucide-react';
import { AddWidgetModal } from './AddWidgetModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export const DashboardHeader = () => {
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('Last 2 days');

  const handleRefresh = () => {
    toast({
      title: "Dashboard Refreshed",
      description: "All widgets have been refreshed with latest data.",
    });
  };

  const handleTimeRangeChange = (newRange: string) => {
    setTimeRange(newRange);
    toast({
      title: "Time Range Updated",
      description: `Dashboard updated to show ${newRange.toLowerCase()} data.`,
    });
  };

  return (
    <div className="bg-widget-bg border-b border-widget-border">
      <div className="px-4 md:px-6 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-4 md:mb-6">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground font-medium">Dashboard V2</span>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">CNAPP Dashboard</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-widget-bg border-widget-border"
              />
            </div>

            {/* Add Widget Button */}
            <Button
              onClick={() => setIsAddWidgetOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Widget
            </Button>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 text-sm">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                className="flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast({ title: "Export", description: "Dashboard data exported successfully." })}>
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Opening dashboard settings..." })}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Help", description: "Opening help documentation..." })}>
                    Help
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {timeRange}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleTimeRangeChange('Last 24 hours')}>
                    Last 24 hours
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeRangeChange('Last 2 days')}>
                    Last 2 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeRangeChange('Last 7 days')}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeRangeChange('Last 30 days')}>
                    Last 30 days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <AddWidgetModal
        isOpen={isAddWidgetOpen}
        onClose={() => setIsAddWidgetOpen(false)}
      />
    </div>
  );
};