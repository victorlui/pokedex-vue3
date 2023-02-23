import { Colors } from "./colorsTypes";

export default class Helpers {
  static capitalizes(str: string) {
    return str[0].toUpperCase() + str.substr(1);
  }

  static colorTypes(type: string) {
    switch (type) {
      case "grass":
        return Colors.grass;
      case "fire":
        return Colors.fire;
      case "poison":
        return Colors.poison;
      case "normal":
        return Colors.normal;
      case "water":
        return Colors.water;
      case "electric":
        return Colors.electric;
      case "ice":
        return Colors.ice;
      case "fighting":
        return Colors.fighting;
      case "ground":
        return Colors.ground;
      case "flying":
        return Colors.flying;
      case "psychic":
        return Colors.phychic;
      case "bug":
        return Colors.bug;
      case "rock":
        return Colors.rock;
      case "ghost":
        return Colors.ghost;
      case "dragon":
        return Colors.dragon;
      case "dark":
        return Colors.dark;
      case "Stell":
        return Colors.steel;
      case "fairy":
        return Colors.fairy;
      default:
        return ''
    }
  }
  }
