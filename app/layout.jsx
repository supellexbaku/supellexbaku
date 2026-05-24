export const metadata = {
  title: "Supellex",
  description: "Supellex Baku premium mebel sistemi"
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body style={{
        margin:0,
        background:"#050505"
      }}>
        {children}
      </body>
    </html>
  );
}
