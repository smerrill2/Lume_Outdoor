export const metadata = {
  title: 'Transform Your Home | Lume Outdoor Lighting',
  description: 'Premium outdoor lighting design & installation for Wichita homeowners. Free consultation and a 20-year product warranty. See our before & after transformations.',
};

export default function GetStartedLayout({ children }) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      {children}
    </div>
  );
}
