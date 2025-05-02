import { useForm } from '@inertiajs/react';

export default function Create({ cargos }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    telefone: '',
    cargo_id: '',
    data_admissao: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('usuarios.store'));
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

      <div>
        <label>Data de admissão:</label>
        <input
          type="date"
          value={data.data_admissao}
          onChange={(e) => setData('data_admissao', e.target.value)}
        />
        {errors.data_admissao && <p className="text-red-500">{errors.data_admissao}</p>}
      </div>

      <button type="submit" disabled={processing}>
        {processing ? 'Salvando...' : 'Criar Usuário'}
      </button>
    </form>
  );
}
