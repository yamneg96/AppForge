import { useQuery } from "@tanstack/react-query";
import { BarChart, Box, Mail, TrendingUp } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export function Dashboard() {
  const { data: appsData } = useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/apps?limit=100`);
      return response.data;
    },
  });

  const { data: messagesData } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/contact?limit=100`);
      return response.data;
    },
  });

  const stats = [
    {
      label: "Total Apps",
      value: appsData?.total || 0,
      icon: Box,
      color: "bg-blue-500",
    },
    {
      label: "Messages",
      value: messagesData?.total || 0,
      icon: Mail,
      color: "bg-purple-500",
    },
    {
      label: "Released Apps",
      value:
        appsData?.apps?.filter((app: any) => app.status === "released")
          .length || 0,
      icon: TrendingUp,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your app overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-lg border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground font-medium">
                  {stat.label}
                </h3>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Recent Activity
        </h2>
        <p className="text-muted-foreground">
          Recent apps and messages will appear here.
        </p>
      </div>
    </div>
  );
}
