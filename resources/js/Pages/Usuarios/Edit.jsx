import { useForm } from '@inertiajs/react';

export default function Edit({ cargos, usuario }) {
  const { data, setData, put, processing, errors } = useForm({
    name: usuario.name,
    email: usuario.email,
    telefone: usuario.telefone,
    cargo_id: usuario.cargo_id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('usuarios.update', usuario.id), {
        data: data,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label>Telefone:</label>
        <input
          type="text"
          value={data.telefone}
          onChange={(e) => setData('telefone', e.target.value)}
        />
        {errors.telefone && <p className="text-red-500">{errors.telefone}</p>}
      </div>

      <div>
        <label>Cargo:</label>
        <select
          value={data.cargo_id}
          onChange={(e) => setData('cargo_id', e.target.value)}
        >
          <option value="">Selecione um cargo</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.name}
            </option>
          ))}
        </select>
        {errors.cargo_id && <p className="text-red-500">{errors.cargo_id}</p>}
      </div>

      <button type="submit" disabled={processing}>
        {processing ? 'Salvando...' : 'Editar Usuário'}
      </button>
    </form>
  );
}
