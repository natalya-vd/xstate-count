import { assign, createMachine } from 'xstate'

const incCount = assign({
  count: (context) => context.count + context.incVal,
})

const decCount = assign({
  count: (context) => context.count - context.incVal,
})

const updateIncVal = assign({
  incVal: (_, event) => event.incVal,
})

const counterMachine = createMachine(
  {
    context: {
      count: 0,
      incVal: 1,
    },
    id: 'counter',
    initial: 'active',
    states: {
      active: {
        on: {
          TOGGLE: 'inactive',
          INCREMENT: {
            actions: ['incCount'],
          },
          DECREMENT: {
            actions: ['decCount'],
          },
          UPDATE_INC_VAL: {
            actions: ['updateIncVal'],
          },
        },
      },
      inactive: {
        on: {
          TOGGLE: {
            target: 'active',
          },
        },
      },
    },
  },
  {
    actions: {
      incCount,
      decCount,
      updateIncVal,
    },
  }
)

export { counterMachine }
