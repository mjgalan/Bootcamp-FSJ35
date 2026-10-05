'use client';
import { Productos } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface PostCardProps {
  post: Productos;
  onEdit: (post: Productos) => void;
  onDelete: (id: number) => void;
}

export function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const { isAuthenticated } = useAuth();

  return (
    <article className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between gap-4 w-full">
      {/* Información principal en fila */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className="text-xs bg-slate-100 text-black px-2 py-0.5 rounded shrink-0">
          #{post.id}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{post.nombre}</h3>
          <p className="text-sm text-slate-700 font-medium shrink-0">{post.precio}</p>
        </div>
      </div>

      {/* Botones de acción a la derecha */}
      {isAuthenticated && (
        <div className="flex gap-3 text-xs shrink-0 pl-4 border-l border-slate-100">
          <button 
            onClick={() => onEdit(post)} 
            className="text-blue-600 hover:underline font-medium"
          >
            Editar
          </button>
          <button 
            onClick={() => onDelete(post.id)} 
            className="text-red-600 hover:underline font-medium"
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
}
