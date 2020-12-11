export interface Task {
    id?: string;
    title: string;
    steps: { title?: string; done?: boolean }[];
    energyLevel: number;
    energyOutcome: string;
    repeat: string;
    date: string;
    startTime?: string;
    finishTime?: string;
    diffTime: {
      min?: number;
      hour?: number;
    };
    category: {
      name?: string;
      color?: string;
    };
    reminder?: string;
    note?: string;
    done: boolean;
  }