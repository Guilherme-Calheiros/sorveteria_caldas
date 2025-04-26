import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    nome: '',
    email: '',
    telefone: '',
    id_cargo: '',
    data_admissao: '',
  });

  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    axios.get('/api/cargos', {
        headers: {
          Authorization: 'Bearer 1|hrvRUjuKii6tdr74OrD3tjvDaP4kx1kUOODzdyio5e9c219c',
          Accept: 'application/json'
        }
      })
      .then((res) => setCargos(res.data))
      .catch((err) => console.error('Erro ao carregar cargos:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('users.store')); // a rota do seu controller
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={data.nome}
          onChange={(e) => setData('nome', e.target.value)}
        />
        {errors.nome && <p className="text-red-500">{errors.nome}</p>}
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
          value={data.id_cargo}
          onChange={(e) => setData('id_cargo', e.target.value)}
        >
          <option value="">Selecione um cargo</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.name}
            </option>
          ))}
        </select>
        {errors.id_cargo && <p className="text-red-500">{errors.id_cargo}</p>}
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
