export const initialState = {
  latestTasks: [],
  oldTasks: [],
  noDueDateTasks: [],
  isStale: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setTasks':
      return {
        ...state,
        ...action.tasks,
        isStale: false,
      };
    case 'setStale':
      return {
        ...state,
        isStale: true,
      };
    default:
      return state;
  }
};
