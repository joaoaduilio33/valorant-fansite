// Fan-written content the API does not provide. Facts follow the official VALORANT wiki
// (wiki.playvalorant.com); an agent missing here falls back to the API description.
// `scene` picks the place illustration in src/art/places.js.
export const agentLore = {
  jett: {
    number: 10,
    realName: 'Han Sunwoo',
    origin: { city: { pt: 'Seul', en: 'Seoul' } },
    scene: { key: 'seoul', label: { pt: 'Pagode com lanternas, inspirado nos palácios de Seul', en: "Pagoda with lanterns, inspired by Seoul's palaces" } },
    bio: {
      pt: [
        'Antes do Protocolo, Han Sunwoo cozinhava no restaurante da família, em Seul. Tudo mudou quando ela cruzou com a própria versão da Terra Ômega: as duas manipulam o vento, e a briga virou uma tempestade que quase pôs o restaurante abaixo.',
        'Recrutada como Agente 10, a Jett virou a duelista mais rápida do grupo, usando as correntes de ar para subir, deslizar e sumir no meio da fumaça.',
        'Hoje ela carrega uma culpa que não é dela: a Jett Ômega causou um desastre em Veneza, e o mundo acha que foi a Jett daqui. Por isso ela anda disfarçada em público, e a caça às versões Ômega virou assunto pessoal.',
      ],
      en: [
        'Before the Protocol, Han Sunwoo cooked at her family\'s restaurant in Seoul. Everything changed when she met her Omega Earth counterpart: both control the wind, and their fight became a storm that nearly tore the restaurant apart.',
        'Recruited as Agent 10, Jett became the team\'s fastest duelist, riding air currents to climb, dash and vanish into her own smoke.',
        'Today she carries blame that isn\'t hers: Omega Jett caused a disaster in Venice, and the world thinks it was our Jett. She now goes disguised in public, and hunting down the Omega agents has become personal.',
      ],
    },
  },
  raze: {
    number: 12,
    realName: 'Tayane Alves',
    origin: { city: { pt: 'Salvador, Bahia', en: 'Salvador, Bahia' } },
    scene: { key: 'salvador', label: { pt: 'Casarões do Pelourinho, Elevador Lacerda e fitas do Bonfim', en: 'Pelourinho houses, Lacerda Elevator and Bonfim ribbons' } },
    bio: {
      pt: [
        'Tayane Alves é engenheira, de Salvador, e mistura duas paixões: explosivos e tinta. Antes do Protocolo, era grafiteira e marcava com a sua arte os terrenos que a Kingdom Corporation abandonava na Bahia.',
        'Foi a luta dela contra a Kingdom, ajudando a expulsar a empresa do estado, que chamou a atenção do Protocolo. Entrou como Agente 12, depois de já ter feito alguns trabalhos fora da lei ao lado do Breach, que ela chama de "Breachy".',
        'A Raze constrói todo o próprio equipamento, do Boom Bot ao lança-foguetes, e melhorou os braços mecânicos do Breach. Ama break e futebol. Com a Killjoy, a amizade virou rivalidade e depois namoro, e juntas criaram o Max Bot de treino.',
      ],
      en: [
        'Tayane Alves is an engineer from Salvador with two passions: explosives and paint. Before the Protocol she was a street artist, tagging the plots Kingdom Corporation left behind in Bahia.',
        'Her fight against Kingdom, helping drive the company out of the state, put her on the Protocol\'s radar. She joined as Agent 12, after a few less-than-legal jobs alongside Breach, her "Breachy".',
        'Raze builds all of her own gear, from the Boom Bot to the rocket launcher, and upgraded Breach\'s mechanical arms. She loves breakdancing and football. With Killjoy, friendship turned into rivalry and then romance, and together they built the Max Bot trainer.',
      ],
    },
  },
  cypher: {
    number: 5,
    realName: 'Amir El Amari',
    origin: { city: { pt: 'Rabat', en: 'Rabat' } },
    scene: { key: 'rabat', label: { pt: 'Torre Hassan, colunas da mesquita e a porta da Kasbah dos Oudayas', en: 'Hassan Tower, mosque columns and the Kasbah of the Udayas gate' } },
    bio: {
      pt: [
        'Amir El Amari cresceu pobre em Rabat e culpa a Kingdom Corporation por esgotar a cidade e apagar parte da sua cultura. Virou negociante de informações: uma rede de vigilância de um homem só.',
        'Foi o Agente 05 do Protocolo. Por trás da máscara, ninguém sabe muito, nem os colegas. Ele mantém esconderijos em Rabat, Tânger e Marrakech, troca segredos com o Omen e sabe que a ficha do Sova tem detalhes inventados.',
        'Foi ele quem caçou "o chantagista", que mais tarde se revelou a Fade. Fora do trabalho, gosta de xadrez e do chá marroquino. A família é o que move cada passo dele, e também o motivo de tanto segredo.',
      ],
      en: [
        'Amir El Amari grew up poor in Rabat and blames Kingdom Corporation for draining his city and erasing part of its culture. He became an information broker: a one-man surveillance network.',
        'He was the Protocol\'s Agent 05. Behind the mask, nobody knows much, not even his teammates. He keeps safehouses in Rabat, Tangier and Marrakesh, trades secrets with Omen and knows Sova\'s file has made-up details.',
        'He was the one who hunted "the blackmailer", later revealed to be Fade. Off duty, he enjoys chess and Moroccan tea. Family drives his every move, and is the reason for all the secrecy.',
      ],
    },
  },
  brimstone: {
    number: 1,
    realName: 'Liam Byrne',
    origin: { city: { pt: 'Baltimore', en: 'Baltimore' } },
    bio: {
      pt: [
        'Liam Byrne, de Baltimore, é o Agente 01 e o comandante do Protocolo VALORANT, que montou ao lado da Viper. É ele quem decide as missões e quem entra na equipe.',
        'Veterano de combate, comanda tanto da central de operações quanto em campo, com o arsenal orbital que dá nome às suas habilidades. Muitos agentes confiam nele: a Killjoy o trata como mentor, e o Harbor deve a ele o próprio resgate.',
        'O passado também cobra: o Tejo, de volta à ativa, ainda guarda mágoa de um incidente antigo entre os dois.',
      ],
      en: [
        'Liam Byrne, from Baltimore, is Agent 01 and the commander of the VALORANT Protocol, which he built alongside Viper. He decides the missions and who joins the team.',
        'A combat veteran, he leads from the operations center and in the field, with the orbital arsenal behind his abilities. Many agents trust him: Killjoy treats him as a mentor, and Harbor owes him his rescue.',
        'The past catches up too: Tejo, back on active duty, still resents an old incident between them.',
      ],
    },
  },
  viper: {
    number: 2,
    realName: 'Sabine Callas',
    bio: {
      pt: [
        'Sabine Callas foi química da Kingdom Corporation, uma das figuras centrais na redescoberta da radianita e a primeira diretora científica da empresa. Depois, fundou o Protocolo com o Brimstone e virou o braço direito dele.',
        'Fria e estratégica, decide com ele as operações e os recrutamentos. Guarda segredos importantes: sabe quem o Omen era antes de virar sombra e não conta.',
        'Hoje trabalha com a Reyna para salvar a vida de Lucia, irmã dela. Com a Sage, a relação é difícil: uma colaboração antiga terminou mal, e a Viper não esqueceu.',
      ],
      en: [
        "Sabine Callas was a Kingdom Corporation chemist, a central figure in the rediscovery of radianite and the company's first Chief Scientific Officer. She later founded the Protocol with Brimstone and became his second-in-command.",
        "Cold and strategic, she decides operations and recruitment with him. She keeps big secrets: she knows who Omen was before he became a shadow, and won't say.",
        "Today she works with Reyna to save the life of Reyna's sister, Lucia. With Sage it's complicated: an old collaboration ended badly, and Viper hasn't forgotten.",
      ],
    },
  },
  omen: {
    number: 3,
    bio: {
      pt: [
        'Ninguém sabe ao certo quem o Omen foi. Ele já usou vários nomes, e sua origem é desconhecida até no arquivo do Protocolo, onde é o Agente 03. Feito de sombra, se teletransporta e cega os inimigos.',
        'Atrás de respostas sobre o próprio passado, recorre a quem pode ajudar: pagou o Cypher por informações (e ainda deve) e faz sessões com a Sage para recuperar memórias.',
        'A Viper conhece a identidade dele, mas guarda segredo, e isso já gerou atrito entre os dois.',
      ],
      en: [
        "No one knows for sure who Omen used to be. He has gone by several names, and his origin is unknown even in the Protocol's files, where he is Agent 03. Made of shadow, he teleports and blinds enemies.",
        'Searching for answers about his own past, he turns to whoever can help: he paid Cypher for information (and still owes him) and has sessions with Sage to recover his memories.',
        'Viper knows his identity but keeps it secret, which has caused friction between them.',
      ],
    },
  },
  killjoy: {
    number: 4,
    realName: 'Klara Böhringer',
    bio: {
      pt: [
        'Klara Böhringer é uma inventora prodígio: aos 18 anos já chefiava a pesquisa e desenvolvimento da Kingdom Corporation. Entrou no Protocolo como Agente 04 e trata o Brimstone como mentor.',
        'Tudo o que usa em campo é invenção própria, do Alarmbot à Torreta. Também projetou o teletransportador que liga a Terra Alfa à Terra Ômega.',
        'Com a Raze, a parceria virou namoro, e as duas criaram juntas o Max Bot de treino.',
      ],
      en: [
        'Klara Böhringer is a prodigy inventor: at 18 she was already leading research and development at Kingdom Corporation. She joined the Protocol as Agent 04 and sees Brimstone as a mentor.',
        'Everything she uses in the field is her own invention, from the Alarmbot to the Turret. She also designed the teleporter linking Alpha Earth and Omega Earth.',
        'With Raze, the partnership became romance, and together they built the Max Bot trainer.',
      ],
    },
  },
  sova: {
    number: 6,
    realName: 'Aleksandr Novikov',
    origin: { city: { pt: 'Severomorsk', en: 'Severomorsk' } },
    bio: {
      pt: [
        'Aleksandr Novikov, o Sasha, vem de Severomorsk, no norte da Rússia. Arqueiro, perdeu o olho direito e o substituiu por um mecânico. Foi o sexto recruta do Protocolo e virou o batedor principal, com um arco feito sob medida.',
        'É um dos homens de confiança do Brimstone e já comandou equipes em campo. Foi ele quem resgatou uma operadora norueguesa ferida numa instalação da Kingdom: a futura Deadlock.',
        'Com o Cypher, a relação tem atrito: Sova acredita em transparência, e Cypher, em segredo.',
      ],
      en: [
        "Aleksandr \"Sasha\" Novikov comes from Severomorsk, in northern Russia. An archer, he lost his right eye and replaced it with a mechanical one. He was the Protocol's sixth recruit and became its lead scout, with a custom-made bow.",
        "He is one of Brimstone's most trusted men and has led teams in the field. He rescued a wounded Norwegian operative from a Kingdom facility: the future Deadlock.",
        'With Cypher there is friction: Sova believes in transparency, Cypher in secrecy.',
      ],
    },
  },
  sage: {
    number: 7,
    realName: 'Wei Ling Ying',
    bio: {
      pt: [
        'Wei Ling Ying é uma monja Radiante da China e a sétima agente do Protocolo. Seu poder de cura e de ressurreição faz dela o pilar de qualquer equipe.',
        'Subiu rápido e virou uma das vozes mais experientes do grupo, ajudando a recrutar e treinar novos Radiantes, como a Skye. Faz sessões com o Omen para ajudá-lo a recuperar a memória.',
        'Com a Viper ficou uma mágoa: uma colaboração antiga terminou mal, e a Viper ainda cobra isso.',
      ],
      en: [
        "Wei Ling Ying is a Radiant monk from China and the Protocol's seventh agent. Her power to heal and resurrect makes her the backbone of any team.",
        "She rose quickly to become one of the group's most experienced voices, helping recruit and train new Radiants such as Skye. She holds sessions with Omen to help him recover his memory.",
        'With Viper there is a scar: an old collaboration ended badly, and Viper still holds it against her.',
      ],
    },
  },
  phoenix: {
    number: 9,
    realName: 'Jamie Adeyemi',
    origin: { city: { pt: 'Londres', en: 'London' } },
    bio: {
      pt: [
        'Jamie Adeyemi vem de Londres e é o Agente 09. Radiante, controla o fogo: cura a si mesmo com as chamas e, com o supremo, volta para a luta depois de cair.',
        'Confiante e cheio de estilo, é um dos duelistas mais conhecidos do Protocolo. Já foi salvo pelo Yoru numa missão no porto S22.',
        'Fora do serviço, joga RPG de mesa com a Killjoy, a Fade e Clove.',
      ],
      en: [
        'Jamie Adeyemi comes from London and is Agent 09. A Radiant, he controls fire: he heals himself with flames and, with his ultimate, comes back into the fight after falling.',
        "Confident and stylish, he is one of the Protocol's best-known duelists. Yoru once saved him during a mission at the S22 port.",
        'Off duty, he plays tabletop RPGs with Killjoy, Fade and Clove.',
      ],
    },
  },
  reyna: {
    number: 11,
    realName: 'Zyanya Mondragón',
    bio: {
      pt: [
        'Zyanya Mondragón é uma Radiante do México e a 11ª agente do Protocolo. Absorve a energia vital de inimigos derrotados em orbes de alma, que usa para se curar e ficar intangível.',
        'Antes do Protocolo, criou o Santuário, um refúgio para quem fugia das ações da Kingdom. Tudo o que faz tem um motivo: sua irmã, Lucia, também Radiante, precisa de essência vital para sobreviver.',
        'Por Lucia, trabalha com a Viper atrás de uma solução, mesmo desconfiando das decisões do Brimstone. É próxima do Gekko e guarda mágoa da Killjoy por causa de máquinas.',
      ],
      en: [
        "Zyanya Mondragón is a Radiant from Mexico and the Protocol's 11th agent. She absorbs the life energy of defeated enemies as soul orbs, which she uses to heal and turn intangible.",
        "Before the Protocol, she founded the Sanctuary, a refuge for people fleeing Kingdom's actions. Everything she does has a reason: her sister Lucia, also a Radiant, needs life essence to survive.",
        "For Lucia, she works with Viper on a solution, even while distrusting Brimstone's decisions. She is close to Gekko and resents Killjoy because of machines.",
      ],
    },
  },
  breach: {
    number: 13,
    realName: 'Erik Torsten',
    bio: {
      pt: [
        'Erik Torsten é sueco e o Agente 13. Seus braços biônicos disparam ondas de choque que atravessam paredes e atordoam quem estiver do outro lado.',
        'Antes do Protocolo, fez trabalhos fora da lei ao lado da Raze, que reforçou seus braços com placas de titânio e o chama de "Breachy".',
      ],
      en: [
        'Erik Torsten is Swedish and Agent 13. His bionic arms fire shockwaves that pass through walls and stun whoever is on the other side.',
        'Before the Protocol, he did off-the-books jobs with Raze, who upgraded his arms with titanium plating and calls him "Breachy".',
      ],
    },
  },
  skye: {
    number: 14,
    realName: 'Kirra Foster',
    origin: { city: { pt: 'Nimbin', en: 'Nimbin' } },
    bio: {
      pt: [
        'Kirra Foster é uma Radiante australiana que passou anos enfrentando a Kingdom no leste da Austrália, o que lhe rendeu o apelido de "A Grande Recuperadora".',
        'Entrou no Protocolo como Agente 14 depois que a Sage lhe mostrou as fendas que surgiam pelo mundo. Seus poderes vêm da natureza: um tigre-da-tasmânia, um falcão de luz, criaturas rastreadoras e um amuleto de cura.',
        'Fora das missões, é parceira de trilhas da Deadlock.',
      ],
      en: [
        'Kirra Foster is an Australian Radiant who spent years fighting Kingdom across eastern Australia, earning the nickname "The Great Reclaimer".',
        'She joined the Protocol as Agent 14 after Sage showed her the rifts appearing around the world. Her powers come from nature: a Tasmanian tiger, a hawk of light, tracking creatures and a healing trinket.',
        "Off duty, she is Deadlock's hiking buddy.",
      ],
    },
  },
  yoru: {
    number: 15,
    realName: 'Kiritani Ryo',
    origin: { city: { pt: 'Tóquio', en: 'Tokyo' } },
    bio: {
      pt: [
        'Kiritani Ryo é de Tóquio e o Agente 15. Radiante, roubou de um contêiner da Kingdom no porto S22 a máscara de uma armadura samurai que lhe dá visão dimensional.',
        'Usa fendas para se teletransportar, criar cópias de si e até sumir em outra dimensão.',
        'Volta ao S22 sempre que pode, mesmo contra a vontade do Brimstone, e foi lá que salvou o Phoenix numa missão contra agentes Ômega.',
      ],
      en: [
        'Kiritani Ryo is from Tokyo and Agent 15. A Radiant, he stole a samurai armor mask that grants dimensional vision from a Kingdom container at the S22 port.',
        'He uses rifts to teleport, create copies of himself and even vanish into another dimension.',
        "He keeps going back to S22, against Brimstone's wishes, and that is where he saved Phoenix during a mission against Omega agents.",
      ],
    },
  },
  astra: {
    number: 16,
    realName: 'Efia Danso',
    origin: { city: { pt: 'Acra', en: 'Accra' } },
    bio: {
      pt: [
        'Efia Danso, de Acra, em Gana, é a Agente 16. Radiante, controla a energia cósmica usando uma manopla dourada de Guardiã.',
        'Enxerga o campo de batalha como um mapa de estrelas e cria fumaças, poços gravitacionais e barreiras cósmicas.',
        'Estuda os artefatos dos Guardiões ao lado do Harbor e conhece a verdadeira identidade do Cypher. Com a Reyna, mantém distância.',
      ],
      en: [
        'Efia Danso, from Accra, Ghana, is Agent 16. A Radiant, she commands cosmic energy through a golden Guardian gauntlet.',
        'She sees the battlefield as a star map, creating smokes, gravity wells and cosmic barriers.',
        "She studies the Guardian artifacts with Harbor and knows Cypher's true identity. She keeps her distance from Reyna.",
      ],
    },
  },
  kayo: {
    number: 17,
    bio: {
      pt: [
        'O KAY/O é uma máquina de guerra vinda de uma Terra alternativa, num futuro em que humanos lutavam contra Radiantes. Foi construído para neutralizar poderes com radianita polarizada.',
        'Nessa linha do tempo, lutou ao lado do Brimstone e do Sova e derrotou a Reyna de lá, mas chegou tarde para salvar a humanidade.',
        'Voltou no tempo até o presente e entrou no Protocolo como Agente 17. Tem um carinho visível pelo Brimstone e não perdoa versões da Reyna.',
      ],
      en: [
        'KAY/O is a war machine from an alternate Earth, a future where humans fought Radiants. It was built to neutralize powers with polarized radianite.',
        "In that timeline it fought alongside Brimstone and Sova and defeated that world's Reyna, but arrived too late to save humanity.",
        'It traveled back to the present and joined the Protocol as Agent 17. It shows clear affection for Brimstone and has no patience for any version of Reyna.',
      ],
    },
  },
  chamber: {
    number: 18,
    realName: 'Vincent Fabron',
    origin: { city: { pt: 'Saint-Étienne', en: 'Saint-Étienne' } },
    bio: {
      pt: [
        'Vincent Fabron, francês de Saint-Étienne, é o Agente 18. Antes do Protocolo, era atirador de elite de uma empresa militar privada e projetista de armas da divisão de defesa da Kingdom.',
        'Elegante e calculista, desenha o próprio arsenal. Foi recrutado pelo Brimstone e pela Viper, que ficam de olho na lealdade dele.',
        'Indicou a Neon para o projeto Ômega, mas um mal-entendido antigo ainda afasta os dois.',
      ],
      en: [
        "Vincent Fabron, a Frenchman from Saint-Étienne, is Agent 18. Before the Protocol he was a private military marksman and a weapons designer for Kingdom's defense division.",
        'Elegant and calculating, he designs his own arsenal. He was recruited by Brimstone and Viper, who keep an eye on his loyalty.',
        'He recommended Neon for the Omega project, but an old misunderstanding still keeps them apart.',
      ],
    },
  },
  neon: {
    number: 19,
    realName: 'Tala Nicole Dimaapi Valdez',
    origin: { city: { pt: 'Manila', en: 'Manila' } },
    bio: {
      pt: [
        'Tala Nicole Dimaapi Valdez, de Manila, nas Filipinas, é a Agente 19. Radiante, gera bioeletricidade e corre em altíssima velocidade.',
        'Foi recrutada para o projeto Ômega: sua energia ajudaria a alimentar o teletransportador entre a Terra Alfa e a Ômega.',
        'Numa missão em Lisboa, o regulador que segura seus poderes falhou, e a Killjoy e a Reyna ajudaram a resolver. É a menor agente do Protocolo e joga basquete.',
      ],
      en: [
        'Tala Nicole Dimaapi Valdez, from Manila, Philippines, is Agent 19. A Radiant, she generates bioelectricity and runs at incredible speed.',
        'She was recruited for the Omega project: her energy would help power the teleporter between Alpha and Omega Earth.',
        'On a mission in Lisbon, the regulator holding her powers back failed, and Killjoy and Reyna helped fix it. She is the shortest agent in the Protocol and plays basketball.',
      ],
    },
  },
  fade: {
    number: 20,
    realName: 'Hazal Eyletmez',
    origin: { city: { pt: 'Istambul', en: 'Istanbul' } },
    bio: {
      pt: [
        'Hazal Eyletmez, de Istambul, é a Agente 20. Caçadora de recompensas Radiante, transforma medos em armas: enxerga pesadelos e persegue quem está com medo.',
        'Chegou ao Protocolo pelo caminho mais estranho: chantageou a organização ameaçando expô-la, até ser capturada pelo KAY/O. No interrogatório com o Brimstone e o Cypher, descobriu que os agentes eram inocentes do que ela suspeitava, e que existem mundos alternativos.',
        'Procura uma pessoa desaparecida e mantém um abrigo de gatos perto de casa.',
      ],
      en: [
        'Hazal Eyletmez, from Istanbul, is Agent 20. A Radiant bounty hunter, she turns fear into a weapon: she sees nightmares and hunts the frightened.',
        'She reached the Protocol the strangest way: she blackmailed it, threatening exposure, until KAY/O caught her. Under questioning by Brimstone and Cypher, she learned the agents were innocent of what she suspected, and that alternate worlds exist.',
        'She is searching for a missing person and funds a cat shelter near her home.',
      ],
    },
  },
  harbor: {
    number: 21,
    realName: 'Varun Batra',
    bio: {
      pt: [
        'Varun Batra é indiano e o Agente 21. Antes do Protocolo, recuperava artefatos do mercado ilegal para uma força-tarefa, até encontrar um bracelete dos Guardiões que lhe deu controle sobre a água.',
        'Acusado injustamente e perseguido, passou meses fugindo pelo sul da Ásia até ser resgatado pelo Protocolo, numa operação que o Brimstone comandou pessoalmente.',
        'Hoje estuda os artefatos ao lado da Astra e ajuda a treinar o Gekko.',
      ],
      en: [
        'Varun Batra is Indian and Agent 21. Before the Protocol he recovered black-market artifacts for a task force, until he found a Guardian bracelet that gave him control over water.',
        'Framed and hunted, he spent months on the run across southern Asia until the Protocol rescued him, in an operation Brimstone led personally.',
        'Today he studies the artifacts with Astra and helps train Gekko.',
      ],
    },
  },
  gekko: {
    number: 22,
    realName: 'Mateo Armendáriz De la Fuente',
    origin: { city: { pt: 'Los Angeles', en: 'Los Angeles' } },
    bio: {
      pt: [
        'Mateo Armendáriz De la Fuente é de Los Angeles e o Agente 22. Lidera uma turma de criaturas que tirou de uma instalação de segurança da Kingdom: Dizzy, Mosh, Wingman e Thrash.',
        'As criaturas alternam entre a forma de bolha e a de bicho e lutam ao lado dele, cegando, explodindo e prendendo inimigos.',
        'A Deadlock desconfia delas, mas foi quem construiu suas gaiolas. Ele é próximo da Reyna, desenha grafite e joga basquete.',
      ],
      en: [
        'Mateo Armendáriz De la Fuente is from Los Angeles and Agent 22. He leads a crew of creatures he took from a Kingdom security facility: Dizzy, Mosh, Wingman and Thrash.',
        'The creatures switch between blob and critter form and fight beside him, blinding, blasting and trapping enemies.',
        'Deadlock distrusts them, yet she built their cages. He is close to Reyna, sketches graffiti and plays basketball.',
      ],
    },
  },
  deadlock: {
    number: 23,
    realName: 'Iselin Solem',
    bio: {
      pt: [
        'Iselin Solem é norueguesa e a Agente 23. Era operadora de elite das forças de segurança Ståljeger até um vazamento de criaturas radianitas numa instalação em Svalbard matar sua equipe e custar seu braço esquerdo.',
        'O Sova a resgatou, e o Protocolo lhe deu um braço protético com nanofio, a base das suas habilidades de contenção. Ela recusou a oferta da Sage de restaurar o braço, para não esquecer os companheiros.',
        'Desconfia das criaturas do Gekko e é parceira de trilhas da Skye.',
      ],
      en: [
        'Iselin Solem is Norwegian and Agent 23. She was an elite operative of the Ståljeger security force until a radivore breach at a Svalbard facility killed her team and cost her left arm.',
        "Sova rescued her, and the Protocol gave her a prosthetic arm with nanowire, the core of her containment abilities. She turned down Sage's offer to restore the arm, so she would never forget her comrades.",
        "She distrusts Gekko's creatures and is Skye's hiking buddy.",
      ],
    },
  },
  iso: {
    number: 24,
    realName: 'Li Zhao Yu',
    origin: { city: { pt: 'Chongqing', en: 'Chongqing' } },
    bio: {
      pt: [
        'Li Zhao Yu, de Chongqing, na China, é o Agente 24. Era assassino dos Scions of Hourglass, conhecido como "Lilás Morto".',
        'Transforma a energia da radianita em escudos e paredes sólidas. Entrou no Protocolo fingindo desertar, com o plano de chegar ao Omen, seu alvo, mas acabou ficando de verdade ao ver como os agentes trabalham juntos.',
        'Hoje responde ao Brimstone e ajuda a investigar a organização de onde veio. Fotografia e chá de boba são seus passatempos.',
      ],
      en: [
        'Li Zhao Yu, from Chongqing, China, is Agent 24. He was an assassin for the Scions of Hourglass, known as "Dead Lilac".',
        'He turns radianite energy into solid shields and walls. He joined the Protocol by pretending to defect, planning to reach Omen, his target, but stayed for real after seeing how the agents work together.',
        'He now reports to Brimstone and helps investigate the organization he came from. Photography and boba tea are his hobbies.',
      ],
    },
  },
  clove: {
    number: 25,
    realName: 'Ollie Baird',
    origin: { city: { pt: 'Edimburgo', en: 'Edinburgh' } },
    bio: {
      pt: [
        'Ollie Baird, de Edimburgo, na Escócia, ocupa o posto de Agente 25 e usa pronomes neutros. Radiante com poder sobre a essência da vida e sobre a imortalidade: volta depois de morrer e consegue lançar fumaças mesmo fora de combate.',
        'Cresceu entre livros, com uma mãe bibliotecária, e conheceu o Omen numa biblioteca de Edimburgo, onde os dois lutaram lado a lado. O recrutamento veio pela Deadlock.',
        'Investiga os Scions of Hourglass com o Cypher e o Harbor e, nas horas vagas, vai a shows com a Killjoy.',
      ],
      en: [
        'Ollie Baird, from Edinburgh, Scotland, is Agent 25 and uses they/them pronouns. A Radiant with power over life essence and immortality, they come back after dying and can cast smokes even while out of the fight.',
        'They grew up surrounded by books, with a librarian mother, and met Omen in an Edinburgh library, where the two fought side by side. Deadlock recruited them.',
        'They investigate the Scions of Hourglass with Cypher and Harbor and, in their free time, go to concerts with Killjoy.',
      ],
    },
  },
  vyse: {
    number: 26,
    bio: {
      pt: [
        'O nome verdadeiro da Vyse é desconhecido. Antes do Protocolo, liderava uma equipe da Kingdom que estudava o Interverso, até ser capturada pelos Scions of Hourglass numa instalação em Jan Mayen.',
        'Radiante, manipula uma liga de carbono e radianita para criar espinhos, armadilhas e muros de metal. Fugiu quando o Protocolo atacou o local, se vingou destruindo dois esconderijos da Hourglass e, depois de um confronto em Seul, entrou como Agente 26.',
        'Hoje lidera a pesquisa do Protocolo sobre o Interverso e guarda um caderno com redesenhos de todos os agentes.',
      ],
      en: [
        "Vyse's real name is unknown. Before the Protocol she led a Kingdom team studying the Interverse, until the Scions of Hourglass captured her at a facility on Jan Mayen.",
        'A Radiant, she shapes a carbon-radianite alloy into thorns, traps and metal walls. She escaped when the Protocol raided the site, took revenge by destroying two Hourglass hideouts and, after a clash in Seoul, joined as Agent 26.',
        "She now leads the Protocol's Interverse research and keeps a sketchbook with redesigns of every agent.",
      ],
    },
  },
  tejo: {
    number: 27,
    bio: {
      pt: [
        'Colombiano, Tejo é um consultor de inteligência veterano e o Agente 27. Estava aposentado quando voltou ao Protocolo, depois de muito tempo afastado.',
        'Usa um sistema de orientação balística para lançar drones e mísseis com precisão. Trouxe consigo antigos parceiros de equipe, a Waylay e o Veto.',
        'Com o Brimstone, a volta não foi tranquila: os dois têm um incidente antigo mal resolvido, e Tejo não pede desculpas.',
      ],
      en: [
        'Colombian veteran intelligence consultant Tejo is Agent 27. He was retired when he returned to the Protocol after a long leave.',
        'He uses a ballistic guidance system to launch drones and missiles with precision. He brought along former squadmates Waylay and Veto.',
        "With Brimstone, the return was rocky: they have an unresolved old incident, and Tejo won't apologize.",
      ],
    },
  },
  waylay: {
    number: 28,
    realName: 'Ariya Saengkaew',
    bio: {
      pt: [
        'Ariya Saengkaew é tailandesa e a Agente 28. Radiante prismática, transforma o próprio corpo em luz para avançar e recuar num piscar de olhos.',
        'Trabalhava numa equipe de ataque com o Tejo e o Veto e entrou no Protocolo a pedido do Tejo, chegando pelo porto de Bangkok. Ajuda a treinar outros agentes e acompanha ataques a instalações da Kingdom pelo mundo.',
        'Cozinha muito bem, e o arroz-doce de manga tailandês é a especialidade.',
      ],
      en: [
        'Ariya Saengkaew is Thai and Agent 28. A prismatic Radiant, she turns her body into light to strike and retreat in the blink of an eye.',
        "She worked on a strike team with Tejo and Veto and joined the Protocol at Tejo's request, arriving through the port of Bangkok. She helps train other agents and tracks attacks on Kingdom sites worldwide.",
        'She is a great cook, and Thai mango sticky rice is her specialty.',
      ],
    },
  },
  veto: {
    number: 29,
    bio: {
      pt: [
        'Senegalês, Veto é o Agente 29. Ferido por uma granada numa missão, passou por uma mutação genética com material de criatura radianita, que lhe deu um braço e um olho novos.',
        'Hoje anula poderes e tecnologias dos inimigos em campo. Já fazia parte da equipe do Tejo e da Waylay, e trabalhou como guarda-costas numa exposição antes de entrar no Protocolo.',
      ],
      en: [
        'Senegalese operative Veto is Agent 29. Wounded by a grenade on a mission, he underwent a genetic mutation with radivore material that gave him a new arm and eye.',
        "He now nullifies enemy powers and technology in the field. He was already part of Tejo and Waylay's squad, and worked as a bodyguard at an expo before joining the Protocol.",
      ],
    },
  },
  miks: {
    number: 30,
    realName: 'Adrijan Vidović',
    bio: {
      pt: [
        'Adrijan Vidović é croata e cofundador do Sonic Collective, um coletivo da cena eletrônica underground do país. Radiante, esculpe ondas sonoras: cura aliados, atordoa inimigos e cria fumaças com som.',
        'Foi recrutado como Agente 30 depois que alguns agentes assistiram a um show dele, e logo fez amizade com a Clove e a Killjoy.',
        'No estúdio, chegou a gravar os sons das peças do KAY/O. Já a Vyse reclama do barulho.',
      ],
      en: [
        'Adrijan Vidović is Croatian and co-founder of the Sonic Collective, an underground electronic music collective in his country. A Radiant, he sculpts sound waves: he heals allies, concusses enemies and creates smokes with sound.',
        'He was recruited as Agent 30 after some agents went to one of his shows, and soon became friends with Clove and Killjoy.',
        "In his studio he even recorded the sounds of KAY/O's parts. Vyse, for her part, complains about the noise.",
      ],
    },
  },
};
