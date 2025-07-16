import { render, screen } from '@testing-library/react';

function Saludo() {
  return <h1>Hola, Admin</h1>;
}

test('debe mostrar saludo', () => {
  render(<Saludo />);
  expect(screen.getByText('Hola, Admin')).toBeInTheDocument();
});
