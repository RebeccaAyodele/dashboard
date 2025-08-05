import { useQuery } from "@tanstack/react-query";

const fetchStats = async () => {
  const res = await fetch("http://localhost:3000/stats");
  return res.json();
};

const User = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  if (isLoading) return <p>Loading stats...</p>;
  if (error) return <p>Error loading stats</p>;

  return (
    <div>
      <h1 className="uppercase text-xl font-bebas ml-8">Weekly Statistics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-[90%] mx-auto">
      <div className="p-4 rounded">
        <h3 className="text-red-400 uppercase font-semibold text-sm">Users</h3>
        <p className="text-4xl text-gray-700 font-bold">{data.users}</p>
      </div>
      <div className="p-4 rounded">
        <h3 className="text-red-400 uppercase font-semibold text-sm">New Users</h3>
        <p className="text-4xl text-gray-700 font-bold">{data.newUsers}</p>
      </div>
      <div className="p-4 rounded">
        <h3 className="text-red-400 uppercase font-semibold text-sm">Page Views</h3>
        <p className="text-4xl text-gray-700 font-bold">{data.pageViews}</p>
      </div>
      <div className="p-4 rounded">
        <h3 className="text-red-400 uppercase font-semibold text-sm">Bounce Rate</h3>
        <p className="text-4xl text-gray-700 font-bold">{data.bounceRate}%</p>
      </div>
    </div>
    </div>
  );
};

export default User;
