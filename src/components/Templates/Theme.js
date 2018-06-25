export function renderIcon(state) {
  switch(state) {
  case 'home':
    return 'home';
  case 'food':
    return 'coffee';
  case 'activities':
    return 'futbol';
  case 'wellbeing':
    return 'leaf';
  case 'health':
    return 'plus-square';
  default:
    return 'home';
  }
};

export function renderTheme(state) {
  switch(state) {
  case state:
    return state;
  default:
    return 'home';
  }
}
