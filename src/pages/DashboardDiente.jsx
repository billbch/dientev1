import React, { useState, useEffect } from 'react';
import BarChart01 from '../charts/BarChart01';
import PieChart from '../charts/PieChart';
import DoughnutChart from '../charts/DoughnutChart';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function DashboardDiente() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const today = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startingBlankDays, setStartingBlankDays] = useState([]);
  const [endingBlankDays, setEndingBlankDays] = useState([]);

  // Datos de ejemplo para citas
  const appointments = [
    {
      eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 10),
      eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 11),
      eventName: 'Juan Pérez - Limpieza Dental',
      eventColor: 'sky'
    },
    {
      eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 15),
      eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 16),
      eventName: 'María García - Ortodoncia',
      eventColor: 'indigo'
    },
    {
      eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 9),
      eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 10),
      eventName: 'Carlos López - Extracción',
      eventColor: 'red'
    },
    {
      eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 8, 14),
      eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 8, 15),
      eventName: 'Ana Martínez - Revisión',
      eventColor: 'green'
    },
    {
      eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 11),
      eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 12),
      eventName: 'Roberto Sánchez - Empaste',
      eventColor: 'yellow'
    }
  ];

  // Datos de ejemplo para las gráficas
  const procedimientos = {
    labels: ['Ortodoncia', 'Cirugía Dental', 'Extracción', 'Limpieza', 'Empaste'],
    datasets: [
      {
        data: [20, 15, 10, 25, 30],
        backgroundColor: [
          '#5470C6', // azul
          '#91CC75', // verde
          '#FAC858', // amarillo
          '#EE6666', // rojo
          '#73C0DE', // azul claro
        ],
        borderWidth: 0,
      },
    ],
  };

  const distribucionGenero = {
    labels: ['Masculino', 'Femenino', 'Otro'],
    datasets: [
      {
        data: [45, 50, 5],
        backgroundColor: [
          '#5470C6', // azul
          '#EE6666', // rojo
          '#FAC858', // amarillo
        ],
        borderWidth: 0,
      },
    ],
  };

  const isToday = (date) => {
    const day = new Date(year, month, date);
    return today.toDateString() === day.toDateString() ? true : false;
  }

  const getEvents = (date) => {
    return appointments.filter(e => new Date(e.eventStart).toDateString() === new Date(year, month, date).toDateString());
  }

  const eventColor = (color) => {
    switch (color) {
      case 'sky':
        return 'text-white bg-sky-500';
      case 'indigo':
        return 'text-white bg-violet-500';
      case 'yellow':
        return 'text-white bg-yellow-500';
      case 'green':
        return 'text-white bg-green-500';
      case 'red':
        return 'text-white bg-red-500';
      default:
        return '';
    }
  };

  const getDays = () => {
    const days = new Date(year, month + 1, 0).getDate();

    // starting empty cells (previous month)
    const startingDayOfWeek = new Date(year, month).getDay();
    let startingBlankDaysArray = [];
    for (let i = 1; i <= startingDayOfWeek; i++) {
      startingBlankDaysArray.push(i);
    }

    // ending empty cells (next month)
    const endingDayOfWeek = new Date(year, month + 1, 0).getDay();
    let endingBlankDaysArray = [];
    for (let i = 1; i < 7 - endingDayOfWeek; i++) {
      endingBlankDaysArray.push(i);
    }

    // current month cells
    let daysArray = [];
    for (let i = 1; i <= days; i++) {
      daysArray.push(i);
    }

    setStartingBlankDays(startingBlankDaysArray);
    setEndingBlankDays(endingBlankDaysArray);
    setDaysInMonth(daysArray);
  }

  useEffect(() => {
    getDays();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

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
              <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">Dashboard Dental ✨</h1>
              <p className="mt-2 text-gray-600">Bienvenido a tu panel de control dental</p>
            </div>

            {/* Grid de gráficas */}
            <div className="grid grid-cols-12 gap-6">
              {/* Calendar Card */}
              <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/60">
                <div className="p-5">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{`${monthNames[month]} ${year}`}</h2>
                  </div>

                  {/* Calendar table */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    {/* Days of the week */}
                    <div className="grid grid-cols-7 gap-px border-b border-gray-200 dark:border-gray-700/60">
                      {dayNames.map(day => (
                        <div className="px-1 py-3" key={day}>
                          <div className="text-gray-500 text-sm font-medium text-center lg:hidden">{day.substring(0,3)}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center hidden lg:block">{day}</div>
                        </div>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700/60">
                      {/* Empty cells (previous month) */}
                      {startingBlankDays.map(blankday => (
                        <div className="bg-gray-50 dark:bg-gray-800 h-20 sm:h-28 lg:h-36" key={blankday}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <rect width="100%" height="100%" fill="url(#stripes)" />
                          </svg>
                        </div>
                      ))}

                      {/* Days of the current month */}
                      {daysInMonth.map(day => (
                        <div className="relative bg-white dark:bg-gray-800 h-20 sm:h-28 lg:h-36 overflow-hidden" key={day}>
                          <div className="h-full flex flex-col justify-between">
                            {/* Events */}
                            <div className="grow flex flex-col relative p-0.5 sm:p-1.5 overflow-hidden">
                              {getEvents(day).map(event => (
                                <button className="relative w-full text-left mb-1" key={event.eventName}>
                                  <div className={`px-2 py-0.5 rounded-lg overflow-hidden ${eventColor(event.eventColor)}`}>
                                    {/* Event name */}
                                    <div className="text-xs font-semibold truncate">{event.eventName}</div>
                                    {/* Event time */}
                                    <div className="text-xs uppercase truncate hidden sm:block">
                                      {event.eventStart && (
                                        <span>{event.eventStart.toLocaleTimeString([], {hour12: true, hour: 'numeric', minute:'numeric'})}</span>
                                      )}
                                      {event.eventEnd && (
                                        <span>
                                          - <span>{event.eventEnd.toLocaleTimeString([], {hour12: true, hour: 'numeric', minute:'numeric'})}</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              ))}
                              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none" aria-hidden="true"></div>
                            </div>
                            {/* Cell footer */}
                            <div className="flex justify-between items-center p-0.5 sm:p-1.5">
                              {/* More button (if more than 2 events) */}
                              {getEvents(day).length > 2 && (
                                <button className="text-xs text-gray-500 dark:text-gray-300 font-medium whitespace-nowrap text-center sm:py-0.5 px-0.5 sm:px-2 border border-gray-200 dark:border-gray-700/60 rounded-lg">
                                  <span className="md:hidden">+</span>
                                  <span>{getEvents(day).length - 2}</span>
                                  <span className="hidden md:inline">more</span>
                                </button>
                              )}
                              {/* Day number */}
                              <button className={`inline-flex ml-auto w-6 h-6 items-center justify-center text-xs sm:text-sm dark:text-gray-300 font-medium text-center rounded-full hover:bg-blue-100 dark:hover:bg-gray-600 ${isToday(day) && 'text-blue-500'}`}>
                                {day}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Empty cells (next month) */}
                      {endingBlankDays.map(blankday => (
                        <div className="bg-gray-50 dark:bg-gray-800 h-20 sm:h-28 lg:h-36" key={blankday}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <rect width="100%" height="100%" fill="url(#stripes)" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfica de Procedimientos */}
              <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-blue-600">Procedimientos Realizados</h2>
                </header>
                <div className="p-3">
                  <PieChart data={procedimientos} width={300} height={248} />
                </div>
              </div>

              {/* Distribución por Género */}
              <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-blue-600">Distribución por Género</h2>
                </header>
                <div className="p-3">
                  <DoughnutChart data={distribucionGenero} width={300} height={248} />
                </div>
              </div>

              {/* Tarjetas de métricas */}
              <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-600 mb-1">Pacientes Activos</h3>
                      <div className="text-3xl font-bold text-gray-800">248</div>
                      <div className="text-sm text-green-500">+12% vs mes anterior</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-600 mb-1">Ingresos del Mes</h3>
                      <div className="text-3xl font-bold text-gray-800">$24,780</div>
                      <div className="text-sm text-green-500">+8% vs mes anterior</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-600 mb-1">Citas Pendientes</h3>
                      <div className="text-3xl font-bold text-gray-800">12</div>
                      <div className="text-sm text-blue-500">Para hoy</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardDiente; 