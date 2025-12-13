import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session?.user) {
    return <p>Access denied.</p>;
  }

 
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (dbUser?.role !== "admin") {
    return <p>Access denied.</p>;
  }

  const [totalOrders, totalRevenue, topMovies] = await Promise.all([
    prisma.order.count(),
    prisma.orderItem.aggregate({
      _sum: { priceAtPurchase: true },
    }),
    prisma.movie.findMany({
      where: { deleted: false },
      orderBy: { orderItems: { _count: "desc" } },
      take: 5,
      select: {
        id: true,
        title: true,
        price: true,
      },
    }),
  ]);

  const normalizedMovies = topMovies.map((m) => ({
    ...m,
    price: Number(m.price),
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-2">Admin dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-slate-800 rounded p-3">
          <div className="text-xs text-slate-400 mb-1">Total orders</div>
          <div className="text-2xl font-bold">{totalOrders}</div>
        </div>

        <div className="border border-slate-800 rounded p-3">
          <div className="text-xs text-slate-400 mb-1">
            Total revenue (simulated)
          </div>
          <div className="text-2xl font-bold">
            {Number(totalRevenue._sum.priceAtPurchase ?? 0).toFixed(2)} kr
          </div>
        </div>
      </div>

      <ul>
        {normalizedMovies.map((m) => (
          <li key={m.id}>
            {m.title} {m.price.toFixed(2)} kr
          </li>
        ))}
      </ul>

      <section aria-labelledby="top-movies-heading">
        <h2 id="top-movies-heading" className="text-lg font-semibold mb-2">
          Top 5 movies by sales
        </h2>

        <ul>
          {normalizedMovies.map((m) => (
            <li key={m.id}>
              {m.title} {m.price.toFixed(2)} kr
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
