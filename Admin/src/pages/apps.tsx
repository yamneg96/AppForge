import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export function Apps() {
  const { data, isLoading } = useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/apps?limit=100`);
      return response.data;
    },
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this app?")) {
      try {
        await axios.delete(`${API_URL}/apps/${id}`);
        // Refetch apps
        location.reload();
      } catch (error) {
        alert("Failed to delete app");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground mb-2">
            Apps Management
          </h1>
          <p className="text-muted-foreground">Manage all your applications.</p>
        </div>
        <Link to="/create-app">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New App
          </Button>
        </Link>
      </div>

      {/* Apps Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Version
              </th>
              <th className="px-6 py-4 text-right font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : data?.apps?.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No apps yet.{" "}
                  <Link to="/create-app" className="text-primary font-medium">
                    Create one
                  </Link>
                </td>
              </tr>
            ) : (
              data?.apps?.map((app: any) => (
                <tr
                  key={app._id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {app.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        app.status === "released"
                          ? "bg-green-500/10 text-green-500"
                          : app.status === "coming_soon"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-gray-500/10 text-gray-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {app.version}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/edit-app/${app._id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(app._id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
