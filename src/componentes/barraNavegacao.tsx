import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento: React.MouseEvent) => void;
}

export default function BarraNavegacao(props: Props) {
    const { tema, seletorView } = props;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{
            backgroundColor: tema,
            borderBottom: '2px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#" onClick={(e) => seletorView('Clientes', e)}>
                    <i className="bi bi-heart-fill me-2"></i>
                    PetLovers
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item mx-1">
                            <a
                                className="nav-link py-2 px-3 rounded-2"
                                href="#"
                                onClick={(e) => seletorView('Clientes', e)}
                            >
                                <i className="bi bi-people-fill me-2"></i>
                                Clientes
                            </a>
                        </li>

                        <li className="nav-item dropdown mx-1">
                            <a
                                className="nav-link dropdown-toggle py-2 px-3 rounded-2"
                                href="#"
                                id="navbarDropdownCadastros"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-file-earmark-plus me-2"></i>
                                Cadastros
                            </a>
                            <ul
                                className="dropdown-menu shadow-sm border-0"
                                aria-labelledby="navbarDropdownCadastros"
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px'
                                }}
                            >
                                <li>
                                    <a
                                        className="dropdown-item py-2 px-3"
                                        href="#"
                                        onClick={(e) => seletorView('Cadastrar Cliente', e)}
                                    >
                                        <i className="bi bi-person-plus me-2" style={{ color: tema }}></i>
                                        Cliente
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}