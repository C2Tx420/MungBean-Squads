import {
  BORING_AVATAR_COLOR_PALETTE,
  BORING_AVATAR_ENDPOINT,
} from "../config/constant";
import { AvatarColors, AvatarVariant } from "../types/avatar.model";

export function truncateWallet(
  str: string | undefined | null,
  length = 4
): string {
  if (!str) return "...";

  const first = str.slice(0, length);
  const last = str.slice(-length);

  return `${first}....${last}`;
}

export function createAvatarURL(
  wallet: string | undefined | null,
  size: number = 120,
  variant: AvatarVariant = "marble",
  colors: AvatarColors = BORING_AVATAR_COLOR_PALETTE
) {
  if (!wallet)
    return new URL(
      `${variant}/${size}/default?colors=${colors.join(",")}`,
      BORING_AVATAR_ENDPOINT
    );

  return new URL(
    `${variant}/${size}/${wallet}?colors=${colors.join(",")}`,
    BORING_AVATAR_ENDPOINT
  );
}

export function toTitle(value: string) {
  const firstLetter = value.slice(0, 1).toUpperCase();
  return firstLetter + value.slice(1);
}

export async function historyTransactionConvert(data: any, pubKey: string) {
  const result: any = [];

  const groupedTransaction: any = {};

  await data.map((item: any) => {
    const dateTime = new Date(item.timestamp).toISOString().split("T");

    const action = item.actions.slice(-1)[0];

    const timeSplit = dateTime[1].split(":");

    const time = `${
      Number(timeSplit[0]) >= 12
        ? `0${Number(timeSplit[0]) - 12}`
        : timeSplit[0]
    }:${timeSplit[1]} ${Number(timeSplit[0]) >= 12 ? "PM" : "AM"}`;

    const type = typeTransactionCheck(action, pubKey);

    const value = action.info?.amount;

    if (item.status === "Success") {
      const transaction = {
        time,
        type,
        value,
      };

      if (!groupedTransaction[dateTime[0]]) {
        groupedTransaction[dateTime[0]] = {
          time: groupedTransaction,
          transaction: [transaction],
        };
      } else {
        groupedTransaction[dateTime[0]].transaction.push(transaction);
      }
    }
  });

  await Object.entries(groupedTransaction).map((item: any) => {
    const transactionList = item[1]?.transaction;
    result.push({
      date: item[0],
      transactionList,
    });
  });

  return result;
}

export function convertTime(time: any) {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const amOrPm = hours >= 12 ? "PM" : "AM";

  const hours12 = hours % 12 || 12;

  return `${hours12}:${minutes} ${amOrPm}`;
}

export function typeTransactionCheck(action: any, pubKey: string) {
  if (action.info.receiver === pubKey) {
    return "Deposit";
  } else {
    return "Withdraw";
  }
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const scroolUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const genVaultIndex = (arr: any) => {
  return arr[arr.length - 1].vaultIndex + 1;
}