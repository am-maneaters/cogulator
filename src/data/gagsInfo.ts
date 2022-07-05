import { GagInfo } from '../types';
import { imgFromPath } from '../utils/imageUtils';

const imgs = import.meta.globEager('../../assets/gags/*.webp');

const gagsOriginal: GagInfo[] = [
  {
    name: 'Feather',
    image: 'Feather.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 1,
    accuracy: 70,
    affectsType: 'Toon',
    affectsNum: 'Single',
    minDmg: 8,
    maxDmg: 10,
  },
  {
    name: 'Megaphone',
    image: 'Megaphone.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 2,
    accuracy: 70,
    affectsType: 'Toon',
    affectsNum: 'All',
    minDmg: 15,
    maxDmg: 18,
  },
  {
    name: 'Lipstick',
    image: 'Lipstick.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 3,
    accuracy: 70,
    affectsType: 'Toon',
    affectsNum: 'Single',
    minDmg: 25,
    maxDmg: 30,
  },
  {
    name: 'Bamboo Cane',
    image: 'Bamboo_Cane.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 4,
    accuracy: 70,
    affectsType: 'Toon',
    affectsNum: 'All',
    minDmg: 40,
    maxDmg: 45,
  },
  {
    name: 'Pixie Dust',
    image: 'Pixie_Dust.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 5,
    accuracy: 70,
    affectsType: 'Toon',
    affectsNum: 'Single',
    minDmg: 50,
    maxDmg: 60,
  },
  {
    name: 'Juggling Balls',
    image: 'Juggling_Balls.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 6,
    accuracy: 70,
    affectsType: 'Toon',
    affectsNum: 'All',
    minDmg: 75,
    maxDmg: 105,
  },
  {
    name: 'High Dive',
    image: 'High_Dive.webp',
    track: 'Toonup',
    dmgType: 'Heal',
    level: 7,
    accuracy: 95,
    affectsType: 'Toon',
    affectsNum: 'All',
    minDmg: 210,
    maxDmg: 210,
  },
  {
    name: 'Banana Peel',
    image: 'Banana_Peel.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 1,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 10,
    maxDmg: 12,
  },
  {
    name: 'Rake',
    image: 'Rake.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 2,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 18,
    maxDmg: 20,
  },
  {
    name: 'Marbles',
    image: 'Marbles.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 3,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 30,
    maxDmg: 35,
  },
  {
    name: 'Quicksand',
    image: 'Quicksand.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 4,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 45,
    maxDmg: 50,
  },
  {
    name: 'Trapdoor',
    image: 'Trapdoor.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 5,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 75,
    maxDmg: 85,
  },
  {
    name: 'TNT',
    image: 'TNT.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 6,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 90,
    maxDmg: 180,
  },
  {
    name: 'Railroad',
    image: 'Railroad.webp',
    track: 'Trap',
    dmgType: 'Damage',
    level: 7,
    accuracy: 100,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 200,
    maxDmg: 200,
  },
  {
    name: '$1 Bill',
    image: '$1_Bill.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 1,
    accuracy: 60,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 2,
    maxDmg: 2,
  },
  {
    name: 'Small Magnet',
    image: 'Small_Magnet.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 2,
    accuracy: 60,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 2,
    maxDmg: 2,
  },
  {
    name: '$5 Bill',
    image: '$5_Bill.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 3,
    accuracy: 70,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 3,
    maxDmg: 3,
  },
  {
    name: 'Big Magnet',
    image: 'Big_Magnet.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 4,
    accuracy: 70,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 3,
    maxDmg: 3,
  },
  {
    name: '$10 Bill',
    image: '$10_Bill.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 5,
    accuracy: 80,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 4,
    maxDmg: 4,
  },
  {
    name: 'Hypno Goggles',
    image: 'Hypno_Goggles.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 6,
    accuracy: 80,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 4,
    maxDmg: 4,
  },
  {
    name: 'Presentation',
    image: 'Presentation.webp',
    track: 'Lure',
    dmgType: 'Lure',
    level: 7,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 8,
    maxDmg: 8,
  },
  {
    name: 'Bike Horn',
    image: 'Bike_Horn.webp',
    track: 'Sound',
    level: 1,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 3,
    maxDmg: 4,
    dmgType: 'Damage',
  },
  {
    name: 'Whistle',
    image: 'Whistle.webp',
    track: 'Sound',
    level: 2,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 5,
    maxDmg: 7,
    dmgType: 'Damage',
  },
  {
    name: 'Bugle',
    image: 'Bugle.webp',
    track: 'Sound',
    level: 3,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 9,
    maxDmg: 11,
    dmgType: 'Damage',
  },
  {
    name: 'Aoogah',
    image: 'Aoogah.webp',
    track: 'Sound',
    level: 4,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 14,
    maxDmg: 16,
    dmgType: 'Damage',
  },
  {
    name: 'Elephant Trunk',
    image: 'Elephant_Trunk.webp',
    track: 'Sound',
    level: 5,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 19,
    maxDmg: 21,
    dmgType: 'Damage',
  },
  {
    name: 'Foghorn',
    image: 'Foghorn.webp',
    track: 'Sound',
    level: 6,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 25,
    maxDmg: 50,
    dmgType: 'Damage',
  },
  {
    name: 'Opera Singer',
    image: 'Opera_Singer.webp',
    track: 'Sound',
    level: 7,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 90,
    maxDmg: 90,
    dmgType: 'Damage',
  },
  {
    name: 'Cupcake',
    image: 'Cupcake.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 1,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 4,
    maxDmg: 6,
  },
  {
    name: 'Fruit Pie Slice',
    image: 'Fruit_Pie_Slice.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 2,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 8,
    maxDmg: 10,
  },
  {
    name: 'Cream Pie Slice',
    image: 'Cream_Pie_Slice.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 3,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 14,
    maxDmg: 17,
  },
  {
    name: 'Whole Fruit Pie',
    image: 'Whole_Fruit_Pie.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 4,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 24,
    maxDmg: 27,
  },
  {
    name: 'Whole Cream Pie',
    image: 'Whole_Cream_Pie.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 5,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 36,
    maxDmg: 40,
  },
  {
    name: 'Birthday Cake',
    image: 'Birthday_Cake.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 6,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 48,
    maxDmg: 100,
  },
  {
    name: 'Wedding Cake',
    image: 'Wedding_Cake.webp',
    track: 'Throw',
    dmgType: 'Damage',
    level: 7,
    accuracy: 75,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 120,
    maxDmg: 120,
  },
  {
    name: 'Squirting Flower',
    image: 'Squirting_Flower.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 1,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 3,
    maxDmg: 4,
  },
  {
    name: 'Glass of Water',
    image: 'Glass_of_Water.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 2,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 6,
    maxDmg: 8,
  },
  {
    name: 'Squirt Gun',
    image: 'Squirt_Gun.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 3,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 10,
    maxDmg: 12,
  },
  {
    name: 'Seltzer Bottle',
    image: 'Seltzer_Bottle.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 4,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 18,
    maxDmg: 21,
  },
  {
    name: 'Fire Hose',
    image: 'Fire_Hose.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 5,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 27,
    maxDmg: 30,
  },
  {
    name: 'Storm Cloud',
    image: 'Storm_Cloud.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 6,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 36,
    maxDmg: 80,
  },
  {
    name: 'Geyser',
    image: 'Geyser.webp',
    track: 'Squirt',
    dmgType: 'Damage',
    level: 7,
    accuracy: 95,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 105,
    maxDmg: 105,
  },
  {
    name: 'Flower Pot',
    image: 'Flower_Pot.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 1,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 10,
    maxDmg: 10,
  },
  {
    name: 'Sandbag',
    image: 'Sandbag.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 2,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 18,
    maxDmg: 18,
  },
  {
    name: 'Anvil',
    image: 'Anvil.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 3,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 30,
    maxDmg: 30,
  },
  {
    name: 'Big Weight',
    image: 'Big_Weight.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 4,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 45,
    maxDmg: 45,
  },
  {
    name: 'Safe',
    image: 'Safe.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 5,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 60,
    maxDmg: 70,
  },
  {
    name: 'Grand Piano',
    image: 'Grand_Piano.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 6,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'Single',
    minDmg: 85,
    maxDmg: 170,
  },
  {
    name: 'Toontanic',
    image: 'Toontanic.webp',
    track: 'Drop',
    dmgType: 'Damage',
    level: 7,
    accuracy: 50,
    affectsType: 'Cog',
    affectsNum: 'All',
    minDmg: 180,
    maxDmg: 180,
  },
];

const gags = gagsOriginal.map((gag) => ({
  ...gag,
  image: imgFromPath(imgs[`../../assets/gags/${gag.image}`].default),
}));

export default gags;
