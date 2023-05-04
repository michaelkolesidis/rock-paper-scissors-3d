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
            round: 1,
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

      startTime: 0,
      endTime: 0,

      /**
       * Phases
       */
      phase: "ready",

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
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
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
    };
  })
);
