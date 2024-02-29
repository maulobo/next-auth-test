"use client";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: sesion, status } = useSession();
  console.log(sesion, status);
  return (
    <div>
      <pre>{JSON.stringify({ sesion, status }, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
