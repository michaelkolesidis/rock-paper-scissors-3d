// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      /**
       * Round
       */
      round: 0,
      nextRound: () => set((state) => ({ round: Number(state.round) + 1 })),
      resetRound: () => {
        set(() => {
          return {
            round: 0,
          };
        });
      },
      setRound: (num) => {
        set(() => {
          return {
            round: num,
          };
        });
      },

      /**
       * Scoring
       */
      playerScore: 0,
      setPlayerScore: (score) => {
        set(() => {
          return {
            playerScore: score,
          };
        });
      },

      computerScore: 0,
      setComputerScore: (score) => {
        set(() => {
          return {
            computerScore: score,
          };
        });
      },

      playerWinsTotal: 0,
      setplayerWinsTotal: (wins) => {
        set(() => {
          return {
            playerWinsTotal: wins,
          };
        });
      },

      computerWinsTotal: 0,
      setComputerWinsTotal: (wins) => {
        set(() => {
          return {
            computerWinsTotal: wins,
          };
        });
      },

      /**
       * Game mode
       */
      mode: "fiveWins", // "threeWins", "sevenWins", "endless"
      setMode: (gameMode) => {
        set(() => {
          return {
            mode: gameMode,
          };
        });
      },

      /**
       * Time
       */
      // startTime: 0,
      // endTime: 0,

      /**
       * Phases
       */
      phase: "ready", // "playing", "ended"

      setPhase: (gamePhase) => {
        set(() => {
          return {
            phase: gamePhase,
          };
        });
      },

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return {
              phase: "playing",
              // startTime: Date.now()
            };
          }
          return {};
        });
      },

      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready" };
          }
          return {};
        });
      },

      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return {
              phase: "ended",
              // endTime: Date.now()
            };
          }
          return {};
        });
      },
    };
  })
);
