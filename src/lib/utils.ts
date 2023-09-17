import { BORING_AVATAR_COLOR_PALETTE, BORING_AVATAR_ENDPOINT } from "../config/constant"
import { AvatarColors, AvatarVariant } from "../types/avatar.model"

export function truncateWallet(str: string | undefined | null, length = 4): string {
  if (!str) return "..."

  const first = str.slice(0, length)
  const last = str.slice(-length)

  return `${first}....${last}`
}

export function createAvatarURL(
  wallet: string | undefined | null,
  size: number = 120,
  variant: AvatarVariant = "marble",
  colors: AvatarColors = BORING_AVATAR_COLOR_PALETTE
) {
  if (!wallet) return new URL(`${variant}/${size}/default?colors=${colors.join(",")}`, BORING_AVATAR_ENDPOINT)

  return new URL(`${variant}/${size}/${wallet}?colors=${colors.join(",")}`, BORING_AVATAR_ENDPOINT)
}

export function toTitle(value: string) {
  const firstLetter = value.slice(0, 1).toUpperCase();
  return firstLetter + value.slice(1)
}

export async function historyTransactionConvert(data: any, pubKey: string) {
  const fakeData = [
    {
      timestamp: "2023-09-16T12:12:27.000Z",
      fee: 0.0000066,
      fee_payer: "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun",
      signers: [
        "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun"
      ],
      signatures: [
        "NshTJAjtmC1GZ6cFbPBgmqdkZpk5WTNPmSh1frnu5KVvbNuNQfEipHkSP2ufrSwHVUCVaJiNvRp9cAysaLFc5gc"
      ],
      protocol: {
        address: "11111111111111111111111111111111",
        name: "SYSTEM_PROGRAM"
      },
      type: "SOL_TRANSFER",
      status: "Success",
      actions: [
        {
          info: {},
          source_protocol: {
            address: "ComputeBudget111111111111111111111111111111",
            name: "COMPUTE_BUDGET"
          },
          type: "UNKNOWN"
        },
        {
          info: {},
          source_protocol: {
            address: "ComputeBudget111111111111111111111111111111",
            name: "COMPUTE_BUDGET"
          },
          type: "UNKNOWN"
        },
        {
          info: {
            sender: "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun",
            receiver: "GpEdNtVFcThFYeMFEveD6Q8rJnDvcFW7J4dDmEGK4UX1",
            amount: "0.100000000"
          },
          source_protocol: {
            address: "11111111111111111111111111111111",
            name: "SYSTEM_PROGRAM"
          },
          type: "SOL_TRANSFER"
        }
      ]
    },
  ]

  const result: any = [];

  const groupedTransaction: any = {};

  await data.map((item: any) => {
    const dateTime = new Date(item.timestamp).toISOString().split('T');

    const action = item.actions.slice(-1)[0];

    const timeSplit = dateTime[1].split(':')

    const time = `${Number(timeSplit[0]) >= 12 ? `0${Number(timeSplit[0]) - 12}` : timeSplit[0]}:${timeSplit[1]} ${Number(timeSplit[0]) >= 12 ? 'PM' : 'AM'}`;

    const type = typeTransactionCheck(action, pubKey);

    const value = action.info?.amount;

    const transaction = {
      time,
      type,
      value
    }

    if (!groupedTransaction[dateTime[0]]) {
      groupedTransaction[dateTime[0]] = {
        time: groupedTransaction,
        transaction: [transaction]
      }
    }
  })

  await Object.entries(groupedTransaction).map((item: any) => {
    const transactionList = item[1]?.transaction;
    result.push({
      date: item[0],
      transactionList
    });
  })

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
    return 'Deposit';
  } else {
    return 'Withdraw';
  }
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}