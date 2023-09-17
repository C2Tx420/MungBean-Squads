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

export async function historyTransactionConvert(data: any) {
  const fakeData = [
    {
      timestamp: "2023-09-16T06:12:27.000Z",
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
    {
      timestamp: "2023-09-13T09:42:41.000Z",
      fee: 0.0000066,
      fee_payer: "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun",
      signers: [
        "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun"
      ],
      signatures: [
        "2y1cWaMtMaLMx4UgLAceMCrqkTDUWH9iQLtZmn8dzZmLjkYGtbMBtX3aC5bASHMhBU7xJ8YeMThjXPGmdHve57mn"
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
            amount: "0.500000000"
          },
          source_protocol: {
            address: "11111111111111111111111111111111",
            name: "SYSTEM_PROGRAM"
          },
          type: "SOL_TRANSFER"
        },
        {
          timestamp: "2023-09-16T08:21:45.000Z",
          fee: 0.0000066,
          fee_payer: "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun",
          signers: [
            "FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun"
          ],
          signatures: [
            "4TNG8nWcuZwFiqZqACZkqmCuV9zjJbg5aFuXGMgkHpyZUTTdoqmSDWwwSgMbcyPXK4a2KDDxtyYceQrFqe8jcgSe"
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
        }
      ]
    }
  ]

  const result = [];

  const groupedTransaction: any = {};

  await fakeData.map(item => {
    const dateTime = new Date(item.timestamp).toISOString().split('T');

    const action = item.actions.pop()

    console.log('action',action)

    const time = convertTime(dateTime[1]);

    const type = typeTransactionCheck(item.actions[-1]);

    const value = 0;

    const transaction = {
      time
    }

    if(!groupedTransaction[dateTime[0]]) {
      groupedTransaction[dateTime[0]] = {
        time: groupedTransaction,
        date: [transaction]
      }
    }
  })
}

export function convertTime(time: any) {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const amOrPm = hours >= 12 ? "PM" : "AM";
  
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${minutes} ${amOrPm}`;
}

export function typeTransactionCheck(action: any) {
  console.log(action)
  return 'Deposit';
}