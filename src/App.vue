<template>
  <h1>A Basic Counter App</h1>
  <div>
    <button @click="send('INCREMENT')" :disabled="state.matches('inactive')">
      Increment
    </button>
    <button @click="send('DECREMENT')" :disabled="state.matches('inactive')">
      Decrement
    </button>
  </div>
  <h3>Count: {{ state.context.count.toFixed(2) }}</h3>

  <div>
    <button @click="send('TOGGLE')">{{ toggleButtonLabel }}</button>
  </div>
  <h3>Current State: {{ state.value }}</h3>

  <h3>Increment by:</h3>
  <input
    type="number"
    v-model.number="incVal"
    :disabled="state.matches('inactive')"
  />
</template>

<script>
import { useMachine } from '@xstate/vue'
import { computed, ref, watchEffect } from 'vue'

import { counterMachine } from './counterMachine'

export default {
  name: 'App',
  setup() {
    const { state, send } = useMachine(counterMachine)

    const incVal = ref(1)

    const toggleButtonLabel = computed(() => {
      const current = state.value

      if (current.matches('active')) {
        return 'inactivate'
      } else if (current.matches('inactive')) {
        return 'Activate'
      } else {
        return "I'm kinda impressed you get to this state"
      }
    })

    watchEffect(() => {
      send({
        type: 'UPDATE_INC_VAL',
        incVal: incVal.value || 0,
      })
    })

    return { state, send, toggleButtonLabel, incVal }
  },
}
</script>

<style>
button {
  margin: 0.5em;
}

button:disabled {
  background: #939292b3;
  opacity: 0.6;
}
</style>
