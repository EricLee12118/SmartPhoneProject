// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清理现有数据
  await prisma.comment.deleteMany()
  await prisma.like.deleteMany()
  await prisma.moment.deleteMany()
  await prisma.message.deleteMany()
  await prisma.chat.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.user.deleteMany()

  // 创建用户
  const sarah = await prisma.user.create({
    data: {
      name: 'Sarah Thompson',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Available'
    }
  })

  const john = await prisma.user.create({
    data: {
      name: 'John Davis',
      avatar: '/assets/images/favicon.png',
      isOnline: false,
      status: 'Busy'
    }
  })

  const emma = await prisma.user.create({
    data: {
      name: 'Emma Wilson',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Away'
    }
  })

  const me = await prisma.user.create({
    data: {
      name: 'Current User',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Available'
    }
  })

  // 添加其他用户
  const michael = await prisma.user.create({
    data: {
      name: 'Michael Brown',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Available'
    }
  })

  const lisa = await prisma.user.create({
    data: {
      name: 'Lisa Johnson',
      avatar: '/assets/images/favicon.png',
      isOnline: false,
      status: 'Offline'
    }
  })

  const robert = await prisma.user.create({
    data: {
      name: 'Robert Miller',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Available'
    }
  })

  const jennifer = await prisma.user.create({
    data: {
      name: 'Jennifer Taylor',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Busy'
    }
  })

  const david = await prisma.user.create({
    data: {
      name: 'David Anderson',
      avatar: '/assets/images/favicon.png',
      isOnline: true,
      status: 'Away'
    }
  })

  // 创建联系人关系
  await prisma.contact.createMany({
    data: [
      { userId: me.id, contactId: sarah.id },
      { userId: me.id, contactId: john.id },
      { userId: me.id, contactId: emma.id },
      { userId: me.id, contactId: michael.id },
      { userId: me.id, contactId: lisa.id },
      { userId: me.id, contactId: robert.id },
      { userId: me.id, contactId: jennifer.id },
      { userId: me.id, contactId: david.id },
    ]
  })

  // 创建聊天
  const chatWithSarah = await prisma.chat.create({
    data: {
      initiatorId: sarah.id,
      receiverId: me.id,
      lastMessage: 'Perfect, see you then!',
      lastMessageTime: new Date(2023, 3, 15, 10, 37)
    }
  })

  const chatWithJohn = await prisma.chat.create({
    data: {
      initiatorId: john.id,
      receiverId: me.id,
      lastMessage: 'I sent you the document',
      lastMessageTime: new Date(2023, 3, 14, 16, 5)
    }
  })

  const chatWithEmma = await prisma.chat.create({
    data: {
      initiatorId: emma.id,
      receiverId: me.id,
      lastMessage: 'Thanks for your help!',
      lastMessageTime: new Date(2023, 3, 14, 9, 5)
    }
  })

  // 创建消息
  // 与Sarah的消息
  await prisma.message.createMany({
    data: [
      { 
        chatId: chatWithSarah.id,
        text: 'Hi there!',
        senderId: sarah.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 15, 10, 30),
        isRead: true
      },
      {
        chatId: chatWithSarah.id,
        text: 'Hello! How are you?',
        senderId: me.id,
        receiverId: sarah.id,
        timestamp: new Date(2023, 3, 15, 10, 32),
        isRead: true
      },
      {
        chatId: chatWithSarah.id,
        text: 'I\'m good, thanks. Are we still meeting tomorrow?',
        senderId: sarah.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 15, 10, 35),
        isRead: true
      },
      {
        chatId: chatWithSarah.id,
        text: 'Yes, 2 PM at the coffee shop, right?',
        senderId: me.id,
        receiverId: sarah.id,
        timestamp: new Date(2023, 3, 15, 10, 36),
        isRead: true
      },
      {
        chatId: chatWithSarah.id,
        text: 'Perfect, see you then!',
        senderId: sarah.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 15, 10, 37),
        isRead: false
      },
    ]
  })

  // 与John的消息
  await prisma.message.createMany({
    data: [
      {
        chatId: chatWithJohn.id,
        text: 'Have you reviewed the document?',
        senderId: john.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 14, 15, 10),
        isRead: true
      },
      {
        chatId: chatWithJohn.id,
        text: 'Not yet, I\'ll look at it today',
        senderId: me.id,
        receiverId: john.id,
        timestamp: new Date(2023, 3, 14, 15, 20),
        isRead: true
      },
      {
        chatId: chatWithJohn.id,
        text: 'I sent you the document',
        senderId: john.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 14, 16, 5),
        isRead: true
      },
    ]
  })

  // 与Emma的消息
  await prisma.message.createMany({
    data: [
      {
        chatId: chatWithEmma.id,
        text: 'The project turned out great!',
        senderId: emma.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 14, 9, 0),
        isRead: true
      },
      {
        chatId: chatWithEmma.id,
        text: 'Thanks for your help!',
        senderId: emma.id,
        receiverId: me.id,
        timestamp: new Date(2023, 3, 14, 9, 5),
        isRead: true
      },
      {
        chatId: chatWithEmma.id,
        text: 'Happy to help! Let me know if you need anything else.',
        senderId: me.id,
        receiverId: emma.id,
        timestamp: new Date(2023, 3, 14, 10, 15),
        isRead: true
      },
    ]
  })

  // 创建朋友圈动态
  const sarahMoment = await prisma.moment.create({
    data: {
      userId: sarah.id,
      content: 'Enjoying a beautiful day at the park! 🌳 #nature #weekend',
      image: '/assets/images/react-logo.png',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2小时前
    }
  })

  const johnMoment = await prisma.moment.create({
    data: {
      userId: john.id,
      content: 'Just finished reading this amazing book. Highly recommend! 📚',
      image: '/assets/images/react-logo.png',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5小时前
    }
  })

  const emmaMoment = await prisma.moment.create({
    data: {
      userId: emma.id,
      content: 'Had an incredible dinner at the new restaurant downtown 🍽️',
      image: '/assets/images/react-logo.png',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 昨天
    }
  })

  // 添加点赞
  await prisma.like.createMany({
    data: [
      { userId: me.id, momentId: johnMoment.id },
      { userId: sarah.id, momentId: sarahMoment.id },
      { userId: john.id, momentId: sarahMoment.id },
      { userId: emma.id, momentId: sarahMoment.id },
      { userId: michael.id, momentId: sarahMoment.id },
      { userId: lisa.id, momentId: sarahMoment.id },
      { userId: robert.id, momentId: sarahMoment.id },
      { userId: jennifer.id, momentId: sarahMoment.id },
      { userId: david.id, momentId: sarahMoment.id },
      { userId: sarah.id, momentId: johnMoment.id },
      { userId: emma.id, momentId: johnMoment.id },
      { userId: michael.id, momentId: johnMoment.id },
      { userId: lisa.id, momentId: johnMoment.id },
      { userId: robert.id, momentId: johnMoment.id },
      { userId: jennifer.id, momentId: johnMoment.id },
      { userId: david.id, momentId: johnMoment.id },
      { userId: sarah.id, momentId: emmaMoment.id },
      { userId: john.id, momentId: emmaMoment.id },
      { userId: michael.id, momentId: emmaMoment.id },
      { userId: lisa.id, momentId: emmaMoment.id },
      { userId: robert.id, momentId: emmaMoment.id },
      { userId: jennifer.id, momentId: emmaMoment.id },
      { userId: david.id, momentId: emmaMoment.id },
    ]
  })

  // 添加评论
  await prisma.comment.createMany({
    data: [
      { 
        userId: john.id, 
        momentId: sarahMoment.id, 
        text: 'Looks amazing! Which park is this?' 
      },
      { 
        userId: emma.id, 
        momentId: sarahMoment.id, 
        text: 'Perfect day for a picnic!' 
      },
      { 
        userId: me.id, 
        momentId: sarahMoment.id, 
        text: 'Wish I could join you!' 
      },
      { 
        userId: michael.id, 
        momentId: sarahMoment.id, 
        text: 'Beautiful scenery!' 
      },
      { 
        userId: lisa.id, 
        momentId: sarahMoment.id, 
        text: 'Enjoy your day!' 
      },
      { 
        userId: sarah.id, 
        momentId: johnMoment.id, 
        text: 'What\'s the book called?' 
      },
      { 
        userId: emma.id, 
        momentId: johnMoment.id, 
        text: 'I\'ve been looking for a new book to read!' 
      },
      { 
        userId: me.id, 
        momentId: johnMoment.id, 
        text: 'Would you recommend it for a beach read?' 
      },
      { 
        userId: michael.id, 
        momentId: johnMoment.id, 
        text: 'Is it available as an audiobook?' 
      },
      { 
        userId: sarah.id, 
        momentId: emmaMoment.id, 
        text: 'What\'s the name of the restaurant?' 
      },
      { 
        userId: john.id, 
        momentId: emmaMoment.id, 
        text: 'The food looks delicious!' 
      },
      { 
        userId: me.id, 
        momentId: emmaMoment.id, 
        text: 'We should go there together sometime!' 
      },
      { 
        userId: michael.id, 
        momentId: emmaMoment.id, 
        text: 'I\'ve been wanting to try that place!' 
      },
      { 
        userId: lisa.id, 
        momentId: emmaMoment.id, 
        text: 'Did they have good vegetarian options?' 
      },
    ]
  })

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })