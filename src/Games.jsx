import React, {useEffect, useRef, useState} from 'react';
import {newGame, sameCell, SIZE, step} from './snake-engine.js';

const directions = {Up: {x: 0, y: -1}, Down: {x: 0, y: 1}, Left: {x: -1, y: 0}, Right: {x: 1, y: 0}};
function DirectionIcon({direction}) {return <svg className={`icon direction-${direction.toLowerCase()}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20V4m-6 6 6-6 6 6"/></svg>;}
function Snake() {
  const [game, setGame] = useState(newGame);
  const [best, setBest] = useState(() => {try {return Number(localStorage.getItem('ahmed-snake-best')) || 0;} catch {return 0;}});
  const queued = useRef({x: 1, y: 0});
  const board = useRef(null);
  useEffect(() => {
    if (game.phase !== 'running') return;
    const timer = setInterval(() => setGame(current => step(current, queued.current)), 180);
    return () => clearInterval(timer);
  }, [game.phase]);
  useEffect(() => {
    if (game.score > best) {setBest(game.score); try {localStorage.setItem('ahmed-snake-best', String(game.score));} catch {}}
  }, [game.score, best]);
  useEffect(() => {
    const pause = () => {if (document.hidden) setGame(current => current.phase === 'running' ? {...current, phase: 'paused'} : current);};
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, []);
  function start() {queued.current = {x: 1, y: 0}; setGame({...newGame(), phase: 'running'}); board.current?.focus();}
  function pause() {setGame(current => ({...current, phase: current.phase === 'running' ? 'paused' : 'running'})); board.current?.focus();}
  function keyboard(event) {
    const name = event.key.replace('Arrow', '');
    if (directions[name]) {event.preventDefault(); queued.current = directions[name];}
    if (event.code === 'Space' && ['running', 'paused'].includes(game.phase)) {event.preventDefault(); pause();}
  }
  const message = {ready: 'Ready when you are.', running: 'Collect the violet squares. Avoid the walls and your tail.', paused: 'Paused. Resume when ready.', over: 'Game over. Try another run.', won: 'You filled the board. Well played!'}[game.phase];
  return <div className="game-layout">
    <div className="snake-board" ref={board} tabIndex="0" onKeyDown={keyboard} role="group" aria-label="Snake game board" aria-describedby="snake-instructions">
      <div className="snake-grid" aria-hidden="true">{Array.from({length: SIZE * SIZE}, (_, index) => {const cell = {x: index % SIZE, y: Math.floor(index / SIZE)};return <span key={index} className={sameCell(game.snake[0], cell) ? 'snake-head' : game.snake.some(segment => sameCell(segment, cell)) ? 'snake-body' : game.food && sameCell(game.food, cell) ? 'snake-food' : ''}/>;})}</div>
    </div>
    <div className="game-copy"><div className="game-score"><span>Score <strong>{game.score}</strong></span><span>Your best <strong>{best}</strong></span></div><p id="snake-instructions">Use the arrow keys while the board is focused, or the direction buttons. Space pauses the game.</p><p className="game-message" role="status">{message}</p><div className="game-actions">{['ready', 'over', 'won'].includes(game.phase) ? <button className="button primary" onClick={start}>{game.phase === 'ready' ? 'Start Snake' : 'Play again'}</button> : <button className="button secondary" onClick={pause}>{game.phase === 'running' ? 'Pause Snake' : 'Resume Snake'}</button>}<button className="button secondary" onClick={() => setGame(newGame())}>Reset</button></div><div className="direction-controls" aria-label="Snake direction">{Object.keys(directions).map(direction => <button key={direction} className={`move-${direction.toLowerCase()}`} aria-label={`Move ${direction.toLowerCase()}`} disabled={game.phase !== 'running'} onClick={() => {queued.current = directions[direction];}}><DirectionIcon direction={direction}/></button>)}</div></div>
  </div>;
}

const pairs = [
  ['GET', 'Read data'], ['POST', 'Create a resource'], ['401', 'Authentication needed'],
  ['404', 'Resource not found'], ['EF Core', 'Object-relational mapper'], ['Outbox', 'Persist integration events']
];
function shuffledDeck() {
  const cards = pairs.flatMap(([left, right], pair) => [{pair, text: left}, {pair, text: right}]);
  for (let index = cards.length - 1; index > 0; index--) {const target = Math.floor(Math.random() * (index + 1));[cards[index], cards[target]] = [cards[target], cards[index]];}
  return cards;
}
function Match() {
  const [deck, setDeck] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const timer = setTimeout(() => {
      if (deck[a].pair === deck[b].pair) setMatched(current => [...current, deck[a].pair]);
      setFlipped([]);
    }, deck[a].pair === deck[b].pair ? 220 : 950);
    return () => clearTimeout(timer);
  }, [flipped, deck]);
  function reveal(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(deck[index].pair)) return;
    if (flipped.length === 1) setMoves(current => current + 1);
    setFlipped(current => [...current, index]);
  }
  function reset() {setDeck(shuffledDeck());setFlipped([]);setMatched([]);setMoves(0);}
  return <div className="match-game"><div className="match-intro"><p>Match each backend term to its meaning. Reveal two tiles at a time.</p><div className="game-score"><span>Pairs <strong>{matched.length} / 6</strong></span><span>Moves <strong>{moves}</strong></span></div></div><div className="match-grid">{deck.map((card, index) => {const done = matched.includes(card.pair);const visible = done || flipped.includes(index);return <button key={index} disabled={done} className={`match-tile ${done ? 'matched' : ''}`} aria-label={visible ? card.text : `Reveal tile ${index + 1}`} aria-pressed={visible} onClick={() => reveal(index)}>{visible ? card.text : <><span className="tile-symbol" aria-hidden="true">{'{ }'}</span><span>Reveal</span></>}</button>;})}</div><div className="match-footer"><p role="status">{matched.length === 6 ? `All matched in ${moves} moves. Nice work!` : `${matched.length} of 6 pairs found.`}</p><button className="button secondary" onClick={reset}>New round</button></div></div>;
}

export default function Games() {
  const [active, setActive] = useState('snake');
  const [opened, setOpened] = useState(false);
  return <section id="play" className="play-section"><div className="section-header"><h2>A little off-duty code</h2><p>Two tiny games. No account, no leaderboard.</p></div><details className="games-disclosure" onToggle={event => setOpened(event.currentTarget.open)}><summary>Open the mini arcade <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>{opened && <div className="arcade"><div className="game-selector" role="group" aria-label="Choose a game"><button aria-pressed={active === 'snake'} onClick={() => setActive('snake')}>Snake</button><button aria-pressed={active === 'match'} onClick={() => setActive('match')}>Backend Match</button></div>{active === 'snake' ? <Snake/> : <Match/>}</div>}</details></section>;
}
