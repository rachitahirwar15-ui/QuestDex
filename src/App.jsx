import React, { useEffect, useState } from "react";
import "./App.css";
``
const partners = [
  {
    name: "Pikachu",
    emoji: "⚡",
    type: "ELECTRIC",
    color: "#ffd43b",
    message: "Let's get moving, Trainer!",
  },
  {
    name: "Charmander",
    emoji: "🔥",
    type: "FIRE",
    color: "#ff7043",
    message: "Burn through those tasks!",
  },
  {
    name: "Squirtle",
    emoji: "💧",
    type: "WATER",
    color: "#42a5f5",
    message: "Stay cool, Trainer.",
  },
  {
    name: "Bulbasaur",
    emoji: "🌿",
    type: "GRASS",
    color: "#66bb6a",
    message: "Let's grow together!",
  },
];

function App() {
  // =========================
  // TASK STATE
  // =========================

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("pokemonTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(false);
  const [filter, setFilter] = useState("all");

  // =========================
  // PARTNER STATE
  // =========================

  const [partner, setPartner] = useState(() => {
    const saved = localStorage.getItem("pokemonPartner");
    return saved ? JSON.parse(saved) : partners[0];
  });

  const [showPartners, setShowPartners] = useState(false);

  // =========================
  // SAVE TASKS
  // =========================

  useEffect(() => {
    localStorage.setItem("pokemonTasks", JSON.stringify(tasks));
  }, [tasks]);

  // =========================
  // SAVE PARTNER
  // =========================

  useEffect(() => {
    localStorage.setItem("pokemonPartner", JSON.stringify(partner));
  }, [partner]);

  // =========================
  // ADD TASK
  // =========================

  const addTask = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
    setPriority(false);
  };

  // =========================
  // TOGGLE TASK
  // =========================

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // =========================
  // CLEAR COMPLETED
  // =========================

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // =========================
  // STATS
  // =========================

  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;

  const xp = completed * 25;
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;

    return true;
  });

  return (
    <div className="app">

      {/* =========================
          ANIMATED BACKGROUND
      ========================= */}

      <div className="background">
        <div className="grid"></div>

        <div className="pokeball ball-one">
          <span></span>
        </div>

        <div className="pokeball ball-two">
          <span></span>
        </div>

        <div className="pokeball ball-three">
          <span></span>
        </div>

        <div className="pokeball ball-four">
          <span></span>
        </div>

        <div className="lightning">ϟ</div>
        <div className="lightning lightning-two">ϟ</div>
      </div>

      <main className="container">

        {/* =========================
            HEADER
        ========================= */}

        <header className="header">

          <div className="logo-area">

            <div className="mini-pokeball">
              <span></span>
            </div>

            <div>
              <p className="eyebrow">
                TRAINER JOURNAL // KANTO REGION
              </p>

              <h1>
                QUEST<span>DEX</span>
              </h1>
            </div>

          </div>

          <div className="trainer-card">

            <div className="trainer-icon">
              ⚡
            </div>

            <div>
              <small>TRAINER LEVEL</small>
              <strong>LVL {level}</strong>
            </div>

          </div>

        </header>

        {/* =========================
            XP BAR
        ========================= */}

        <section className="xp-section">

          <div className="xp-info">

            <span>
              ⚡ TRAINER XP
            </span>

            <strong>
              {progress}/100 XP
            </strong>

          </div>

          <div className="xp-bar">

            <div
              className="xp-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </section>

        {/* =========================
            PARTNER POKÉMON
        ========================= */}

        <section className="partner-section">

          <div className="partner-header">

            <div>
              <span className="panel-label">
                YOUR PARTNER
              </span>

              <h2>
                Current Pokémon
              </h2>
            </div>

            <button
              className="change-partner-btn"
              onClick={() =>
                setShowPartners(!showPartners)
              }
            >
              ↻ CHANGE PARTNER
            </button>

          </div>

          {/* CURRENT PARTNER */}

          <div
            className="partner-card-main"
            style={{
              "--partner-color": partner.color,
            }}
          >

            <div className="partner-glow"></div>

            <div className="partner-pokemon">
              {partner.emoji}
            </div>

            <div className="partner-info">

              <span className="partner-type">
                {partner.type}
              </span>

              <h2>
                {partner.name}
              </h2>

              <p>
                "{partner.message}"
              </p>

            </div>

            <div className="partner-level">

              <span>
                PARTNER
              </span>

              <strong>
                LVL {level}
              </strong>

            </div>

          </div>

          {/* PARTNER SELECTION */}

          {showPartners && (

            <div className="partner-selection">

              <div className="selection-title">

                <span>
                  SELECT YOUR PARTNER
                </span>

                <button
                  onClick={() =>
                    setShowPartners(false)
                  }
                >
                  ×
                </button>

              </div>

              <div className="partner-grid">

                {partners.map((pokemon) => (

                  <button
                    key={pokemon.name}
                    className={`partner-option ${
                      pokemon.name === partner.name
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      setPartner(pokemon);
                      setShowPartners(false);
                    }}
                  >

                    <span
                      className="option-pokemon"
                      style={{
                        background: pokemon.color,
                      }}
                    >
                      {pokemon.emoji}
                    </span>

                    <div>

                      <strong>
                        {pokemon.name}
                      </strong>

                      <small>
                        {pokemon.type}
                      </small>

                    </div>

                    {pokemon.name === partner.name && (
                      <span className="selected-check">
                        ✓
                      </span>
                    )}

                  </button>

                ))}

              </div>

            </div>

          )}

        </section>

        {/* =========================
            STATS
        ========================= */}

        <section className="stats">

          <div className="stat-card">

            <div className="stat-icon blue">
              ◈
            </div>

            <div>
              <span>TOTAL</span>
              <strong>{tasks.length}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon yellow">
              ⚡
            </div>

            <div>
              <span>ACTIVE</span>
              <strong>{active}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>CAUGHT</span>
              <strong>{completed}</strong>
            </div>

          </div>

        </section>

        {/* =========================
            ADD TASK
        ========================= */}

        <section className="task-panel">

          <div className="panel-header">

            <div>

              <span className="panel-label">
                WILD TASK DETECTED
              </span>

              <h2>
                Catch a new task
              </h2>

            </div>

            <div className="pokeball-status">

              <div className="small-ball"></div>

              READY

            </div>

          </div>

          <form
            onSubmit={addTask}
            className="task-form"
          >

            <div className="input-wrapper">

              <span>›</span>

              <input
                type="text"
                placeholder="What needs to be done, Trainer?"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
              />

            </div>

            <button
              type="button"
              className={`priority-btn ${
                priority ? "selected" : ""
              }`}
              onClick={() =>
                setPriority(!priority)
              }
              title="Toggle priority"
            >
              ★
            </button>

            <button
              className="add-btn"
              type="submit"
            >
              CATCH
            </button>

          </form>

        </section>

        {/* =========================
            TASK LIST
        ========================= */}

        <section className="list-section">

          <div className="list-header">

            <div>

              <span className="panel-label">
                TRAINER LOG
              </span>

              <h2>
                Your Tasks
              </h2>

            </div>

            <div className="filters">

              <button
                className={
                  filter === "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("all")
                }
              >
                ALL
              </button>

              <button
                className={
                  filter === "active"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("active")
                }
              >
                ACTIVE
              </button>

              <button
                className={
                  filter === "completed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("completed")
                }
              >
                CAUGHT
              </button>

            </div>

          </div>

          <div className="tasks">

            {filteredTasks.length === 0 ? (

              <div className="empty-state">

                <div className="empty-ball">
                  <span></span>
                </div>

                <h3>
                  No Pokémon found...
                </h3>

                <p>
                  Your task list is empty.
                  <br />
                  Go catch something productive!
                </p>

              </div>

            ) : (

              filteredTasks.map((task) => (

                <div
                  className={`task ${
                    task.completed
                      ? "completed"
                      : ""
                  }`}
                  key={task.id}
                >

                  <button
                    className="check-btn"
                    onClick={() =>
                      toggleTask(task.id)
                    }
                  >
                    {task.completed
                      ? "✓"
                      : ""}
                  </button>

                  <div className="task-content">

                    <div className="task-title">

                      {task.priority && (
                        <span className="priority-star">
                          ★
                        </span>
                      )}

                      <span>
                        {task.text}
                      </span>

                    </div>

                    <small>

                      {task.completed
                        ? "✓ CAPTURED"
                        : task.priority
                        ? "★ HIGH PRIORITY"
                        : "○ WILD TASK"}

                    </small>

                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))

            )}

          </div>

          {completed > 0 && (

            <button
              className="clear-btn"
              onClick={clearCompleted}
            >
              RELEASE ALL CAUGHT TASKS
            </button>

          )}

        </section>

        {/* =========================
            FOOTER
        ========================= */}

        <footer className="pokemon-footer">

          <div className="footer-brand">

            <div className="footer-pokeball">
              <span></span>
            </div>

            <div>

              <strong>
                POKÉTASK
              </strong>

              <small>
                TRAINER PRODUCTIVITY SYSTEM
              </small>

            </div>

          </div>

          <div className="creator">

            <span>
              CRAFTED BY
            </span>

            <strong>
              RACHIT AHIRWAR
            </strong>

            <small>
              × IN PARTNERSHIP WITH SAM ALTMAN
            </small>

          </div>

          <div className="footer-status">

            <span className="online-dot"></span>

            POKÉDEX ONLINE

          </div>

        </footer>

      </main>

    </div>
  );
}

export default App;