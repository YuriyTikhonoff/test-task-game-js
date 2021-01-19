import { createFighterImage } from '../fighterPreview';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
  const fighterImg = createFighterImage(fighter);
  const modalElement = {
    title: `${fighter.name} has won!!!`,
    bodyElement: fighterImg
  };
  
  showModal(modalElement);  
}

