const createButton = (text: string, callback: () => void) => {
  const button = document.createElement('button') as HTMLButtonElement;
  button.textContent = text;

  button.addEventListener('click', () => callback());

  return button;
}

export { createButton }