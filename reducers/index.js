import multireducer from 'multireducer';
import Counter from './Counter';

export const counters = multireducer({
  Counter1: Counter,
  Counter2: Counter,
  Counter3: Counter
});

export Survey from './Survey';
export Widgets from './Widgets';
export Info from './Info';
export Counter from './Counter';
