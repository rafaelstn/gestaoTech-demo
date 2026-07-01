"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput, SelectField, TextInput, Textarea, FieldLabel } from "@/components/ui/Field";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";

export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface FiltroDef {
  key: string;
  label: string;
  options: string[];
}

interface CrudListProps<T extends { id: string }> {
  itensIniciais: T[];
  columns: ColumnDef<T>[];
  fields: FieldDef[];
  filtros?: FiltroDef[];
  buscaKeys: (keyof T)[];
  buscaPlaceholder?: string;
  entidade: string; // "colaborador", "documento"...
  entidadeArtigo?: "o" | "a";
  /** Valores default para campos não presentes no formulário. */
  template: Omit<T, "id">;
  prefixoId: string;
}

export function CrudList<T extends { id: string }>({
  itensIniciais,
  columns,
  fields,
  filtros = [],
  buscaKeys,
  buscaPlaceholder = "Buscar...",
  entidade,
  entidadeArtigo = "o",
  template,
  prefixoId,
}: CrudListProps<T>) {
  const [itens, setItens] = useState<T[]>(itensIniciais);
  const [busca, setBusca] = useState("");
  const [filtroValores, setFiltroValores] = useState<Record<string, string>>({});
  const [seq, setSeq] = useState(1);

  // Modal de formulário (add/edit)
  const [formAberto, setFormAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  // Modal de exclusão
  const [excluindo, setExcluindo] = useState<T | null>(null);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return itens.filter((item) => {
      const okBusca =
        !termo ||
        buscaKeys.some((k) => String(item[k] ?? "").toLowerCase().includes(termo));
      const okFiltros = filtros.every((f) => {
        const v = filtroValores[f.key];
        return !v || v === "Todos" || String((item as Record<string, unknown>)[f.key]) === v;
      });
      return okBusca && okFiltros;
    });
  }, [itens, busca, filtroValores, filtros, buscaKeys]);

  const abrirNovo = () => {
    const inicial: Record<string, string> = {};
    fields.forEach((f) => {
      inicial[f.name] = f.type === "select" && f.options?.length ? f.options[0] : "";
    });
    setForm(inicial);
    setEditandoId(null);
    setFormAberto(true);
  };

  const abrirEdicao = (item: T) => {
    const inicial: Record<string, string> = {};
    fields.forEach((f) => {
      inicial[f.name] = String((item as Record<string, unknown>)[f.name] ?? "");
    });
    setForm(inicial);
    setEditandoId(item.id);
    setFormAberto(true);
  };

  const salvar = () => {
    const valores: Record<string, unknown> = {};
    fields.forEach((f) => {
      valores[f.name] = f.type === "number" ? Number(form[f.name] || 0) : form[f.name];
    });

    if (editandoId) {
      setItens((prev) =>
        prev.map((it) => (it.id === editandoId ? ({ ...it, ...valores } as T) : it)),
      );
    } else {
      const novo = {
        ...(template as object),
        ...valores,
        id: `${prefixoId}-novo-${seq}`,
      } as T;
      setSeq((s) => s + 1);
      setItens((prev) => [novo, ...prev]);
    }
    setFormAberto(false);
  };

  const confirmarExclusao = () => {
    if (excluindo) setItens((prev) => prev.filter((it) => it.id !== excluindo.id));
    setExcluindo(null);
  };

  const formValido = fields.every((f) => !f.required || (form[f.name] ?? "").trim() !== "");

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            placeholder={buscaPlaceholder}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="sm:max-w-xs"
          />
          {filtros.map((f) => (
            <SelectField
              key={f.key}
              value={filtroValores[f.key] ?? "Todos"}
              onChange={(e) => setFiltroValores((prev) => ({ ...prev, [f.key]: e.target.value }))}
              className="sm:w-auto"
              aria-label={f.label}
            >
              <option value="Todos">{f.label}: todos</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </SelectField>
          ))}
        </div>
        <Button onClick={abrirNovo} size="sm">
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>

      {/* Tabela */}
      {filtrados.length === 0 ? (
        <EmptyState action={<Button variant="secondary" size="sm" onClick={abrirNovo}>Adicionar {entidade}</Button>} />
      ) : (
        <TableWrap>
          <THead>
            <tr>
              {columns.map((c) => (
                <Th key={c.key} align={c.align}>
                  {c.header}
                </Th>
              ))}
              <Th align="right">Ações</Th>
            </tr>
          </THead>
          <TBody>
            {filtrados.map((row) => (
              <Tr key={row.id}>
                {columns.map((c) => (
                  <Td key={c.key} align={c.align}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                  </Td>
                ))}
                <Td align="right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => abrirEdicao(row)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-tech-600"
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setExcluindo(row)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      )}

      <p className="mt-3 px-1 text-xs text-slate-400">
        {filtrados.length} de {itens.length} {entidade}s exibidos
      </p>

      {/* Modal formulário */}
      <Modal
        open={formAberto}
        onClose={() => setFormAberto(false)}
        size="lg"
        title={editandoId ? `Editar ${entidade}` : `Novo ${entidade}`}
        description={
          editandoId ? "Atualize os dados e salve." : `Preencha os dados para adicionar ${entidadeArtigo} ${entidade}.`
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={salvar} variant="primary" {...(!formValido ? { disabled: true } : {})}>
              Salvar
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <FieldLabel>
                {f.label}
                {f.required && <span className="text-red-500"> *</span>}
              </FieldLabel>
              {f.type === "select" ? (
                <SelectField
                  value={form[f.name] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                >
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </SelectField>
              ) : f.type === "textarea" ? (
                <Textarea
                  rows={3}
                  placeholder={f.placeholder}
                  value={form[f.name] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                />
              ) : (
                <TextInput
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name] ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal exclusão */}
      <Modal
        open={excluindo !== null}
        onClose={() => setExcluindo(null)}
        size="sm"
        title={`Excluir ${entidade}?`}
        description="Esta ação não pode ser desfeita nesta demonstração."
        footer={
          <>
            <Button variant="secondary" onClick={() => setExcluindo(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarExclusao}>
              Excluir
            </Button>
          </>
        }
      />
    </div>
  );
}
