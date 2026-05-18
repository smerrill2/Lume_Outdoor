export const metadata = {
  title: 'Lume Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  /* Fixed overlay to cover the root layout's Navbar/Footer */
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-auto">
      {children}
    </div>
  );
}
