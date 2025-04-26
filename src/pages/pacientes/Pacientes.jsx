import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function Pacientes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Datos de ejemplo para la lista de pacientes
  const pacientes = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+34 612 345 678',
      lastVisit: '15/03/2024',
      status: 'Activo',
      avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=5470C6&color=fff',
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria.garcia@example.com',
      phone: '+34 678 901 234',
      lastVisit: '10/03/2024',
      status: 'Activo',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=91CC75&color=fff',
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos.lopez@example.com',
      phone: '+34 645 678 901',
      lastVisit: '05/03/2024',
      status: 'Inactivo',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Lopez&background=FAC858&color=fff',
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@example.com',
      phone: '+34 623 456 789',
      lastVisit: '01/03/2024',
      status: 'Activo',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Martinez&background=EE6666&color=fff',
    },
    {
      id: 5,
      name: 'Roberto Sánchez',
      email: 'roberto.sanchez@example.com',
      phone: '+34 667 890 123',
      lastVisit: '25/02/2024',
      status: 'Activo',
      avatar: 'https://ui-avatars.com/api/?name=Roberto+Sanchez&background=73C0DE&color=fff',
    },
  ];

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">Pacientes</h1>
              <p className="mt-2 text-gray-600">Gestión de pacientes del consultorio dental</p>
            </div>

            {/* Card */}
            <div className="bg-white shadow-lg rounded-xl border border-gray-100">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-blue-600">Lista de Pacientes</h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-2 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">PACIENTE</div>
                        </th>
                        <th className="px-2 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">EMAIL</div>
                        </th>
                        <th className="px-2 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">TELÉFONO</div>
                        </th>
                        <th className="px-2 py-3 whitespace-nowrap">
                          <div className="font-semibold text-left">ÚLTIMA VISITA</div>
                        </th>
                        <th className="px-2 py-3 whitespace-nowrap">
                          <div className="font-semibold text-center">ESTADO</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-gray-200">
                      {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <Link to={`/pacientes/${paciente.id}`} className="flex items-center hover:text-blue-600">
                              <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                <img className="rounded-full" src={paciente.avatar} width="40" height="40" alt={paciente.name} />
                              </div>
                              <div className="font-medium text-gray-800">{paciente.name}</div>
                            </Link>
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <div className="text-left">{paciente.email}</div>
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <div className="text-left">{paciente.phone}</div>
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <div className="text-left">{paciente.lastVisit}</div>
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <div className="text-center">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full ${
                                paciente.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {paciente.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Pacientes; 