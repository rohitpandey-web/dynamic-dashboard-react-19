import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Widget as WidgetType } from '@/types/dashboard';
import { useDashboardStore } from '@/store/dashboardStore';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface WidgetProps {
  widget: WidgetType;
  categoryId: string;
}

const DataVisualization = ({ widget }: { widget: WidgetType }) => {
  // Dynamic color assignment for additional options
  const getColorForIndex = (index: number): string => {
    const colors = [
      'hsl(var(--destructive))',      // Red for critical/failed
      'hsl(var(--warning))',          // Yellow/orange for warning  
      'hsl(var(--muted-foreground))', // Gray for not available
      'hsl(var(--success))',          // Green for passed/success
      'hsl(var(--primary))',          // Blue for additional options
      'hsl(var(--secondary))',        // Purple/secondary color
      'hsl(210, 100%, 60%)',          // Light blue
      'hsl(300, 100%, 70%)',          // Pink/magenta
      'hsl(30, 100%, 60%)',           // Orange
      'hsl(180, 100%, 50%)'           // Cyan
    ];
    return colors[index % colors.length];
  };

  if (!widget.data) {
    return (
      <div className="flex flex-col items-center justify-center h-32 bg-muted/30 rounded border-2 border-dashed border-muted text-muted-foreground text-sm">
        <div className="w-8 h-8 mb-2 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xs">📊</span>
        </div>
        <span>No Graph data available!</span>
      </div>
    );
  }

  // CSPM Cloud Accounts
  if (widget.id === 'cloud-accounts') {
    const chartData = [
      { name: 'Connected', value: widget.data.connected, color: 'hsl(var(--success))' },
      { name: 'Not Connected', value: widget.data.notConnected, color: 'hsl(var(--destructive))' }
    ];

    const chartConfig = {
      connected: { label: 'Connected', color: 'hsl(var(--success))' },
      notConnected: { label: 'Not Connected', color: 'hsl(var(--destructive))' }
    };

    return (
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px] w-full">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">{widget.data.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 space-y-2 text-sm w-full sm:w-auto max-w-full">
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-success flex-shrink-0"></div>
            <span className="truncate text-xs sm:text-sm">Connected ({widget.data.connected})</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-destructive flex-shrink-0"></div>
            <span className="truncate text-xs sm:text-sm">Not Connected ({widget.data.notConnected})</span>
          </div>
        </div>
      </div>
    );
  }

  // CSPM Risk Assessment
  if (widget.id === 'cloud-risk-assessment') {
    const chartData = [
      { name: 'Failed', value: widget.data.failed, color: 'hsl(var(--destructive))' },
      { name: 'Warning', value: widget.data.warning, color: 'hsl(var(--warning))' },
      { name: 'Not Available', value: widget.data.notAvailable, color: 'hsl(var(--muted-foreground))' },
      { name: 'Passed', value: widget.data.passed, color: 'hsl(var(--success))' }
    ];

    const chartConfig = {
      failed: { label: 'Failed', color: 'hsl(var(--destructive))' },
      warning: { label: 'Warning', color: 'hsl(var(--warning))' },
      notAvailable: { label: 'Not Available', color: 'hsl(var(--muted-foreground))' },
      passed: { label: 'Passed', color: 'hsl(var(--success))' }
    };

    return (
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <ChartContainer config={chartConfig} className="h-[180px] sm:h-[200px] w-full">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={65}
                paddingAngle={1}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold">{widget.data.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 space-y-2 text-xs w-full sm:w-auto max-w-full">
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-destructive flex-shrink-0"></div>
            <span className="truncate text-xs">Failed ({widget.data.failed})</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-warning flex-shrink-0"></div>
            <span className="truncate text-xs">Warning ({widget.data.warning})</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-muted-foreground flex-shrink-0"></div>
            <span className="truncate text-xs">Not available ({widget.data.notAvailable})</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-success flex-shrink-0"></div>
            <span className="truncate text-xs">Passed ({widget.data.passed})</span>
          </div>
        </div>
      </div>
    );
  }

  // Registry Scan widgets
  if (widget.id === 'image-risk-assessment' || widget.id === 'image-security-issues') {
    const isRiskAssessment = widget.id === 'image-risk-assessment';
    const totalValue = isRiskAssessment ? widget.data.total : widget.data.total;
    const criticalPercentage = (widget.data.critical / totalValue) * 100;
    const highPercentage = (widget.data.high / totalValue) * 100;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-lg font-bold">{totalValue}</div>
          <div className="text-sm text-muted-foreground">
            {isRiskAssessment ? 'Total Vulnerabilities' : 'Total Images'}
          </div>
        </div>
        
        {/* Horizontal Stacked Bar Chart */}
        <div className="space-y-3">
          <div className="w-full h-4 sm:h-6 bg-muted rounded flex overflow-hidden">
            <div 
              className="bg-destructive transition-all duration-300"
              style={{ width: `${criticalPercentage}%` }}
            ></div>
            <div 
              className="bg-warning transition-all duration-300"
              style={{ width: `${highPercentage}%` }}
            ></div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm justify-center sm:justify-start">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-3 h-3 rounded-full bg-destructive flex-shrink-0"></div>
              <span className="truncate">Critical ({widget.data.critical})</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-3 h-3 rounded-full bg-warning flex-shrink-0"></div>
              <span className="truncate">High ({widget.data.high})</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm text-muted-foreground">
      {widget.text}
    </div>
  );
};

export const Widget = ({ widget, categoryId }: WidgetProps) => {
  const { removeWidget } = useDashboardStore();

  const handleRemove = () => {
    removeWidget(categoryId, widget.id);
  };

  return (
    <Card className="relative bg-widget-bg border-widget-border shadow-sm hover:shadow-md transition-shadow w-full">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="absolute top-2 right-2 w-6 h-6 p-0 hover:bg-destructive/10 text-muted-foreground hover:text-destructive z-10"
      >
        <X className="w-3 h-3" />
      </Button>

      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-foreground mb-3 sm:mb-4 pr-8 text-sm sm:text-base">{widget.name}</h3>
        <DataVisualization widget={widget} />
      </div>
    </Card>
  );
};