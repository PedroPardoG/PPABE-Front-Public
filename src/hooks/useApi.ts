import { useState, useEffect } from 'react';
import { apiEndpoints, handleApiError } from '../services/api';

// Tipos para los datos del API según la respuesta real del backend
interface Dependencia {
  id: string;
  nombre: string;
}

interface Programa {
  id: string;
  nombre: string;
}

interface Componente {
  id: string;
  nombre: string;
}

// Tipo para la respuesta envuelta del backend
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error: null;
  metadata?: any;
}

interface Carpeta {
  id: string;
  nombre: string;
  dependencia: string;
  programa: string;
  anio: number;
  fechaPublicacion: string;
  totalBeneficiarios: number;
}

interface Beneficiario {
  beneficiario: string;
  programa: string;
  subprograma: string;
  dependencia: string;
  apoyo: string;
  fecha: string;
}

// Nuevos tipos para el endpoint de beneficiarios por filtros
interface BeneficiarioCompleto {
  beneficiario: string;
  programa: string;
  subprograma: string; // corresponde al componente
  dependencia: string;
  apoyo: number; // ahora es number según el ejemplo del backend
  fecha: string; // ya viene formateada como "18/09/2025"
}

interface EstadisticasBeneficiarios {
  totalBeneficiarios: number;
  montoTotal?: string;
  programasEncontrados: number;
  componentesEncontrados: number;
  aniosEncontrados: number[];
}

interface RespuestaBeneficiariosPorFiltros {
  beneficiarios: BeneficiarioCompleto[];
  estadisticas: EstadisticasBeneficiarios;
}

// ==================== NUEVOS HOOKS CON FILTRADO ESCALONADO ====================

// Hook para obtener años disponibles (siempre todos)
export const useAniosDisponibles = () => {
  const [anios, setAnios] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnios = async () => {
    console.log('📅 Fetching años disponibles...');
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getAniosDisponibles() as ApiResponse<{anios: number[]}>;
      console.log('✅ Años response:', response);
      
      if (response.success && response.data) {
        setAnios(response.data.anios || []);
        console.log('✅ Años data extracted:', response.data.anios);
      } else {
        throw new Error(response.message || 'Error al obtener años');
      }
    } catch (err) {
      console.error('❌ Error fetching años:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnios();
  }, []);

  return { anios, loading, error, refetch: fetchAnios };
};

// Hook para obtener meses por año (y opcionalmente dependencia)
export const useMesesPorAnio = (anio: string | null, idDependencia?: string | null) => {
  const [meses, setMeses] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeses = async () => {
    if (!anio) {
      setMeses([]);
      return;
    }

    console.log('📆 Fetching meses for año:', anio, 'dependencia:', idDependencia);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getMesesPorAnio(anio, idDependencia || null) as ApiResponse<{meses: number[]}>;
      console.log('✅ Meses response:', response);
      
      if (response.success && response.data) {
        setMeses(response.data.meses || []);
        console.log('✅ Meses data extracted:', response.data.meses);
      } else {
        setMeses([]);
      }
    } catch (err) {
      console.error('❌ Error fetching meses:', err);
      setError(handleApiError(err));
      setMeses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeses();
  }, [anio, idDependencia]);

  return { meses, loading, error, refetch: fetchMeses };
};

// Hook para obtener dependencias filtradas (anio requerido, mes opcional)
export const useDependenciasPorFiltros = (filters: { anio: string | null; mes?: string | null }) => {
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDependencias = async () => {
    if (!filters.anio) {
      setDependencias([]);
      return;
    }

    console.log('🏢 Fetching dependencias for filters:', filters);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getDependenciasPorFiltros({
        anio: filters.anio,
        mes: filters.mes || undefined
      }) as ApiResponse<{dependencias: Dependencia[]}>;
      console.log('✅ Dependencias response:', response);
      
      if (response.success && response.data) {
        setDependencias(response.data.dependencias || []);
        console.log('✅ Dependencias data extracted:', response.data.dependencias);
      } else {
        setDependencias([]);
      }
    } catch (err) {
      console.error('❌ Error fetching dependencias:', err);
      setError(handleApiError(err));
      setDependencias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencias();
  }, [filters.anio, filters.mes]);

  return { dependencias, loading, error, refetch: fetchDependencias };
};

