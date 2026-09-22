import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DoorOpen, Users, CalendarCheck, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      return res.data.data;
    },
  });

  if (isLoading)
    return <div className="animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome back, Admin</h1>
        <button className="btn-primary">Generate Reports</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card flex items-center gap-5 border-l-4 border-l-brand">
          <div className="bg-brand/10 p-4 rounded-full">
            <DoorOpen className="h-6 w-6 text-brand" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Rooms</p>
            <p className="text-2xl font-bold text-primary">
              {stats?.totalRooms || 0}
            </p>
          </div>
        </div>

        <div className="card flex items-center gap-5 border-l-4 border-l-red-500">
          <div className="bg-red-50 p-4 rounded-full">
            <Users className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Occupied Now</p>
            <p className="text-2xl font-bold text-primary">
              {stats?.occupiedRooms || 0}
            </p>
          </div>
        </div>

        <div className="card flex items-center gap-5 border-l-4 border-l-green-500">
          <div className="bg-green-50 p-4 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Rooms Available</p>
            <p className="text-2xl font-bold text-primary">
              {stats?.availableRooms || 0}
            </p>
          </div>
        </div>

        <div className="card flex items-center gap-5 border-l-4 border-l-orange-500">
          <div className="bg-orange-50 p-4 rounded-full">
            <CalendarCheck className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Today's Lectures
            </p>
            <p className="text-2xl font-bold text-primary">
              {stats?.todaysLectures || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 min-h-[300px] flex items-center justify-center bg-gray-50 border-dashed">
          <span className="text-gray-400">Activity Chart Placeholder</span>
        </div>
        <div className="card min-h-[300px] flex items-center justify-center bg-gray-50 border-dashed">
          <span className="text-gray-400">Upcoming Lectures Summary</span>
        </div>
      </div>
    </div>
  );
}
