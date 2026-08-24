import { useEffect, useState } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao buscar tarefas')
        }

        return resposta.json()
      })
      .then((dados) => {
        setTarefas(dados)
      })
      .catch((erro) => {
        console.error(erro)
        setErro('Não foi possível carregar as tarefas.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        <div className="text-center mb-5">
          <div
            className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: '70px', height: '70px' }}
          >
            ✓
          </div>

          <h1 className="fw-bold">
            Minhas Tarefas
          </h1>

          <p className="text-muted">
            Tarefas carregadas através da API JSONPlaceholder
          </p>
        </div>

        <div className="card border-0 shadow rounded-4 overflow-hidden">

          <div className="card-header bg-white p-4">
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h4 className="fw-bold mb-1">
                  Lista de tarefas
                </h4>

                <small className="text-muted">
                  React + Fetch + useEffect
                </small>
              </div>

              {!loading && !erro && (
                <span className="badge bg-primary rounded-pill px-3 py-2">
                  {tarefas.length} tarefas
                </span>
              )}

            </div>
          </div>

          <div className="card-body p-0">

            {loading && (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                />

                <p className="text-muted mb-0">
                  Carregando tarefas...
                </p>
              </div>
            )}

            {erro && (
              <div className="alert alert-danger m-4">
                {erro}
              </div>
            )}

            {!loading && !erro && (
              <div className="list-group list-group-flush">

                {tarefas.map((item) => (
                  <div
                    key={item.id}
                    className="list-group-item p-4"
                  >
                    <div className="d-flex align-items-center">

                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                          item.completed
                            ? 'bg-success text-white'
                            : 'bg-warning text-dark'
                        }`}
                        style={{
                          width: '45px',
                          height: '45px',
                          minWidth: '45px',
                        }}
                      >
                        {item.completed ? '✓' : '•'}
                      </div>

                      <div className="flex-grow-1">

                        <h6
                          className={`mb-1 ${
                            item.completed
                              ? 'text-muted text-decoration-line-through'
                              : 'fw-semibold'
                          }`}
                        >
                          {item.title}
                        </h6>

                        <small className="text-muted">
                          Tarefa #{item.id}
                        </small>

                      </div>

                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          item.completed
                            ? 'bg-success'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {item.completed
                          ? 'Concluído'
                          : 'Pendente'}
                      </span>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

          {!loading && !erro && (
            <div className="card-footer bg-white p-4">
              <div className="d-flex justify-content-between">

                <small className="text-muted">
                  Dados obtidos da API
                </small>

                <small className="text-success fw-semibold">
                  ● Online
                </small>

              </div>
            </div>
          )}

        </div>

        <div className="text-center mt-4">
          <small className="text-muted">
            React + Vite + Bootstrap
          </small>
        </div>

      </div>
    </div>
  )
}

export default App
