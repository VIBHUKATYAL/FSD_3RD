import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { UserPlus, Briefcase } from "lucide-react";

export default function Lecturers() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const { data: lecturers, isLoading } = useQuery({
    queryKey: ["lecturers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/lecturers");
      return res.data.data;
    },
  });

  const addLecturer = useMutation({
    mutationFn: async (newLecturer: any) => {
      return axios.post("http://localhost:5000/api/lecturers", newLecturer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
      setShowModal(false);
      setName("");
      setDepartment("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && department) addLecturer.mutate({ name, department });
  };

  if (isLoading) return <div>Loading lecturers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lecturers</h1>
          <p className="text-gray-500">
            Manage all faculties and their departments
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={18} /> Add Lecturer
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium border-b">Name</th>
              <th className="px-6 py-4 font-medium border-b">Department</th>
              <th className="px-6 py-4 font-medium border-b text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {lecturers?.map((lecturer: any) => (
              <tr key={lecturer.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs uppercase">
                    {lecturer.name.substring(0, 2)}
                  </div>
                  {lecturer.name}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <Briefcase size={12} /> {lecturer.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-brand hover:underline">
                    View Schedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-bold">Add New Lecturer</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brand/20 border-gray-300 transition-shadow"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Adam Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brand/20 border-gray-300 transition-shadow"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLecturer.isPending}
                  className="btn-primary"
                >
                  {addLecturer.isPending ? "Adding..." : "Add Lecturer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
