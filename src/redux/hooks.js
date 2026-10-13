import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook para despachar acciones de Redux con convención estandarizada
 */
export const useAppDispatch = () => useDispatch();

/**
 * Hook para seleccionar estado de Redux
 */
export const useAppSelector = useSelector;