// Hook para obtener programas por filtros
export const useProgramasPorFiltrosNuevo = (filters: { 
  anio: string | null; 
  mes?: string | null; 
  idDependencia: string | null;
}) => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgramas = async () => {
    if (!filters.anio || !filters.idDependencia) {
      setProgramas([]);
      return;
    }

    console.log('📊 Fetching programas for filters:', filters);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getProgramasPorFiltros({
        anio: filters.anio,
        mes: filters.mes || undefined,
        idDependencia: filters.idDependencia
      }) as ApiResponse<{programas: Programa[]}>;
      console.log('✅ Programas response:', response);
      
      if (response.success && response.data) {
        setProgramas(response.data.programas || []);
        console.log('✅ Programas data extracted:', response.data.programas);
      } else {
        setProgramas([]);
      }
    } catch (err) {
      console.error('❌ Error fetching programas:', err);
      setError(handleApiError(err));
      setProgramas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramas();
  }, [filters.anio, filters.idDependencia, filters.mes]);

  return { programas, loading, error, refetch: fetchProgramas };
};

// Hook para obtener componentes por filtros (ACTUALIZADO - SIN SUBPROGRAMA)
export const useComponentesPorFiltrosNuevo = (filters: { 
  anio: string | null; 
  mes?: string | null; 
  idDependencia: string | null;
  idPrograma: string | null;
}) => {
  const [componentes, setComponentes] = useState<Componente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComponentes = async () => {
    if (!filters.anio || !filters.idDependencia || !filters.idPrograma) {
      setComponentes([]);
      return;
    }

    console.log('🧩 Fetching componentes for filters:', filters);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getComponentesPorFiltros({
        anio: filters.anio,
        mes: filters.mes || undefined,
        idDependencia: filters.idDependencia,
        idPrograma: filters.idPrograma
      }) as ApiResponse<{componentes: Componente[]}>;
      console.log('✅ Componentes response:', response);
      
      if (response.success && response.data) {
        setComponentes(response.data.componentes || []);
        console.log('✅ Componentes data extracted:', response.data.componentes);
      } else {
        setComponentes([]);
      }
    } catch (err) {
      console.error('❌ Error fetching componentes:', err);
      setError(handleApiError(err));
      setComponentes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponentes();
  }, [filters.anio, filters.idDependencia, filters.idPrograma, filters.mes]);

  return { componentes, loading, error, refetch: fetchComponentes };
};

