import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Schedule() {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");

  const { data: rooms } = useQuery({
    queryKey: ["roomsForSchedule"],
    queryFn: async () =>
      (await axios.get("http://localhost:5000/api/rooms")).data.data,
  });
  const { data: lecturers } = useQuery({
    queryKey: ["lecturersForSchedule"],
    queryFn: async () =>
      (await axios.get("http://localhost:5000/api/lecturers")).data.data,
  });
  const { data: classes } = useQuery({
    queryKey: ["classesForSchedule"],
    queryFn: async () =>
      (await axios.get("http://localhost:5000/api/classes")).data.data,
  });
  const { data: subjects } = useQuery({
    queryKey: ["subjectsForSchedule"],
    queryFn: async () =>
      (await axios.get("http://localhost:5000/api/subjects")).data.data,
  });
  const { data: lectures, isLoading } = useQuery({
    queryKey: ["lectures"],
    queryFn: async () =>
      (await axios.get("http://localhost:5000/api/lectures")).data.data,
  });

  const addLecture = useMutation({
    mutationFn: async (fd: any) => {
      const data = Object.fromEntries(fd.entries());
      return axios.post("http://localhost:5000/api/lectures", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      setErrorMsg("");
      (document.getElementById("scheduleForm") as HTMLFormElement).reset();
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || "Conflict occurred");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    addLecture.mutate(fd);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Allocate Room & Scheduler</h1>
        <p className="text-gray-500">Allocate rooms to teachers and classes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card md:col-span-1">
          <h2 className="font-bold text-lg mb-4">Allocate New Lecture</h2>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
              {errorMsg}
            </div>
          )}
          {addLecture.isSuccess && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 border border-green-100">
              Successfully allocated!
            </div>
          )}

          <form id="scheduleForm" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Teacher / Lecturer
              </label>
              <select
                name="lecturerId"
                required
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option value="">Select Lecturer</option>
                {lecturers?.map((l: any) => (
                  <option key={l.id} value={l.id}>
                    {l.name} - {l.department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room</label>
              <select
                name="roomId"
                required
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option value="">Select Room</option>
                {rooms?.map((r: any) => (
                  <option key={r.id} value={r.id}>
                    {r.roomNumber} ({r.type})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                name="subjectId"
                required
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option value="">Select Subject</option>
                {subjects?.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Class</label>
              <select
                name="classId"
                required
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option value="">Select Class</option>
                {classes?.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    name="startTime"
                    required
                    className="w-full border rounded-lg px-2 py-2 outline-none text-sm"
                  />
                  <span>-</span>
                  <input
                    type="time"
                    name="endTime"
                    required
                    className="w-full border rounded-lg px-2 py-2 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={addLecture.isPending}
              className="btn-primary w-full mt-4"
            >
              {addLecture.isPending ? "Allocating..." : "Allocate Room"}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h2 className="font-bold text-lg">
            Current Timetable (All Scheduled Lectures)
          </h2>

          {isLoading ? (
            <div className="animate-pulse">Loading timetable...</div>
          ) : (
            <div className="card p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                    <th className="px-5 py-3 font-medium border-b">Room</th>
                    <th className="px-5 py-3 font-medium border-b">
                      Time & Date
                    </th>
                    <th className="px-5 py-3 font-medium border-b">Subject</th>
                    <th className="px-5 py-3 font-medium border-b">Teacher</th>
                    <th className="px-5 py-3 font-medium border-b">Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {lectures?.map((lec: any) => (
                    <tr key={lec.id} className="hover:bg-gray-50/50 text-sm">
                      <td className="px-5 py-3 font-bold">
                        {lec.room.roomNumber}
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-medium">
                          {lec.startTime} - {lec.endTime}
                        </span>
                        <div className="text-xs text-gray-500">
                          {new Date(lec.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-5 py-3">{lec.subject.name}</td>
                      <td className="px-5 py-3">{lec.lecturer.name}</td>
                      <td className="px-5 py-3">{lec.class.name}</td>
                    </tr>
                  ))}
                  {lectures?.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No scheduled lectures found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
