import React, { useState, useCallback, useEffect } from 'react';
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import DetalhesCliente from "./detalhesCliente";
import FormularioEdicaoCliente from "./formularioEdicaoCliente";
import FormularioCadastroCliente, { NovoClientePayload } from "./formularioCadastroCliente";
import { Cliente } from "./dados";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [telaAnterior, setTelaAnterior] = useState('Clientes');

    const fetchClientes = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:32831/cliente/clientes');
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    }, []);

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const selecionarView = useCallback((novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault();
        setTela(novaTela);
        setClienteSelecionado(null);
    }, []);

    const mostrarDetalhesCliente = useCallback((cliente: Cliente) => {
        setTelaAnterior(tela);
        setTela('Detalhes Cliente');
        setClienteSelecionado(cliente);
    }, [tela]);

    const fecharDetalhes = useCallback(() => {
        setTela(telaAnterior);
        setClienteSelecionado(null);
    }, [telaAnterior]);

    const adicionarCliente = useCallback(async (novoCliente: NovoClientePayload) => {
        try {
            const response = await fetch('http://localhost:32831/cliente/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoCliente),
            });
            if (response.ok) {
                setTela('Clientes');
                fetchClientes();
            } else {
                alert('Erro ao cadastrar cliente!');
            }
        } catch (error) {
            console.error("Erro na requisição de cadastro:", error);
        }
    }, [fetchClientes]);

    const editarCliente = useCallback(async (clienteEditado: Cliente) => {
        try {
            const response = await fetch(`http://localhost:32831/cliente/atualizar`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteEditado),
            });
            if (response.ok) {
                setTela('Clientes');
                fetchClientes();
            } else {
                alert('Erro ao atualizar cliente!');
            }
        } catch (error) {
            console.error("Erro na requisição de atualização:", error);
        }
    }, [fetchClientes]);

    const excluirCliente = useCallback(async (clienteParaExcluir: Cliente) => {
        if (window.confirm(`Tem certeza que deseja excluir o cliente ${clienteParaExcluir.nome}?`)) {
            try {
                const payload = { id: clienteParaExcluir.id };
                const response = await fetch(`http://localhost:32831/cliente/excluir`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    alert('Cliente excluído com sucesso!');
                    fetchClientes();
                } else {
                    alert('Erro ao excluir cliente!');
                }
            } catch (error) {
                console.error("Erro na requisição de exclusão:", error);
            }
        }
    }, [fetchClientes]);

    return (
        <>
            <BarraNavegacao tema="#6c757d" seletorView={selecionarView} />
            <div className="container mt-4">
                {tela === 'Clientes' && <ListaCliente tema="#6c757d" clientes={clientes} onDetalhes={mostrarDetalhesCliente} onEditar={(c) => { setClienteSelecionado(c); setTela('Editar Cliente'); }} onExcluir={excluirCliente} />}
                {tela === 'Cadastrar Cliente' && <FormularioCadastroCliente tema="#6c757d" onSubmit={adicionarCliente} />}
                {tela === 'Editar Cliente' && clienteSelecionado && <FormularioEdicaoCliente cliente={clienteSelecionado} tema="#6c757d" onFechar={fecharDetalhes} onSalvar={editarCliente} />}
                {tela === 'Detalhes Cliente' && clienteSelecionado && <DetalhesCliente cliente={clienteSelecionado} tema="#6c757d" onFechar={fecharDetalhes} />}
            </div>
        </>
    );
}