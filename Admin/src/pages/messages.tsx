import { useQuery } from "@tanstack/react-query";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function Messages() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/contact?limit=100`);
      return response.data;
    },
  });

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.put(`${API_URL}/contact/${id}`);
      refetch();
    } catch (error) {
      alert("Failed to mark message as read");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${API_URL}/contact/${id}`);
        refetch();
      } catch (error) {
        alert("Failed to delete message");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">
          View and manage contact messages.
        </p>
      </div>

      {/* Messages Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Email
              </th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Message
              </th>
              <th className="px-6 py-4 text-left font-semibold text-foreground">
                Status
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
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : data?.contacts?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No messages yet.
                </td>
              </tr>
            ) : (
              data?.contacts?.map((message: any) => (
                <tr
                  key={message._id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${!message.read ? "bg-primary/5" : ""}`}
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {message.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {message.email}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground truncate max-w-xs">
                    {message.message}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        message.read
                          ? "bg-gray-500/10 text-gray-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {message.read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {!message.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMarkAsRead(message._id)}
                          title="Mark as read"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(message._id)}
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
