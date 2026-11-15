export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-6 text-center text-sm text-zinc-400">
      <p>© {new Date().getFullYear()} Frontend Movie · Proyecto Next.js + Supabase</p>
    </footer>
  );
}
