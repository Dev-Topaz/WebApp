import { TypeNotification } from 'src/types/notification-types';
import {
    TypeProduct,
    TypeNFTTransaction,
    TypeSingleNFTBid,
    enumBlindBoxNFTType,
    enumSingleNFTType,
    enumMyNFTType,
    enumTransactionType,
} from 'src/types/product-types';

export const dummyNotificationList: Array<TypeNotification> = [
    {
        title: 'You have a new bid!',
        content:
            'Your CryptoGirl#19 project has just been bid by a VKWR909981 user for E 100.00Your CryptoGirl#19 project has just been bid by a VKWR909981 user for E 100.00Your CryptoGirl#19 project has just been bid by a VKWR909981 user for E 100.00',
        date: '2021-09-03',
    },
    {
        title: 'You have a new bid!',
        content: 'Your CryptoGirl#19 project has just been bid by a VKWR909981 user for E 100.00',
        date: '2021-09-03',
    },
    {
        title: 'You have a new bid!',
        content: 'Your CryptoGirl#19 project has just been bid by a VKWR909981 user for E 100.00',
        date: '2021-09-03',
        isRead: true,
    },
    {
        title: 'You have a new bid!',
        content: 'Your CryptoGirl#19 project has just been bid by a VKWR909981 user for E 100.00',
        date: '2021-09-03',
        isRead: true,
    },
];

export const dummyProducts: Array<TypeProduct> = [
    {
        id: '0',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.ComingSoon,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '1',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnds,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '2',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnded,
    },
    {
        id: '3',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.ComingSoon,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '4',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnds,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '5',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnded,
    },
    {
        id: '6',
        image: 'https://scalablesolutions.io/wp-content/uploads/2021/03/NFTs.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.ComingSoon,
        saleTime: '2022/02/28 10:00',
    },
];

export const newNFTProducts: Array<TypeProduct> = [
    {
        id: '0',
        image: '/assets/images/explore/singlenft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '1',
        image: '/assets/images/blindbox/blindbox-nft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '2',
        image: '/assets/images/explore/singlenft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '3',
        image: '/assets/images/blindbox/blindbox-nft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '4',
        image: '/assets/images/explore/singlenft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '5',
        image: '/assets/images/blindbox/blindbox-nft-template4.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '6',
        image: '/assets/images/explore/singlenft-template4.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
];

export const singleNFTProducts: Array<TypeProduct> = [
    {
        id: '0',
        image: '/assets/images/explore/singlenft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '1',
        image: '/assets/images/explore/singlenft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '2',
        image: '/assets/images/explore/singlenft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.OnAuction,
    },
    {
        id: '3',
        image: '/assets/images/explore/singlenft-template4.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '4',
        image: '/assets/images/explore/singlenft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
    {
        id: '5',
        image: '/assets/images/explore/singlenft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.OnAuction,
    },
    {
        id: '6',
        image: '/assets/images/explore/singlenft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumSingleNFTType.BuyNow,
    },
];

export const blindboxNFTProducts: Array<TypeProduct> = [
    {
        id: '0',
        image: '/assets/images/blindbox/blindbox-nft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.ComingSoon,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '1',
        image: '/assets/images/blindbox/blindbox-nft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnds,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '2',
        image: '/assets/images/blindbox/blindbox-nft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnded,
    },
    {
        id: '3',
        image: '/assets/images/blindbox/blindbox-nft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.ComingSoon,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '4',
        image: '/assets/images/blindbox/blindbox-nft-template4.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnds,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '5',
        image: '/assets/images/blindbox/blindbox-nft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.SaleEnded,
    },
    {
        id: '6',
        image: '/assets/images/blindbox/blindbox-nft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumBlindBoxNFTType.ComingSoon,
        saleTime: '2022/02/28 10:00',
    },
];

export const myNFTProducts: Array<TypeProduct> = [
    {
        id: '0',
        image: '/assets/images/mynft/mynft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.BuyNow,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '1',
        image: '/assets/images/mynft/mynft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.OnAuction,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '2',
        image: '/assets/images/mynft/mynft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.Created,
    },
    {
        id: '3',
        image: '/assets/images/mynft/mynft-template4.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.Sold,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '4',
        image: '/assets/images/mynft/mynft-template1.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.BuyNow,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '5',
        image: '/assets/images/mynft/mynft-template2.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.OnAuction,
    },
    {
        id: '6',
        image: '/assets/images/mynft/mynft-template3.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.Created,
        saleTime: '2022/02/28 10:00',
    },
    {
        id: '7',
        image: '/assets/images/mynft/mynft-template4.png',
        name: 'Project Title',
        price_ela: 199,
        price_usd: 88,
        likes: 10,
        type: enumMyNFTType.Sold,
        saleTime: '2022/02/28 10:00',
    },
];

export const nftTransactions: Array<TypeNFTTransaction> = [
    { type: enumTransactionType.Bid, user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { type: enumTransactionType.OnAuction, user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { type: enumTransactionType.SoldTo, user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { type: enumTransactionType.ForSale, user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { type: enumTransactionType.CreatedBy, user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
];

export const singleNFTBids: Array<TypeSingleNFTBid> = [
    { user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
    { user: 'Nickname', price: 199, time: '2022/02/28  10:00' },
];

