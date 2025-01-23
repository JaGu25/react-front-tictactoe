import LineChartExample from "@/app/admin/pages/dashboard/components/LineChartExample";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";

const DashboardPage = () => {
  return (
    <div>
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Line Chart Examplte</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <LineChartExample />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
