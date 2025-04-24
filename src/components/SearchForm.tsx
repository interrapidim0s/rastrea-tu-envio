import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/img/interrapidisimo-1.png';
import bgPattern from '/img/recogidasbesktop-1.jpg';
import { Footer } from '@/components/Footer';

export function SearchForm() {
  const [guia, setGuia] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = guia.trim();
    if (!/^\d+$/.test(trimmed)) {
      setError('Solo se permiten números.');
      return;
    }
    if (trimmed.length < 5 || trimmed.length > 15) {
      setError('La guía debe tener entre 5 y 15 dígitos.');
      return;
    }
    setError('');
    navigate(`/resultado/${trimmed}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col justify-between items-center">
      <img
        src={bgPattern}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        aria-hidden="true"
      />

      <header className="absolute top-0 left-0 w-full z-10 bg-[#303030] py-4 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-6">
          <img src={logo} alt="Logo de la empresa" className="w-32 sm:w-36 md:w-48 mb-2 md:mb-0" />
          <nav>
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 text-white font-medium text-center md:text-left">
              <li><a href="#" className="hover:text-gray-400">Inicio</a></li>
              <li><a href="#services" className="hover:text-gray-400">Servicios</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center w-full px-4 pt-32 pb-10 relative z-10">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-md w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#303030] mb-6 tracking-tight leading-tight">
            Rastrea tu envío
          </h1>
          <p className="text-center text-gray-600 mb-8 text-base sm:text-lg">
            Ingresa tu número de guía para obtener información en tiempo real sobre tu paquete.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <input
              type="text"
              inputMode="numeric"
              maxLength={15}
              placeholder="Ej: 100123456789"
              value={guia}
              onChange={(e) => setGuia(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-[#303030] transition duration-200 text-base"
              required
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 bg-[#303030] hover:bg-[#232323] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors duration-200 text-base"
            >
              Buscar
            </button>
          </form>
          {error && (
            <p className="text-red-500 mt-4 text-sm text-center font-medium">{error}</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}