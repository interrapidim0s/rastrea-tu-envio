// src/components/SearchForm.tsx
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/interrapidisimo-1.png';
import bgPattern from '../assets/img/recogidasbesktop-1.jpg';

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
    <div className="relative min-h-screen bg-gray-50 flex flex-col justify-center items-center overflow-hidden">
      <img
        src={bgPattern}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-0 w-full z-10 bg-[#303030] py-4 shadow-md">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-6">
          <img src={logo} alt="Logo de la empresa" className="w-40 md:w-52" />
          <nav>
            <ul className="flex space-x-8 text-white font-medium">
              <li><a href="" className="hover:text-gray-400">Inicio</a></li>
              <li><a href="#services" className="hover:text-gray-400">Servicios</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="relative z-10 bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 max-w-md w-full mx-4">
        <h1 className="text-4xl font-extrabold text-center text-[#303030] mb-6 tracking-tight leading-tight">
          Rastrea tu envío
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
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
            className="w-full px-6 py-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-[#303030] transition duration-200"
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-4 bg-[#303030] hover:bg-[#232323] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors duration-200"
          >
            Buscar
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-4 text-sm text-center font-medium">{error}</p>
        )}
      </div>

      <footer className="mt-10 text-gray-500 text-sm text-center z-10">
        © 2025 INTERRAPIDISIMO. Todos los derechos reservados.
      </footer>
    </div>
  );
}
