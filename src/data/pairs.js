// Home duos. Relationships follow the official VALORANT wiki (wiki.playvalorant.com).
// Notes are fan-written summaries, not in-game voice lines.
// To use your own art: drop a transparent PNG/WebP in src/art/duos/, set `image` to the file name
// and `credit` to { text, url } (url may be null). Without `image`, the hero shows both API portraits.
export const pairs = [
  {
    agents: ['raze', 'killjoy'],
    relation: { pt: 'Namoradas', en: 'Girlfriends' },
    notes: {
      raze: { pt: 'Explosivos, tinta e uma rival que virou namorada. Juntas, criaram o Max Bot de treino.', en: 'Explosives, paint and a rival who became her girlfriend. Together they built the Max Bot trainer.' },
      killjoy: { pt: 'O primeiro casal confirmado pela Riot. A gênia alemã das torretas e a engenheira da Bahia.', en: 'The first couple Riot confirmed. The German turret genius and the engineer from Bahia.' },
    },
    image: null, credit: null,
  },
  {
    agents: ['omen', 'cypher'],
    relation: { pt: 'Informação tem preço', en: 'Information has a price' },
    notes: {
      omen: { pt: 'Procurou o Cypher atrás de respostas difíceis de achar sobre o próprio passado.', en: 'Sought out Cypher for hard-to-find answers about his own past.' },
      cypher: { pt: 'Conseguiu as informações. O pagamento do Omen, até hoje, não chegou.', en: 'He got the information. Omen\'s payment still hasn\'t arrived.' },
    },
    image: null, credit: null,
  },
  {
    agents: ['brimstone', 'viper'],
    relation: { pt: 'Fundadores do Protocolo', en: 'Protocol founders' },
    notes: {
      brimstone: { pt: 'Agente 01. Montou o Protocolo VALORANT e comanda as operações.', en: 'Agent 01. Built the VALORANT Protocol and commands its operations.' },
      viper: { pt: 'Agente 02. Cofundadora e braço direito do Brimstone nas decisões e nos recrutamentos.', en: 'Agent 02. Co-founder and Brimstone\'s second-in-command on strategy and recruiting.' },
    },
    image: null, credit: null,
  },
  {
    agents: ['sage', 'omen'],
    relation: { pt: 'Memórias perdidas', en: 'Lost memories' },
    notes: {
      sage: { pt: 'Faz sessões com o Omen para ajudar a devolver as memórias dele.', en: 'Holds sessions with Omen to help bring his memories back.' },
      omen: { pt: 'Entre tantos segredos, a Sage é uma das poucas ligações sólidas que ele tem.', en: 'Among so many secrets, Sage is one of the few solid bonds he has.' },
    },
    image: null, credit: null,
  },
  {
    agents: ['viper', 'reyna'],
    relation: { pt: 'Salvar a Lucia', en: 'Saving Lucia' },
    notes: {
      viper: { pt: 'Trabalha ao lado da Reyna numa tentativa de salvar a vida da irmã dela.', en: 'Works alongside Reyna in an attempt to save her sister\'s life.' },
      reyna: { pt: 'Por Lucia, a irmã, aceita a ajuda de quem for preciso, até da Viper.', en: 'For her sister Lucia, she will take help from anyone, even Viper.' },
    },
    image: null, credit: null,
  },
  {
    agents: ['breach', 'raze'],
    relation: { pt: 'Parceiros de crime', en: 'Partners in crime' },
    notes: {
      breach: { pt: 'Conhecia a Raze de trabalhos fora da lei, bem antes do Protocolo.', en: 'Knew Raze from off-the-books jobs long before the Protocol.' },
      raze: { pt: 'Reforçou os braços mecânicos do "Breachy" com placas de titânio.', en: 'Upgraded "Breachy"\'s mechanical arms with titanium plating.' },
    },
    image: null, credit: null,
  },
];
