import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';

export default function TrocarSenha({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-xl font-bold mb-4">Troque sua senha</h1>
        <UpdatePasswordForm />
      </div>
    </AuthenticatedLayout>
  );
}
