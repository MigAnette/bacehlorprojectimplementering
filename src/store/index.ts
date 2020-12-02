import { getStoreBuilder, StoreBuilder } from 'vuex-typex';
import { TasksState } from './modules/tasks';

// Anti-treeshaking
import './modules/tasks';

export interface RootState {
  tasks: TasksState,
}

const rootStoreBuilder:StoreBuilder<RootState> = getStoreBuilder<RootState>();

export default root;