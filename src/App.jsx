import { useState } from 'react';
import './App.css';

const reasons = [
  'Porque haces que hasta los días normales se sientan especiales.',
  'Porque siempre me sacas una sonrisa.',
  'Porque a tu lado, cualquier lugar se siente como hogar.',
  'Porque me inspiras a ser mi mejor versión, sin dejar de ser yo.',
  'Siempre puedo hablar contigo.',
  'Las noches contigo siempre son especiales.',
  'Eres hermosa y única; no quisiera perderte.',
  'Sos re linda y especial con todos.',
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpread, setIsSpread] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [turning, setTurning] = useState(null);
  const [history, setHistory] = useState([]);
  const leftReasonIndex = history[history.length - 1];

  function showNextReason() {
    if (turning !== null) return;

    const nextIndex = (reasonIndex + 1) % reasons.length;
    setTurning({ direction: 'next', from: reasonIndex, to: nextIndex });
    setReasonIndex(nextIndex);
  }

  function showPreviousReason() {
    if (turning !== null || history.length === 0) return;

    const previousIndex = history[history.length - 1];
    setHistory((previousHistory) => previousHistory.slice(0, -1));
    setTurning({ direction: 'previous', from: previousIndex, to: previousIndex });
    setReasonIndex(previousIndex);
  }

  function finishPageTurn() {
    if (turning?.direction === 'next') {
      setHistory((previousHistory) => [...previousHistory, turning.from]);
    }
    setTurning(null);
  }

  function finishCoverOpening(event) {
    if (isOpen && event.target === event.currentTarget) {
      setIsSpread(true);
    }
  }

  function returnToCover() {
    if (turning !== null) return;

    setIsSpread(false);
    setIsOpen(false);
  }

  return (
    <main className="page">
      <article className={`love-book${isOpen ? ' love-book--open' : ''}${isSpread ? ' love-book--spread' : ''}`}>
        <div className="book-spine" aria-hidden="true" />
        <section
          className="book-page"
          aria-label="Páginas del libro"
          aria-hidden={!isOpen}
          style={{ '--stack-depth': Math.min(history.length, 6) }}
        >
          <div className="book-spread">
            <span className="page-stack" aria-hidden="true" />
            <section className="book-leaf book-leaf--left" aria-label="Página anterior">
              <div className="page-topline">
                <span>PARA TI</span>
                <span aria-hidden="true">♥</span>
              </div>
              {leftReasonIndex === undefined ? (
                <div className="left-dedication">
                  <span className="dedication-flower" aria-hidden="true">✿</span>
                  <p>Cada página guarda una razón para quererte.</p>
                  <span className="reason-divider" aria-hidden="true">♡　♡　♡</span>
                </div>
              ) : (
                <div className="reason-content">
                  <span className="reason-count">
                    RAZÓN {leftReasonIndex + 1} DE 1000
                  </span>
                  <div className="reason-flower" aria-hidden="true">✿</div>
                  <h2>Te amo porque...</h2>
                  <p className="reason-text">{reasons[leftReasonIndex]}</p>
                  <span className="reason-divider" aria-hidden="true">♡　♡　♡</span>
                </div>
              )}
              <span className="book-page-number">
                {leftReasonIndex === undefined ? '♡' : leftReasonIndex + 1}
              </span>
            </section>
            <section className="book-leaf book-leaf--right" aria-label="Página actual" aria-live="polite">
              <div className="page-topline">
                <span>PARA TI, CON AMOR</span>
                <span aria-hidden="true">♥</span>
              </div>
              <div className="reason-content">
                <span className="reason-count">RAZÓN {reasonIndex + 1} DE 1000</span>
                <div className="reason-flower" aria-hidden="true">✿</div>
                <h1>Te amo porque...</h1>
                <p className="reason-text">{reasons[reasonIndex]}</p>
                <span className="reason-divider" aria-hidden="true">♡　♡　♡</span>
              </div>
              <span className="book-page-number">{reasonIndex + 1}</span>
            </section>
            {turning !== null && (
              <div
                className={`page-flip page-flip--${turning.direction}`}
                onAnimationEnd={finishPageTurn}
                aria-hidden="true"
              >
                <div className="page-flip-face page-flip-front">
                  <span>RAZÓN {turning.from + 1} DE 1000</span>
                  <strong>Te amo porque...</strong>
                  <p>{reasons[turning.from]}</p>
                  <span className="page-flip-hearts">♡　♡　♡</span>
                </div>
                <div className="page-flip-face page-flip-back">
                  <span>RAZÓN {turning.to + 1} DE 1000</span>
                  <strong>Te amo porque...</strong>
                  <p>{reasons[turning.to]}</p>
                  <span className="page-flip-hearts">♡　♡　♡</span>
                </div>
              </div>
            )}
          </div>
          <div className="page-actions">
            <button
              className="text-button"
              onClick={showPreviousReason}
              disabled={turning !== null || history.length === 0}
            >
              ← Anterior
            </button>
            <button
              className="text-button"
              onClick={returnToCover}
              disabled={turning !== null}
            >
              Portada
            </button>
            <button
              className="book-button"
              onClick={showNextReason}
              disabled={turning !== null}
            >
              Siguiente <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="page-footer">Hecho con todo mi cariño</p>
        </section>
        <div
          className={`book-cover${isOpen ? ' book-cover--open' : ''}`}
          onTransitionEnd={finishCoverOpening}
        >
          <section className="cover-front" aria-labelledby="book-title" aria-hidden={isOpen}>
            <div className="cover-decoration">
              <img
                className="cover-image"
                src="/panda-heart.jpg"
                alt="Panda abrazando un corazón"
              />
              <span className="cover-sparkle cover-sparkle--left" aria-hidden="true">✦</span>
              <span className="cover-sparkle cover-sparkle--right" aria-hidden="true">✧</span>
            </div>
            <div className="cover-title">
              <p className="eyebrow">Un libro hecho para ti</p>
              <h1 id="book-title">
                Mil cosas
                <br />
                por las que
                <br />
                te amo
              </h1>
              <p className="cover-note">Pequeñas razones, un amor enorme.</p>
            </div>
            <button
              className="book-button"
              onClick={() => setIsOpen(true)}
              tabIndex={isOpen ? -1 : 0}
            >
              Abrir mi libro <span aria-hidden="true">→</span>
            </button>
            <span className="cover-heart" aria-hidden="true">♥</span>
          </section>
          <div className="cover-inside" aria-hidden="true">
            <span>Un montón de razones</span>
            <span className="inside-heart">♥</span>
            <span>para elegirte cada día</span>
          </div>
        </div>
      </article>
      <p className="page-caption">Un detalle para alguien muy especial <span aria-hidden="true">♡</span></p>
    </main>
  );
}

export default App;
