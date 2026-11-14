import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('keeps one reason on each page and can turn the spread both ways', () => {
  const { container } = render(<App />);
  expect(screen.getByRole('img', { name: /panda abrazando un corazón/i })).toBeDefined();

  fireEvent.click(screen.getByRole('button', { name: /abrir mi libro/i }));
  const cover = container.querySelector('.book-cover');
  expect(cover.classList.contains('book-cover--open')).toBe(true);
  fireEvent.transitionEnd(cover, { propertyName: 'transform' });
  expect(container.querySelector('.love-book').classList.contains('love-book--spread')).toBe(true);

  const previousButton = screen.getByRole('button', { name: /anterior/i });
  const nextButton = screen.getByRole('button', { name: /siguiente/i });
  expect(previousButton.disabled).toBe(true);
  expect(container.querySelector('.book-leaf--right').textContent).toMatch(
    /haces que hasta los días normales/,
  );

  fireEvent.click(nextButton);
  expect(nextButton.disabled).toBe(true);
  expect(container.querySelector('.page-flip--next')).not.toBeNull();
  expect(screen.getAllByText(/sonreír y reír/i)).toHaveLength(2);

  fireEvent.animationEnd(container.querySelector('.page-flip'));
  expect(nextButton.disabled).toBe(false);
  expect(previousButton.disabled).toBe(false);
  expect(container.querySelector('.book-page').style.getPropertyValue('--stack-depth')).toBe('1');
  expect(container.querySelector('.book-leaf--left').textContent).toMatch(
    /haces que hasta los días normales/,
  );
  expect(container.querySelector('.book-leaf--right').textContent).toMatch(
    /sonreír y reír/,
  );

  fireEvent.click(previousButton);
  expect(container.querySelector('.page-flip--previous')).not.toBeNull();
  fireEvent.animationEnd(container.querySelector('.page-flip'));
  expect(container.querySelector('.book-leaf--left').textContent).toMatch(
    /Cada página guarda una razón/,
  );
  expect(container.querySelector('.book-leaf--right').textContent).toMatch(
    /haces que hasta los días normales/,
  );
  expect(previousButton.disabled).toBe(true);

  const remainingReasons = [
    'Porque sabes hacerme sonreír y reír, hasta en los momentos más inesperados.',
    'Porque a tu lado, cualquier lugar se siente como hogar.',
    'Porque me inspiras a ser mi mejor versión, sin dejar de ser yo.',
    'Siempre puedo hablar contigo.',
    'Las noches contigo siempre son especiales.',
    'Eres hermosa y única; no quisiera perderte.',
    'Sos re linda y especial con todos.',
    'Porque, pase lo que pase, siempre estás ahí para tomarme de la mano.',
    'Porque sabes escucharme y comprenderme hasta en mis días difíciles.',
    'Porque a tu lado encuentro mi lugar seguro y la calma que necesito.',
    'Porque llenas de amor hasta los gestos más pequeños.',
    'Porque siempre eres tú misma, auténtica y única.',
    'Porque la luz de tu alma ilumina cualquier lugar.',
    'Porque a veces nos entendemos con solo una mirada.',
    'Porque tu voz calma cualquier tormenta dentro de mí.',
    'Porque en tus abrazos siento que todo está bien.',
    'Porque tus sueños y metas me inspiran a luchar por los míos.',
    'Porque recuerdas esas pequeñas cosas que te cuento y las haces importantes.',
    'Porque admiro tu valentía y cómo enfrentas cada reto.',
    'Porque a tu lado me siento afortunado y valorado.',
    'Porque me quieres con mis virtudes, defectos e imperfecciones.',
    'Porque cuando imagino el futuro, siempre te veo a mi lado.',
    'Porque sabes perdonar y resolver las cosas con amor.',
    'Porque mi corazón te elige simplemente por ser tú.',
  ];

  for (const reason of remainingReasons) {
    fireEvent.click(nextButton);
    fireEvent.animationEnd(container.querySelector('.page-flip'));
    expect(container.querySelector('.book-leaf--right').textContent).toContain(reason);
  }
});
