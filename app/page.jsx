"use client";

export default function HomePage() {
  const qalereya = [
    {
      id: 1,
      sekil:
        "https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="py-16">
        <h2 className="text-4xl font-bold mb-10">Qalereya</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qalereya.map((item) => (
            <img
              key={item.id}
              src={item.sekil}
              alt="Supellex"
              className="w-full rounded-2xl"
            />
          ))}
        </div>
      </section>
    </main>
  );
}