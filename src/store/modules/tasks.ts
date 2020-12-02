import { getStoreBuilder, BareActionContext } from 'vuex-typex';
import { RootState } from './../index';

export interface TasksState {

}

const taskModuleBuilder = getStoreBuilder<RootState>().module<TasksState>('Tasks', {
    
});

// getters

// mutations

// actions

const tasks = {
  /** GETTERS */
  /** MUTATIONS */
  /** ACTIONS */
}

export default tasks;