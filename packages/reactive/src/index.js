const computedTracker = [];

function detectCircularity(token) {
  if (computedTracker.indexOf(token) > -1) {
    throw Error('Circular computation');
  }
}

export function reactive(value) {
  const subscribers = [];

  const self = function (...args) {
    return args.length ? write(args[0]) : read();
  };

  self['subscribe'] = (subscriber, immediate) => {
    if (subscribers.indexOf(subscriber) === -1) {
      subscribers.push(subscriber);
    }
    if (immediate) {
      subscriber(value);
    }
  };

  self['unsubscribe'] = (subscriber) => {
    const position = subscribers.indexOf(subscriber);
    if (position > -1) {
      subscribers.splice(position, 1);
    }
  };

  function write(newValue) {
    if (newValue === value && (value === null || typeof value !== 'object')) {
      return;
    }

    const oldValue = value;
    value = newValue;

    for (let i = subscribers.length - 1; i > -1; i--) {
      subscribers[i](value, oldValue);
    }
  }

  function read() {
    const runningComputation = computedTracker[computedTracker.length - 1];
    if (runningComputation) {
      self['subscribe'](runningComputation[0]);
    }
    return value;
  }

  return self;
}

export function computed(fn) {
  const self = reactive();
  const computationToken = [runComputed];

  runComputed();
  return self;

  function runComputed() {
    detectCircularity(computationToken);
    computedTracker.push(computationToken);
    let errors, result;
    try {
      result = fn();
    } catch (e) {
      errors = e;
    }
    computedTracker.pop();
    if (errors) {
      throw errors;
    }
    self(result);
  }
}

