const slotKeys = { Grenade: 'C', Ability1: 'Q', Ability2: 'E', Ultimate: 'X' };
const slotOrder = ['Grenade', 'Ability1', 'Ability2', 'Ultimate'];

// The four bindable abilities in keyboard order (C, Q, E, X); passives are left out.
export function orderedAbilities(agent) {
  return slotOrder.map((slot) => agent.abilities?.find((ability) => ability.slot === slot && ability.displayName)).filter(Boolean)
    .map((ability) => ({ key: slotKeys[ability.slot], name: ability.displayName, description: ability.description, icon: ability.displayIcon }));
}
