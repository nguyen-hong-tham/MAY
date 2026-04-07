import "dotenv/config"
<<<<<<< HEAD
import { PrismaClient, UserRole, OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client"
import bcrypt from "bcrypt"

=======
import {
  PrismaClient,
  UserRole,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client"
import bcrypt from "bcrypt"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Please check your .env file")
}

>>>>>>> c2c2448a314f8f6b420c2a32ee70718a11452905
const prisma = new PrismaClient()

async function resetConnection() {
  await prisma.$disconnect()
  // Give the connection pool time to reset
  await new Promise((resolve) => setTimeout(resolve, 500))
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function main() {
<<<<<<< HEAD
  console.log("🌱 Start seeding milk tea shop data...")
=======
  console.log("🌱 Seeding database...")

  // Cleanup existing data with error handling
  console.log("🧹 Cleaning up existing data...")
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "OrderLog" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "OrderItemTopping" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "OrderItem" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Payment" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Order" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "ProductTopping" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Topping" CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`
    console.log("✓ Cleanup done")
  } catch (e) {
    console.log("⚠️ Cleanup skipped (tables may already be empty)")
  }
>>>>>>> c2c2448a314f8f6b420c2a32ee70718a11452905

  // Xóa dữ liệu cũ
  await prisma.payment.deleteMany()
  await prisma.orderLog.deleteMany()
  await prisma.orderItemTopping.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productTopping.deleteMany()
  await prisma.topping.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
await prisma.user.deleteMany()

<<<<<<< HEAD
  const hashedPassword = await bcrypt.hash('123456', 10)

  // =========================
  // USERS
  // =========================


  const admin = await prisma.user.create({
    data: {
      email: "admin@may.com",
      password: hashedPassword,
      name: "Admin MAY",
      phone: "0900000001",
      address: "Quận 1, TP.HCM",
      role: UserRole.ADMIN,
    },
  })

  const staff = await prisma.user.create({
    data: {
      email: "staff@may.com",
      password: hashedPassword,
      name: "Staff MAY",
      phone: "0900000002",
      address: "Thủ Đức, TP.HCM",
      role: UserRole.STAFF,
    },
  })

  const customer = await prisma.user.create({
    data: {
      email: "customer@may.com",
      password: hashedPassword,
      name: "Nguyễn Thị Trà",
      phone: "0900000003",
      address: "Bình Thạnh, TP.HCM",
      role: UserRole.CUSTOMER,
      loyaltyPoint: 150,
      totalOrders: 5,
      totalSpent: 780000,
    },
  })

  // =========================
  // CATEGORY
  // =========================
  const milkTeaCategory = await prisma.category.create({
    data: {
      name: 'Trà sữa',
      slug: 'tra-sua',
      order: 1,
=======
  // ======================
  // USERS
  // ======================
  const admins: any[] = []
  for (let i = 1; i <= 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: `admin${i}@gmail.com`,
        password: hashedPassword,
        name: `Admin ${i}`,
        phone: `09000000${i}`,
        role: UserRole.ADMIN,
      },
    })
    admins.push(user)
  }

  const staffs: any[] = []
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `staff${i}@gmail.com`,
        password: hashedPassword,
        name: `Staff ${i}`,
        phone: `09100000${i}`,
        role: UserRole.STAFF,
      },
    })
    staffs.push(user)
  }

  const customers: any[] = []
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@gmail.com`,
        password: hashedPassword,
        name: `Customer ${i}`,
        phone: `09200000${i}`,
        role: UserRole.CUSTOMER,
      },
    })
    customers.push(user)
  }

  console.log("✓ Users created")

  // ======================
  // CATEGORY (parent-child)
  // ======================
  const drinks = await prisma.category.create({
    data: {
      name: "Đồ uống",
      slug: "do-uong",
    },
  })

  const milkTea = await prisma.category.create({
    data: {
      name: "Trà sữa",
      slug: "tra-sua",
      parentId: drinks.id,
>>>>>>> c2c2448a314f8f6b420c2a32ee70718a11452905
    },
  })

  const fruitTeaCategory = await prisma.category.create({
    data: {
<<<<<<< HEAD
      name: 'Trà trái cây',
      slug: 'tra-trai-cay',
      order: 2,
    },
  })

  // =========================
  // TOPPINGS
  // =========================
  const blackPearl = await prisma.topping.create({
    data: {
      name: 'Trân châu đen',
      price: 10000,
    },
  })

  const whitePearl = await prisma.topping.create({
    data: {
      name: 'Trân châu trắng',
      price: 10000,
    },
  })

  const pudding = await prisma.topping.create({
    data: {
      name: 'Pudding trứng',
      price: 12000,
    },
  })

  const jelly = await prisma.topping.create({
    data: {
      name: 'Thạch trái cây',
      price: 12000,
    },
  })

  const cheeseFoam = await prisma.topping.create({
    data: {
      name: 'Kem cheese',
      price: 15000,
    },
  })

  // =========================
  // PRODUCTS
  // =========================
  const traditionalMilkTea = await prisma.product.create({
    data: {
      name: 'Trà sữa truyền thống',
      price: 45000,
      description: 'Trà sữa vị truyền thống đậm đà',
      categoryId: milkTeaCategory.id,
      imageUrl: 'https://example.com/traditional-milk-tea.jpg',
    },
  })

  const matchaMilkTea = await prisma.product.create({
    data: {
      name: 'Trà sữa matcha',
      price: 50000,
      description: 'Matcha thơm béo',
      categoryId: milkTeaCategory.id,
      imageUrl: 'https://example.com/matcha-milk-tea.jpg',
    },
  })

  const brownSugarMilk = await prisma.product.create({
    data: {
      name: 'Sữa tươi trân châu đường đen',
      price: 55000,
      description: 'Best seller của quán',
      categoryId: milkTeaCategory.id,
      imageUrl: 'https://example.com/brown-sugar-milk.jpg',
    },
  })

  const peachTea = await prisma.product.create({
    data: {
      name: 'Trà đào cam sả',
      price: 48000,
      description: 'Trà trái cây thanh mát',
      categoryId: fruitTeaCategory.id,
      imageUrl: 'https://example.com/peach-tea.jpg',
    },
  })

  const lycheeTea = await prisma.product.create({
    data: {
      name: 'Trà vải',
      price: 42000,
      description: 'Trà vải mát lạnh',
      categoryId: fruitTeaCategory.id,
      imageUrl: 'https://example.com/lychee-tea.jpg',
    },
  })

  // =========================
  // PRODUCT TOPPINGS
  // =========================
  await prisma.productTopping.createMany({
    data: [
      { productId: traditionalMilkTea.id, toppingId: blackPearl.id },
      { productId: traditionalMilkTea.id, toppingId: pudding.id },
      { productId: traditionalMilkTea.id, toppingId: cheeseFoam.id },

      { productId: matchaMilkTea.id, toppingId: whitePearl.id },
      { productId: matchaMilkTea.id, toppingId: pudding.id },
      { productId: matchaMilkTea.id, toppingId: cheeseFoam.id },

      { productId: brownSugarMilk.id, toppingId: blackPearl.id },
      { productId: brownSugarMilk.id, toppingId: pudding.id },

      { productId: peachTea.id, toppingId: jelly.id },
      { productId: peachTea.id, toppingId: whitePearl.id },

      { productId: lycheeTea.id, toppingId: jelly.id },
      { productId: lycheeTea.id, toppingId: whitePearl.id },
    ],
  })
  // =========================
  // ORDER 1 - PENDING
  // =========================
  const order1 = await prisma.order.create({
    data: {
      userId: customer.id,
      phone: customer.phone,
      address: customer.address || 'Bình Thạnh, TP.HCM',
      total: 112000,
      status: OrderStatus.PENDING,
      earnedPoint: 11,
      usedPoint: 0,
    },
  })

  const order1Item1 = await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: traditionalMilkTea.id,
      quantity: 2,
      productName: traditionalMilkTea.name,
      basePrice: traditionalMilkTea.price,
    },
  })

  await prisma.orderItemTopping.create({
    data: {
      orderItemId: order1Item1.id,
      toppingName: blackPearl.name,
      toppingPrice: blackPearl.price,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: lycheeTea.id,
      quantity: 1,
      productName: lycheeTea.name,
      basePrice: lycheeTea.price,
    },
  })

  await prisma.orderLog.create({
    data: {
      orderId: order1.id,
      status: OrderStatus.PENDING,
      note: 'Order created',
      updatedById: customer.id,
    },
  })

  await prisma.payment.create({
    data: {
      orderId: order1.id,
      method: PaymentMethod.CASH,
      status: PaymentStatus.PENDING,
      amount: 112000,
    },
  })

  // =========================
  // ORDER 2 - CONFIRMED
  // =========================
  const order2 = await prisma.order.create({
    data: {
      userId: customer.id,
      phone: customer.phone,
      address: 'Quận 3, TP.HCM',
      total: 115000,
      status: OrderStatus.CONFIRMED,
      earnedPoint: 11,
      usedPoint: 10,
    },
  })

  const order2Item1 = await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: matchaMilkTea.id,
      quantity: 1,
      productName: matchaMilkTea.name,
      basePrice: matchaMilkTea.price,
    },
  })

  await prisma.orderItemTopping.create({
    data: {
      orderItemId: order2Item1.id,
      toppingName: pudding.name,
      toppingPrice: pudding.price,
    },
  })

  const order2Item2 = await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: peachTea.id,
      quantity: 1,
      productName: peachTea.name,
      basePrice: peachTea.price,
    },
  })

  await prisma.orderItemTopping.create({
    data: {
      orderItemId: order2Item2.id,
      toppingName: jelly.name,
      toppingPrice: jelly.price,
    },
  })

  await prisma.orderLog.createMany({
    data: [
      {
        orderId: order2.id,
        status: OrderStatus.PENDING,
        note: 'Order created',
        updatedById: customer.id,
      },
      {
        orderId: order2.id,
        status: OrderStatus.CONFIRMED,
        note: 'Order confirmed by staff',
      },
    ],
  })

  await prisma.payment.create({
    data: {
      orderId: order2.id,
      method: PaymentMethod.MOMO,
      status: PaymentStatus.SUCCESS,
      amount: 115000,
      transactionId: 'MOMO_TXN_001',
      paidAt: new Date(),
    },
  })

  // =========================
  // ORDER 3 - SHIPPING
  // =========================
  const order3 = await prisma.order.create({
    data: {
      userId: customer.id,
      phone: customer.phone,
      address: 'Quận 7, TP.HCM',
      total: 70000,
      status: OrderStatus.SHIPPING,
      earnedPoint: 7,
      usedPoint: 0,
    },
  })

  const order3Item1 = await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      productId: brownSugarMilk.id,
      quantity: 1,
      productName: brownSugarMilk.name,
      basePrice: brownSugarMilk.price,
    },
  })

  await prisma.orderItemTopping.create({
    data: {
      orderItemId: order3Item1.id,
      toppingName: blackPearl.name,
      toppingPrice: blackPearl.price,
    },
  })

  await prisma.orderLog.createMany({
    data: [
      {
        orderId: order3.id,
        status: OrderStatus.PENDING,
        note: 'Order created',
        updatedById: customer.id,
      },
      {
        orderId: order3.id,
        status: OrderStatus.CONFIRMED,
        note: 'Order confirmed by staff',
      },
      {
        orderId: order3.id,
        status: OrderStatus.SHIPPING,

      },
    ],
  })

  await prisma.payment.create({
    data: {
      orderId: order3.id,
      method: PaymentMethod.BANK_TRANSFER,
      status: PaymentStatus.SUCCESS,
      amount: 70000,
      transactionId: 'BANK_TXN_001',
      paidAt: new Date(),
    },
  })

  // =========================
  // ORDER 4 - COMPLETED
  // =========================
  const order4 = await prisma.order.create({
    data: {
      userId: customer.id,
      phone: customer.phone,
      address: 'Gò Vấp, TP.HCM',
      total: 117000,
      status: OrderStatus.COMPLETED,
      earnedPoint: 11,
      usedPoint: 0,
    },
  })

  const order4Item1 = await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: traditionalMilkTea.id,
      quantity: 1,
      productName: traditionalMilkTea.name,
      basePrice: traditionalMilkTea.price,
    },
  })

  await prisma.orderItemTopping.create({
    data: {
      orderItemId: order4Item1.id,
      toppingName: cheeseFoam.name,
      toppingPrice: cheeseFoam.price,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: peachTea.id,
      quantity: 1,
      productName: peachTea.name,
      basePrice: peachTea.price,
    },
  })

  await prisma.orderLog.createMany({
    data: [
      {
        orderId: order4.id,
        status: OrderStatus.PENDING,
        note: 'Order created',
        updatedById: customer.id,
      },
      {
        orderId: order4.id,
        status: OrderStatus.CONFIRMED,
        note: 'Order confirmed by staff',
      },
      {
        orderId: order4.id,
        status: OrderStatus.SHIPPING,
        note: 'Order shipped',
      },
      {
        orderId: order4.id,
        status: OrderStatus.COMPLETED,
        note: 'Order completed',
      },
    ],
  })

  await prisma.payment.create({
    data: {
      orderId: order4.id,
      method: PaymentMethod.CASH,
      status: PaymentStatus.SUCCESS,
      amount: 117000,
      paidAt: new Date(),
    },
  })

 // =========================
// ORDER 5 - CANCELLED
// =========================
const order5 = await prisma.order.create({
  data: {
    userId: customer.id,
    phone: customer.phone,
    address: 'Tân Bình, TP.HCM',
    total: 52000,
    status: OrderStatus.CANCELLED,
    earnedPoint: 0,
    usedPoint: 0,
  },
})

await prisma.orderItem.create({
  data: {
    orderId: order5.id,
    productId: lycheeTea.id,
    quantity: 1,
    productName: lycheeTea.name,
    basePrice: lycheeTea.price,
  },
})

await prisma.orderItemTopping.create({
  data: {
    orderItemId: (
      await prisma.orderItem.findFirstOrThrow({
        where: { orderId: order5.id },
      })
    ).id,
    toppingName: whitePearl.name,
    toppingPrice: whitePearl.price,
  },
})

await prisma.orderLog.createMany({
  data: [
    {
      orderId: order5.id,
      status: OrderStatus.PENDING,
      note: 'Order created',
      updatedById: customer.id,
    },
    {
      orderId: order5.id,
      status: OrderStatus.CANCELLED,
      note: 'Customer cancelled order',
      updatedById: customer.id,
    },
  ],
})

await prisma.payment.create({
  data: {
    orderId: order5.id,
    method: PaymentMethod.CASH,
    status: PaymentStatus.FAILED,
    amount: 52000,
  },
})

  console.log('✅ Seed completed!')
  console.log('---------------------------')
  console.log('Admin login:')
  console.log('email: admin@may.com')
  console.log('password: 123456')
  console.log('---------------------------')
  console.log('Staff login:')
  console.log('email: staff@may.com')
  console.log('password: 123456')
  console.log('---------------------------')
  console.log('Customer login:')
  console.log('email: customer@may.com')
  console.log('password: 123456')
=======
      name: "Trà trái cây",
      slug: "tra-trai-cay",
      parentId: drinks.id,
    },
  })

  console.log("✓ Categories created")

  // ======================
  // TOPPINGS
  // ======================
  const toppingList = [
    { name: "Trân châu đen", price: 5000 },
    { name: "Trân châu trắng", price: 5000 },
    { name: "Pudding trứng", price: 7000 },
    { name: "Thạch trái cây", price: 6000 },
    { name: "Kem cheese", price: 10000 },
  ]

  const toppings: any[] = []
  for (const t of toppingList) {
    const topping = await prisma.topping.create({ data: t })
    toppings.push(topping)
  }

  console.log("✓ Toppings created")

  // ======================
  // PRODUCTS
  // ======================
  const productList = [
    { name: "Trà sữa truyền thống", price: 30000, categoryId: milkTea.id },
    { name: "Trà sữa matcha", price: 35000, categoryId: milkTea.id },
    { name: "Trà sữa socola", price: 40000, categoryId: milkTea.id },
    { name: "Trà đào cam sả", price: 45000, categoryId: fruitTea.id },
    { name: "Trà vải", price: 42000, categoryId: fruitTea.id },
  ]

  const products: any[] = []
  for (const p of productList) {
    const product = await prisma.product.create({
      data: {
        ...p,
        toppings: {
          create: toppings.map((t) => ({
            toppingId: t.id,
          })),
        },
      },
    })
    products.push(product)
  }

  console.log("✓ Products created")

  // ======================
  // ORDERS
  // ======================
  for (let i = 0; i < 20; i++) {
    const user = randomFrom(customers)

    const numItems = randomInt(1, 3)

    let total = 0
    const itemsData: any[] = []

    for (let j = 0; j < numItems; j++) {
      const product = randomFrom(products)
      const quantity = randomInt(1, 2)

      total += product.price * quantity

      itemsData.push({
        productId: product.id,
        quantity,
        productName: product.name,
        basePrice: product.price,
      })
    }

    const status = randomFrom([
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
      OrderStatus.SHIPPING,
      OrderStatus.COMPLETED,
      OrderStatus.CANCELLED,
    ])

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,
        status,
        phone: user.phone,
        address: "TP.HCM",
        items: {
          create: itemsData,
        },
      },
    })

    // payment
    await prisma.payment.create({
      data: {
        orderId: order.id,
        method: randomFrom([
          PaymentMethod.CASH,
          PaymentMethod.MOMO,
          PaymentMethod.VNPAY,
        ]),
        status:
          status === OrderStatus.COMPLETED
            ? PaymentStatus.SUCCESS
            : PaymentStatus.PENDING,
        amount: total,
      },
    })

    // log
    await prisma.orderLog.create({
      data: {
        orderId: order.id,
        status,
        updatedById: randomFrom(staffs).id,
        note: "Seed data",
      },
    })
  }

  console.log("✓ Orders created")

  console.log("🎉 Seeding done")
>>>>>>> c2c2448a314f8f6b420c2a32ee70718a11452905
}

main()
  .catch((e) => {
<<<<<<< HEAD
    console.error('❌ Seed failed:', e)
=======
    console.error("❌ Seed failed:", e.message || e)
>>>>>>> c2c2448a314f8f6b420c2a32ee70718a11452905
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })