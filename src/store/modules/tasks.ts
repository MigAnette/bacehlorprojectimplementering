import { Task } from '@/lib/type';
import { getStoreBuilder, BareActionContext } from 'vuex-typex';
import { RootState } from './../index';
import db from '@/firebase/init';


export interface TasksState {
  tasks: Task[];
}

const taskModuleBuilder = getStoreBuilder<RootState>().module<TasksState>('Tasks', {
  tasks: [],
});

// getters
function readGetTasks(tasksState: TasksState) { return tasksState.tasks }
const getTasks = taskModuleBuilder.read(readGetTasks);

// mutations
function commitSetTasks(state: TasksState, tasks: Task[]) {
  state.tasks = tasks;
}

// actions
async function dispatchRefreshTasks(ctx: BareActionContext<TasksState, RootState>) {
  ctx
  
}

const tasks = {
  /** GETTERS */
  get tasks() { return getTasks() },
  
  /** MUTATIONS */
  setTasks: taskModuleBuilder.commit(commitSetTasks),
  
  /** ACTIONS */
  refreshTasks: taskModuleBuilder.dispatch(dispatchRefreshTasks),
}

export default tasks;