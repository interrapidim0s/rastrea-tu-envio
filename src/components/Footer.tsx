import logo from '../assets/img/interrapidisimo-1.png';

export function Footer() {
  return (
    <footer className="bg-[#303030] text-white py-6 w-full relative mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Interrapidísimo Logo" className="w-32" />
          <p className="text-sm text-gray-400">© 2025 Interrapidísimo</p>
        </div>
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white">Términos</a>
          <a href="#" className="hover:text-white">Privacidad</a>
          <a href="#" className="hover:text-white">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
