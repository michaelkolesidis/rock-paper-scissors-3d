// Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game.jsx';
import Interface from './Interface';

document.addEventListener('contextmenu', (event) => event.preventDefault());

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <Interface />
    <Game />
  </React.StrictMode>
);
