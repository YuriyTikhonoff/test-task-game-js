import { createElement } from '../helpers/domHelper';


export function createFighterPreview(fighter, position) {
  if (!fighter) return
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
 

  const fighterName = createElement({
    tagName: 'div',
    className: 'fighter__name',
  });

  fighterName.innerText = fighter && fighter.name
  fighterElement.append(fighterName)

  const fighterDesc = createElement({
    tagName: 'div',
    className: 'fighter__desc',
  });
  fighterDesc.innerHTML = `<p>Health: ${fighter?.health}</p>` + 
  `<p>Attack: ${fighter?.attack}</p>` + 
  `<p>Defense: ${fighter?.defense}</p>`
  fighterElement.append(fighterDesc)

  const fighterImg = fighter && createFighterImage(fighter)
  fighterImg.classList.add('fighter_img')
  fighterElement.append(fighterImg)


  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
