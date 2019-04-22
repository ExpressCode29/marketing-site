const root = document.getElementById('root')
const config = [
  IntroPreface0,
  IntroPreface1,
  IntroPreface2,
  IntroPreface3,
  IntroPreface4,
  Intro,
  Bait,
  Bait1,
  Bait2,
  ItsBig,
  ItsBig2,
  Happening,
  Happening2,
  Win,
  Win2,
  YouIn,
  Cool,
  Cool2,
  Gimme
]

const mngr = new StageManager(root, config)

mngr.begin()