// Hook para obtener beneficiarios con nuevos filtros (ACTUALIZADO - SIN SUBPROGRAMA - BÚSQUEDA MANUAL)
export const useBeneficiariosPorFiltrosNuevo = (filters: {
  anio: string | null;
  mes: string | null;
  idDependencia: string | null;
  idPrograma?: string;
  idComponente?: string;
} | null) => {
  const [beneficiarios, setBeneficiarios] = useState<BeneficiarioCompleto[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasBeneficiarios | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBeneficiarios = async () => {
    // Si no hay filtros (null), no hacer la consulta
    if (!filters) {
      setBeneficiarios([]);
      setEstadisticas(null);
      setMetadata(null);
      return;
    }

    // Si no hay filtros mínimos, no hacer la consulta
    if (!filters.anio || !filters.idDependencia) {
      setBeneficiarios([]);
      setEstadisticas(null);
      setMetadata(null);
      return;
    }

    console.log('👥 Fetching beneficiarios con filtros nuevos:', filters);
    setLoading(true);
    setError(null);
    
    // DELAY TEMPORAL PARA VISUALIZAR EL PROGRESS BAR (REMOVER EN PRODUCCIÓN)
    await new Promise(resolve => setTimeout(resolve, 2500)); // 2.5 segundos de delay
    
    try {
      const response = await apiEndpoints.getBeneficiariosPorFiltros({
        anio: filters.anio!,
        mes: filters.mes || undefined,
        idDependencia: filters.idDependencia!,
        idPrograma: filters.idPrograma,
        idComponente: filters.idComponente
      }) as ApiResponse<BeneficiarioCompleto[]>;
      
      console.log('✅ Beneficiarios response:', response);
      
      if (response.success && response.data) {
        setBeneficiarios(Array.isArray(response.data) ? response.data : []);
        setEstadisticas(response.metadata?.estadisticas || null);
        setMetadata(response.metadata || null);
        console.log('✅ Beneficiarios cargados:', Array.isArray(response.data) ? response.data.length : 0);
      } else {
        throw new Error(response.message || 'Error al obtener beneficiarios');
      }
    } catch (err) {
      console.error('❌ Error fetching beneficiarios:', err);
      setError(handleApiError(err));
      setBeneficiarios([]);
      setEstadisticas(null);
      setMetadata(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiarios();
  }, [filters?.anio, filters?.mes, filters?.idDependencia, filters?.idPrograma, filters?.idComponente]);

  return { 
    beneficiarios, 
    estadisticas, 
    metadata, 
    loading, 
    error, 
    refetch: fetchBeneficiarios 
  };
};

// ==================== HOOKS LEGACY (mantener por compatibilidad) ====================

// Hook para obtener dependencias disponibles (siempre todas)
export const useDependenciasDisponibles = () => {
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDependencias = async () => {
    console.log('🏢 Fetching dependencias disponibles...');
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getDependenciasDisponibles() as ApiResponse<{dependencias: Dependencia[]}>;
      console.log('✅ Dependencias response:', response);
      
      if (response.success && response.data) {
        setDependencias(response.data.dependencias || []);
        console.log('✅ Dependencias data extracted:', response.data.dependencias);
      } else {
        throw new Error(response.message || 'Error al obtener dependencias');
      }
    } catch (err) {
      console.error('❌ Error fetching dependencias:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencias();
  }, []);

  return { dependencias, loading, error, refetch: fetchDependencias };
};

// Hook para obtener programas por dependencia
export const useProgramasPorDependencia = (idDependencia: string | null) => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgramas = async () => {
    if (!idDependencia) {
      setProgramas([]);
      return;
    }

    console.log('� Fetching programas for dependencia:', idDependencia);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getProgramasPorDependencia(idDependencia) as ApiResponse<{programas: Programa[]}>;
      console.log('✅ Programas response:', response);
      
      if (response.success && response.data) {
        setProgramas(response.data.programas || []);
        console.log('✅ Programas data extracted:', response.data.programas);
      } else {
        setProgramas([]);
      }
    } catch (err) {
      console.error('❌ Error fetching programas:', err);
      setError(handleApiError(err));
      setProgramas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramas();
  }, [idDependencia]);

  return { programas, loading, error, refetch: fetchProgramas };
};

// Hook para obtener componentes por programa
export const useComponentesPorPrograma = (idPrograma: string | null) => {
  const [componentes, setComponentes] = useState<Componente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComponentes = async () => {
    if (!idPrograma) {
      setComponentes([]);
      return;
    }

    console.log('🧩 Fetching componentes for programa:', idPrograma);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getComponentesPorPrograma(idPrograma) as ApiResponse<{componentes: Componente[]}>;
      console.log('✅ Componentes response:', response);
      
      if (response.success && response.data) {
        setComponentes(response.data.componentes || []);
        console.log('✅ Componentes data extracted:', response.data.componentes);
      } else {
        setComponentes([]);
      }
    } catch (err) {
      console.error('❌ Error fetching componentes:', err);
      setError(handleApiError(err));
      setComponentes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponentes();
  }, [idPrograma]);

  return { componentes, loading, error, refetch: fetchComponentes };
};

// Hook para obtener años por filtros
export const useAniosPorFiltros = (filters: {
  idDependencia?: string;
  idPrograma?: string;  
  idComponente?: string;
}) => {
  const [anios, setAnios] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnios = async () => {
    console.log('📅 Fetching años for filters:', filters);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getAniosPorFiltros(filters) as ApiResponse<{anios: number[]}>;
      console.log('✅ Años response:', response);
      
      if (response.success && response.data) {
        setAnios(response.data.anios || []);
        console.log('✅ Años data extracted:', response.data.anios);
      } else {
        setAnios([]);
      }
    } catch (err) {
      console.error('❌ Error fetching años:', err);
      setError(handleApiError(err));
      setAnios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnios();
  }, [filters.idDependencia, filters.idPrograma, filters.idComponente]);

  return { anios, loading, error, refetch: fetchAnios };
};

