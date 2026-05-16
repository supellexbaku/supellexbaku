export default function SupellexPage() {
  const images = [
    {
      id: 1,
      src: 'https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg',
      alt: 'Supellex example image',
    },
    {
      id: 2,
      src: 'https://res.cloudinary.com/dvjkyyk9z/image/upload/v1778955122/20250516_181657_chat8b.jpg',
      alt: 'Supellex gallery image',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="py-16">
        <h1 className="text-5xl font-bold mb-6">Supellex</h1>
        <p className="max-w-2xl text-lg leading-8 mb-12">
          Bu səhifə Supellex layihəsi üçün xüsusi səhifədir. Burada Supellex ilə bağlı fotoşəkilləri və təqdimatı görə bilərsiniz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="w-full rounded-3xl border border-white/10 shadow-lg"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
