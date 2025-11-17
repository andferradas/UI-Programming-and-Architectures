export const dataUsers = [
    {id: 1, name: "Andrea", email: "andrea@gmail.com", password: "1234", avatar: "/assets/collections/dinosaur/avatars/avatar_triceratops.png", cardsOwned: [1,3,5,12,14,16], friends: [2,7]},
    {id: 2, name: "Jorge", email: "jorge@gmail.com", password: "1234", avatar: "/assets/collections/space/avatars/avatar_Aa_astronaut.png", cardsOwned: [2,4,6,8,10,13,15,17,19], friends: [1,8]},
    {id: 3, name: "Marie", email: "marie@gmail.com", password: "1234", avatar: "/assets/collections/dinosaur/avatars/avatar_brontosaurio.png", cardsOwned: [7,9,11,18,20], friends: [4]},
    {id: 4, name: "Josh", email: "josh@gmail.com", password: "1234", avatar: "/assets/collections/space/avatars/avatar_Rr_rocket.png", cardsOwned: [5,10,15,19,22,27], friends: [3,6]},
    {id: 5, name: "Sofia", email: "sofia@gmail.com", password: "1234", avatar: "/assets/collections/dinosaur/avatars/avatar_estegorausus.png", cardsOwned: [1,2,6,9,10,15,20,23,28,29,30], friends: [8]},   
    {id: 6, name: "Arnold", email: "arnold@gmail.com", password: "1234", avatar: "/assets/collections/dinosaur/avatars/avatar_tyrannosaurus-rex.png", cardsOwned: [3,8,9,11,13,16,17,21,23,25,29,30], friends: [4]},
    {id: 7, name: "Emilie", email: "emilie@gmail.com", password: "1234", avatar: "/assets/collections/space/avatars/avatar_Ee_earth.png", cardsOwned: [1,4,5,7,11,12,14,18,21,26,29], friends: [1]},
    {id: 8, name: "Ben", email: "ben@gmail.com", password: "1234", avatar: "/assets/collections/space/avatars/avatar_Gg_galaxy.png", cardsOwned: [1,4,7,10,11,13,15,18,20,24,28], friends: [2,5]},
];

export const dataAvatars = [
    "/assets/collections/dinosaur/avatars/avatar_brontosaurio.png",
    "/assets/collections/dinosaur/avatars/avatar_estegorausus.png",
    "/assets/collections/dinosaur/avatars/avatar_triceratops.png",
    "/assets/collections/dinosaur/avatars/avatar_tyrannosaurus-rex.png",
    "/assets/collections/space/avatars/avatar_Aa_astronaut.png",
    "/assets/collections/space/avatars/avatar_Ee_earth.png",
    "/assets/collections/space/avatars/avatar_Gg_galaxy.png",
    "/assets/collections/space/avatars/avatar_Rr_rocket.png"
];

export const dataPackages = [
    {id: 1, nameCollection: "Dinosaur Adventure Cards", image: "/assets/collections/dinosaur/package.png", cards:[1,2,3,4,5,6,7,8,9,10,11]},
    {id: 2, nameCollection: "Space Adventure Cards", image: "/assets/collections/space/package.png", cards:[12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]}
];

