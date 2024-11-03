import React, { useEffect } from "react";
import * as d3 from "d3";
import GraphLegend from "../components/GraphLegend";
import { UserRole } from "../enum/UserRole";

interface UserChartsProps {
  usersData: User[];
  loading: boolean;
}

interface User {
  id: number;
  email: string;
  isActive: boolean;
  role: UserRole;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const UserCharts: React.FC<UserChartsProps> = ({ usersData, loading }) => {
  const createPieChart = (data: User[], role?: "all" | UserRole) => {
    let activeCount = 0;
    let canceledCount = 0;

    if (role === "all") {
      activeCount = data.filter((user) => user.isActive).length;
      canceledCount = data.filter((user) => !user.isActive).length;
    } else {
      activeCount = data.filter(
        (user) => user.role === role && user.isActive
      ).length;
      canceledCount = data.filter(
        (user) => user.role === role && !user.isActive
      ).length;
    }

    if (activeCount === 0 && canceledCount === 0) {
      const svg = d3
        .select(`#chart-${role}`)
        .attr("width", 200)
        .attr("height", 200);
      svg
        .append("text")
        .attr("x", 100)
        .attr("y", 100)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#000")
        .text("Não há dados para exibir");
      return;
    }

    const chartData = [
      { label: "Ativos", value: activeCount, color: "#34D399" },
      { label: "Cancelados", value: canceledCount, color: "#EF4444" },
    ];

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(`#chart-${role}`)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<ChartData>().value((d) => d.value);
    const arc = d3
      .arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll("arc").data(pie(chartData)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color);
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#000")
      .text((d) => `${d.data.value}`);
  };

  useEffect(() => {
    if (!loading) {
      createPieChart(usersData, "all");
      createPieChart(usersData, UserRole.USER);
      createPieChart(usersData, UserRole.ADMIN);
    }
  }, [loading, usersData]);

  return (
    <div className="flex justify-between">
      {["all", UserRole.USER, UserRole.ADMIN].map((role) => (
        <div
          key={role}
          className="text-center bg-white p-4 rounded-lg shadow-sm w-1/3 mr-2"
        >
          <h2 className="text-xl font-semibold mb-4">
            {role === "all" ? "Todos os Usuários" : `Usuários ${role}`}
          </h2>
          <svg id={`chart-${role}`} className="mx-auto"></svg>
          <GraphLegend
            data={[
              { label: "Ativos", color: "#34D399" },
              { label: "Cancelados", color: "#EF4444" },
            ]}
          />
        </div>
      ))}
    </div>
  );
};

export default UserCharts;
