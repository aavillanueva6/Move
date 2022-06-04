function createAnonUser() {
  const adjArr = [
    'Adorable',
    'Adventurous',
    'Amused',
    'Annoyed',
    'Bored',
    'Brainy',
    'Brave',
    'Careful',
    'Crazy',
    'Curious',
    'Defiant',
    'Dizzy',
    'Dull',
    'Elated',
    'Excited',
    'Fancy',
    'Fierce',
    'Frail',
    'Gentle',
    'Good',
    'Grumpy',
    'Happy',
    'Itchy',
    'Kind',
  ];
  const animalArr = [
    'Aardvark',
    'Albatross',
    'Alligator',
    'Alpaca',
    'Ant',
    'Antelope',
    'Baboon',
    'Badger',
    'Bear',
    'Buffalo',
    'Caribou',
    'Cheetah',
    'Coyote',
    'Dolphin',
    'Eagle',
    'Goat',
    'Gorilla',
    'Heron',
    'Horse',
    'Impala',
    'Jellyfish',
    'Koala',
    'Lion',
    'Lizard',
    'Lynx',
    'Marmot',
    'Meerkat',
    'Ocelot',
    'Owl',
  ];

  const selectedAdj = adjArr[Math.floor(Math.random() * adjArr.length)];

  const selectedAnimal =
    animalArr[Math.floor(Math.random() * animalArr.length)];

  const anonUser = `${selectedAdj} ${selectedAnimal}`;
  return anonUser;
}
module.exports = createAnonUser;
