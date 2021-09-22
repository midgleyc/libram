import { buy, getWorkshed, retrieveItem, toInt, use } from "kolmafia";
import { have } from "../../lib";
import logger from "../../logger";
import { get, withChoice } from "../../property";
import { $item } from "../../template-string";
export const Mayo = {
  nex: $item`Mayonex`,
  diol: $item`Mayodiol`,
  zapine: $item`Mayozapine`,
  flex: $item`Mayoflex`,
};

/**
 * Sets mayo minder to a particular mayo, and ensures you have enough of it.
 * @param mayo Mayo to use
 * @param quantity Quantity to ensure
 */

export function setMayoMinder(mayo: Item, quantity = 1): boolean {
  if (getWorkshed() !== $item`portable Mayo Clinic`) return false;
  if (!Object.values(Mayo).includes(mayo)) {
    logger.error("Invalid mayo selected");
    return false;
  }
  if (get("mayoInMouth") && get("mayoInMouth") !== mayo.name) {
    logger.error("Currently have incorrect mayo in mouth");
    return false;
  }
  retrieveItem(quantity, mayo);
  if (!have($item`Mayo Minder™`)) buy($item`Mayo Minder™`);
  if (get("mayoMinderSetting") !== mayo.name) {
    withChoice(1076, toInt(mayo) - 8260, () => use($item`Mayo Minder™`));
  }
  return get("mayoMinderSetting") === mayo.name;
}