// Hook para obtener carpetas publicadas con filtros
export const useCarpetasPublicadas = (filters?: {
  idDependencia?: string;
  idPrograma?: string;
  anio?: string;
}) => {
  const [carpetas, setCarpetas] = useState<Carpeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCarpetas = async (newFilters?: typeof filters) => {
    console.log('📁 Fetching carpetas with filters:', newFilters || filters);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getCarpetasPublicadas(newFilters || filters) as ApiResponse<Carpeta[]>;
      console.log('✅ Carpetas response:', response);
      
      if (response.success && response.data) {
        setCarpetas(Array.isArray(response.data) ? response.data : []);
        console.log('✅ Carpetas data extracted:', response.data);
      } else {
        console.log('⚠️ No carpetas found or error in response');
        setCarpetas([]);
      }
    } catch (err) {
      console.error('❌ Error fetching carpetas:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarpetas();
  }, [filters?.idDependencia, filters?.idPrograma, filters?.anio]);

  return { carpetas, loading, error, refetch: fetchCarpetas };
};

// Hook para obtener beneficiarios de una carpeta específica
export const useBeneficiariosPorCarpeta = (
  idCarpeta: string | null,
  filters?: {
    idDependencia?: string;
    idPrograma?: string;
    idComponente?: string;
  }
) => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBeneficiarios = async (newFilters?: typeof filters) => {
    if (!idCarpeta) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getBeneficiariosPorCarpeta(idCarpeta, newFilters || filters) as ApiResponse<Beneficiario[]>;
      console.log('✅ Beneficiarios response:', response);
      
      if (response.success && response.data) {
        setBeneficiarios(Array.isArray(response.data) ? response.data : []);
        console.log('✅ Beneficiarios data extracted:', response.data);
      } else {
        console.log('⚠️ No beneficiarios found or error in response');
        setBeneficiarios([]);
      }
    } catch (err) {
      console.error('❌ Error fetching beneficiarios:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idCarpeta) {
      fetchBeneficiarios();
    }
  }, [idCarpeta, filters?.idDependencia, filters?.idPrograma, filters?.idComponente]);

  return { beneficiarios, loading, error, refetch: fetchBeneficiarios };
};

// Custom hook for fetching statistics
export const useEstadisticas = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstadisticas = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiEndpoints.getEstadisticas();
      setData(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  return { data, loading, error, refetch: fetchEstadisticas };
};

// Hook para obtener beneficiarios directamente por filtros (NUEVO ENFOQUE)
export const useBeneficiariosPorFiltros = (filters: {
  idDependencia?: string;
  idPrograma?: string;
  idComponente?: string;
  anio?: string;
}) => {
  const [beneficiarios, setBeneficiarios] = useState<BeneficiarioCompleto[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasBeneficiarios | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBeneficiarios = async () => {
    // Si no hay dependencia seleccionada, no hacer la consulta
    if (!filters.idDependencia) {
      setBeneficiarios([]);
      setEstadisticas(null);
      setMetadata(null);
      return;
    }

    console.log('👥 Fetching beneficiarios directos para filtros:', filters);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiEndpoints.getBeneficiariosPorFiltros({
        anio: filters.anio || '',
        mes: '1', // Por defecto si se usa el hook legacy
        idDependencia: filters.idDependencia || '',
        idPrograma: filters.idPrograma,
        idComponente: filters.idComponente
      }) as ApiResponse<BeneficiarioCompleto[]>;
      
      console.log('✅ Beneficiarios directos response:', response);
      
      if (response.success && response.data) {
        // Los beneficiarios ahora están directamente en response.data
        setBeneficiarios(Array.isArray(response.data) ? response.data : []);
        setEstadisticas(response.metadata?.estadisticas || null);
        setMetadata(response.metadata || null);
        console.log('✅ Beneficiarios directos cargados:', Array.isArray(response.data) ? response.data.length : 0);
      } else {
        throw new Error(response.message || 'Error al obtener beneficiarios');
      }
    } catch (err) {
      console.error('❌ Error fetching beneficiarios directos:', err);
      setError(handleApiError(err));
      setBeneficiarios([]);
      setEstadisticas(null);
      setMetadata(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiarios();
  }, [filters.idDependencia, filters.idPrograma, filters.idComponente, filters.anio]);

  return { 
    beneficiarios, 
    estadisticas, 
    metadata, 
    loading, 
    error, 
    refetch: fetchBeneficiarios 
  };
};
