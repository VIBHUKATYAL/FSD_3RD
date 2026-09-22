import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "lucide-react";

export default function Rooms() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/rooms");
      return res.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );

  const groupedByFloor = rooms?.reduce((acc: any, room: any) => {
    if (!acc[room.floorName]) acc[room.floorName] = [];
    acc[room.floorName].push(room);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Room Overview</h1>
          <p className="text-gray-500">
            Manage all 56 lecture rooms across campus
          </p>
        </div>

        <div className="flex gap-2 items-center bg-white border rounded-lg px-3 py-2 w-64">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>

      {Object.entries(groupedByFloor || {}).map(
        ([floorName, floorRooms]: any) => (
          <div key={floorName} className="space-y-4">
            <h2 className="text-lg font-semibold text-brand underline decoration-brand/30 underline-offset-4">
              {floorName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {floorRooms.map((room: any) => (
                <div
                  key={room.id}
                  className="card hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{room.roomNumber}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-xs font-medium text-gray-600 rounded">
                        {room.type} • Cap: {room.capacity}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Available
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 border-t pt-3 mt-auto">
                    <p>No lecture currently scheduled.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
