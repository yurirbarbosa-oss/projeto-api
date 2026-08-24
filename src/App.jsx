import { useState, useEffect } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTarefas(dados)
        setLoading(false)
      })
      .catch((erro) => {
        console.error('Erro ao buscar tarefas:', erro)
        setLoading(false)
      })
  }, [])

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Cabeçalho */}
        <div className="text-center mb-5">
          <div
            className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: '70px', height: '70px' }}
          >
            <i className="bi bi-check2-square fs-2"></i>
          </div>

          <h1 className="fw-bold text-dark">Minhas Tarefas</h1>

          <p className="text-muted mb-0">
            Tarefas carregadas da API JSONPlaceholder
          </p>
        </div>

        {/* Card principal */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

          {/* Header do card */}
          <div className="card-header bg-white border-0 p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold mb-1">
                  Lista de tarefas
                </h4>

                <small className="text-muted">
                  Dados obtidos através de fetch e useEffect
                </small>
              </div>

              {!loading && (
                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                  {tarefas.length} tarefas
                </span>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="card-body p-0">

            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                >
                  <span className="visually-hidden">
                    Carregando...
                  </span>
                </div>

                <p className="text-muted mb-0">
                  Carregando tarefas...
                </p>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {tarefas.map((item) => (
                  <div
                    key={item.id}
                    className="list-group-item p-4 border-bottom"
                  >
                    <div className="d-flex align-items-center">

                      {/* Número */}
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                          item.completed
                            ? 'bg-success-subtle text-success'
                            : 'bg-warning-subtle text-warning'
                        }`}
                        style={{
                          minWidth: '45px',
                          height: '45px',
                        }}
                      >
                        {item.completed ? (
                          <i className="bi bi-check-lg fs-5"></i>
                        ) : (
                          <i className="bi bi-clock fs-5"></i>
                        )}
                      </div>

                      {/* Tarefa */}
                      <div className="flex-grow-1">
                        <h6
                          className={`mb-1 fw-semibold ${
                            item.completed
                              ? 'text-decoration-line-through text-muted'
                              : 'text-dark'
                          }`}
                        >
                          {item.title}
                        </h6>

                        <small className="text-muted">
                          Tarefa #{item.id}
                        </small>
                      </div>

                      {/* Status */}
                      <div className="ms-3">
                        {item.completed ? (
                          <span className="badge bg-success rounded-pill px-3 py-2">
                            <i className="bi bi-check-circle me-1"></i>
                            Concluído
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                            <i className="bi bi-hourglass-split me-1"></i>
                            Pendente
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!loading && (
            <div className="card-footer bg-white border-0 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  <i className="bi bi-cloud-check me-1"></i>
                  Dados sincronizados com a API
                </small>

                <span className="text-success small fw-semibold">
                  <i className="bi bi-circle-fill me-1"></i>
                  Online
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Rodapé */}
        <div className="text-center mt-4">
          <small className="text-muted">
            Desenvolvido com React + Bootstrap
          </small>
        </div>

      </div>
    </div>
  )
}

export default App
