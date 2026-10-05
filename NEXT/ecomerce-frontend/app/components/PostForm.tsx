/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { api, Productos, getErrorMessage } from '../lib/api';

interface PostFormProps {
  editingPost: Productos | null;
  onSaved?: () => void;
  onSuccess?: () => void;
  onCancelEdit: () => void;
  onError: (msg: string | null) => void;
}

export function PostForm({
  editingPost,
  onSaved,
  onSuccess,
  onCancelEdit,
  onError,
}: PostFormProps) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0.00);
  const [cantidad, setCantidad] = useState(0.00);
  const [restoreId, setRestoreId] = useState('');
  const [loading, setLoading] = useState(false);

  // Sincroniza los campos cuando se selecciona un post para editar
  useEffect(() => {
    if (editingPost) {

      setNombre(editingPost.nombre);
      setPrecio(editingPost.precio);
      setCantidad(editingPost.cantidad);
    } else {
      setNombre('');
      setPrecio(0.00);
      setCantidad(0.00);
    }
  }, [editingPost]);

  // Ejecuta la función de callback disponible
  const triggerSuccessCallback = () => {
    if (onSaved) {
      onSaved();
    } else if (onSuccess) {
      onSuccess();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError(null);
    setLoading(true);

    try {
      if (editingPost) {
        await api.updatePost(editingPost.id, { nombre, precio, cantidad });
      } else {
        await api.createPost({ nombre, precio, cantidad });
      }

      setNombre('');
      setPrecio(0);
      setCantidad(0);
      triggerSuccessCallback();
    } catch (err) {
      onError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreId) return;

    onError(null);
    setLoading(true);

    try {
      await api.restorePost(Number(restoreId));
      setRestoreId('');
      triggerSuccessCallback();
    } catch (err) {
      onError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
      <h2 className="font-bold text-slate-800">
        {editingPost ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <p>Nombre</p>
        <input
          type="text"
          placeholder="Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
          required
          disabled={loading}
        />
        <p>Precio</p>
        <input
          type='number'
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
          required
          disabled={loading}
        />
        <p>Cantidad</p>
        <input
          type='number'
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
          required
          disabled={loading}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-md font-medium transition text-black"
          >
            {loading ? 'Guardando...' : editingPost ? 'Guardar Cambios' : 'Publicar producto'}
          </button>

          {editingPost && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={loading}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm px-4 py-2 rounded-md transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Restaurar Post Eliminado (Soft Delete) */}
      <div className="pt-3 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-600 mb-2">Restaurar producto eliminado:</p>
        <form onSubmit={handleRestore} className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="ID del producto"
            value={restoreId}
            onChange={(e) => setRestoreId(e.target.value)}
            className="w-36 border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !restoreId}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-md font-medium transition"
          >
            Restaurar
          </button>
        </form>
      </div>
    </div>
  );
}