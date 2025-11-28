"use client"

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from 'react-icons/md';
import { createCondominio, updateCondominio, ICondominio } from "@/services/condominio.service";
import { toast } from "sonner";

interface CondominioModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: (item?: ICondominio) => void;
  initial?: Partial<ICondominio>;
}

export default function CondominioModal({ open, setOpen, onSuccess, initial }: CondominioModalProps) {
  const [loading, setLoading] = React.useState(false);
  const emptyForm = {
    nome_condominio: "",
    endereco_condominio: "",
    cidade_condominio: "",
    uf_condominio: "",
    tipo_condominio: "",
    cep: "",
  };

  const [form, setForm] = React.useState(() => ({
    ...emptyForm,
    nome_condominio: initial?.nome_condominio ?? "",
    endereco_condominio: initial?.endereco_condominio ?? "",
    cidade_condominio: initial?.cidade_condominio ?? "",
    uf_condominio: initial?.uf_condominio ?? "",
    tipo_condominio: initial?.tipo_condominio ?? "",
  }));

  React.useEffect(() => {
    if (open) {
      if (initial) {
        setForm({
          ...emptyForm,
          nome_condominio: initial.nome_condominio ?? "",
          endereco_condominio: initial.endereco_condominio ?? "",
          cidade_condominio: initial.cidade_condominio ?? "",
          uf_condominio: initial.uf_condominio ?? "",
          tipo_condominio: initial.tipo_condominio ?? "",
        });
      } else {
        setForm({ ...emptyForm });
      }
    } else {
      // clear on close
      setForm({ ...emptyForm });
    }
  }, [open, initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const [cepLoading, setCepLoading] = React.useState(false);

  const buscarCep = async () => {
    const raw = form.cep || "";
    const cep = raw.replace(/[^0-9]/g, "");
    if (cep.length !== 8) {
      toast.error('CEP inválido. Informe 8 dígitos.');
      return;
    }
    try {
      setCepLoading(true);
      const res = await fetch(`/api/cep?cep=${cep}`);
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.error ?? 'Falha ao buscar CEP');
        return;
      }
      const data = json.data;
      const endereco = `${data.logradouro ?? ''} ${data.bairro ?? ''}`.trim();
      setForm((p) => ({ ...p, endereco_condominio: endereco, cidade_condominio: data.localidade ?? '', uf_condominio: data.uf ?? '' }));
      toast.success('Endereço preenchido a partir do CEP');
    } catch (err) {
      console.error(err);
      toast.error('Falha ao buscar CEP');
    } finally {
      setCepLoading(false);
    }
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    try {
      setLoading(true);
      // build payload without cep so it is not saved to the DB
      const payload: Partial<ICondominio> = {
        nome_condominio: form.nome_condominio,
        endereco_condominio: form.endereco_condominio,
        cidade_condominio: form.cidade_condominio,
        uf_condominio: form.uf_condominio,
        tipo_condominio: form.tipo_condominio,
      };
      if (initial?.id_condominio) {
        const updated = await updateCondominio(initial.id_condominio, payload);
        toast.success('Condomínio atualizado');
        onSuccess(updated);
      } else {
        const created = await createCondominio(payload as any);
        toast.success('Condomínio criado');
        onSuccess(created as ICondominio);
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar condomínio');
    } finally { setLoading(false); }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-lg z-50">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-semibold mb-2">{initial?.id_condominio ? 'Editar condomínio' : 'Novo condomínio'}</Dialog.Title>
            <button type="button" onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
              <MdClose size={20} />
            </button>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="text-sm">Nome</label>
              <input name="nome_condominio" value={form.nome_condominio} onChange={handleChange} placeholder="Nome do condomínio" className="w-full border p-2 rounded mt-1" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm">CEP</label>
                <input name="cep" value={form.cep} onChange={handleChange} className="w-full border p-2 rounded mt-1" placeholder="00000-000" />
              </div>
              <div className="w-36 flex items-end">
                <button type="button" onClick={buscarCep} disabled={cepLoading} className="px-3 py-2 rounded bg-gray-100 border">
                  {cepLoading ? 'Buscando...' : 'Buscar CEP'}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm">Endereço</label>
              <input name="endereco_condominio" value={form.endereco_condominio} onChange={handleChange} placeholder="Rua, número - bairro" className="w-full border p-2 rounded mt-1" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm">Cidade</label>
                <input name="cidade_condominio" value={form.cidade_condominio} onChange={handleChange} placeholder="Cidade" className="w-full border p-2 rounded mt-1" />
              </div>
              <div className="w-24">
                <label className="text-sm">UF</label>
                <input name="uf_condominio" value={form.uf_condominio} onChange={handleChange} placeholder="UF" className="w-full border p-2 rounded mt-1" />
              </div>
              <div className="w-36">
                <label className="text-sm">Tipo</label>
                <select name="tipo_condominio" value={form.tipo_condominio} onChange={handleChange} className="w-full border p-2 rounded mt-1">
                  <option value="">Selecione o tipo</option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={loading || !form.nome_condominio.trim() || !form.endereco_condominio.trim() || !form.cidade_condominio.trim() || !form.uf_condominio.trim() || !form.tipo_condominio.trim()}
                className="px-4 py-2 rounded bg-[#0F4C4C] text-white disabled:opacity-60"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