export const dataCards = [
    // Dinosaur Adventure Cards
    {id: 1, nameCard: "ankylosaurus", image: "/assets/collections/dinosaur/cards/ankylosaurus.jpg", rarity: "green", collectionId: 1},
    {id: 2, nameCard: "brachiosaurus", image: "/assets/collections/dinosaur/cards/brachiosaurus.jpg", rarity: "red", collectionId: 1},
    {id: 3, nameCard: "brontosaurio", image: "/assets/collections/dinosaur/cards/brontosaurio.jpg", rarity: "red", collectionId: 1},
    {id: 4, nameCard: "dilophosaurus", image: "/assets/collections/dinosaur/cards/dilophosaurus.jpg", rarity: "blue", collectionId: 1},
    {id: 5, nameCard: "dimetrodon", image: "/assets/collections/dinosaur/cards/dimetrodon.jpg", rarity: "red", collectionId: 1},
    {id: 6, nameCard: "estegorausus", image: "/assets/collections/dinosaur/cards/estegorausus.jpg", rarity: "blue", collectionId: 1},
    {id: 7, nameCard: "parasaurolophus", image: "/assets/collections/dinosaur/cards/parasaurolophus.jpg", rarity: "pink", collectionId: 1},
    {id: 8, nameCard: "pteranodon", image: "/assets/collections/dinosaur/cards/pteranodon.jpg", rarity: "blue", collectionId: 1},
    {id: 9, nameCard: "spinosaurus", image: "/assets/collections/dinosaur/cards/spinosaurus.jpg", rarity: "green", collectionId: 1},
    {id: 10, nameCard: "triceratops", image: "/assets/collections/dinosaur/cards/triceratops.jpg", rarity: "red", collectionId: 1},
    {id: 11, nameCard: "tyrannosaurus-rex", image: "/assets/collections/dinosaur/cards/tyrannosaurus-rex.jpg", rarity: "green", collectionId: 1},
    // Space Adventure Cards
    {id: 12, nameCard: "Aa_astronaut", image: "/assets/collections/space/cards/Aa_astronaut.jpg", rarity: "", collectionId: 2},
    {id: 13, nameCard: "Bb_big_dipper", image: "/assets/collections/space/cards/Bb_big_dipper.jpg", rarity: "", collectionId: 2},
    {id: 14, nameCard: "Ee_earth", image: "/assets/collections/space/cards/Ee_earth.jpg", rarity: "", collectionId: 2},
    {id: 15, nameCard: "Ff_falling_stars", image: "/assets/collections/space/cards/Ff_falling_stars.jpg", rarity: "", collectionId: 2},
    {id: 16, nameCard: "Gg_galaxy", image: "/assets/collections/space/cards/Gg_galaxy.jpg", rarity: "", collectionId: 2},
    {id: 17, nameCard: "Hh_hubble", image: "/assets/collections/space/cards/Hh_hubble.jpg", rarity: "", collectionId: 2},
    {id: 18, nameCard: "Jj_jupiter", image: "/assets/collections/space/cards/Jj_jupiter.jpg", rarity: "", collectionId: 2},
    {id: 19, nameCard: "Ll_little_dipper", image: "/assets/collections/space/cards/Ll_little_dipper.jpg", rarity: "", collectionId: 2},
    {id: 20, nameCard: "Mm_mars", image: "/assets/collections/space/cards/Mm_mars.jpg", rarity: "", collectionId: 2},
    {id: 21, nameCard: "Nn_neptune", image: "/assets/collections/space/cards/Nn_neptune.jpg", rarity: "", collectionId: 2},
    {id: 22, nameCard: "Oo_orion", image: "/assets/collections/space/cards/Oo_orion.jpg", rarity: "", collectionId: 2},
    {id: 23, nameCard: "Pp_pluto", image: "/assets/collections/space/cards/Pp_pluto.jpg", rarity: "", collectionId: 2},
    {id: 24, nameCard: "Qq_quasar", image: "/assets/collections/space/cards/Qq_quasar.jpg", rarity: "", collectionId: 2},
    {id: 25, nameCard: "Rr_rocket", image: "/assets/collections/space/cards/Rr_rocket.jpg", rarity: "", collectionId: 2},
    {id: 26, nameCard: "Ss_saturn", image: "/assets/collections/space/cards/Ss_saturn.jpg", rarity: "", collectionId: 2},
    {id: 27, nameCard: "Uu_uranus", image: "/assets/collections/space/cards/Uu_uranus.jpg", rarity: "", collectionId: 2},
    {id: 28, nameCard: "Vv_venus", image: "/assets/collections/space/cards/Vv_venus.jpg", rarity: "", collectionId: 2},
    {id: 29, nameCard: "Xx_x-ray", image: "/assets/collections/space/cards/Xx_x-ray.jpg", rarity: "", collectionId: 2},
    {id: 30, nameCard: "Yy_year365", image: "/assets/collections/space/cards/Yy_year365.jpg", rarity: "", collectionId: 2},
]