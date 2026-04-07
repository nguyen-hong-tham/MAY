import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    slug: string;
    order?: number;
    parentId?: number;
  }) {
    const existedSlug = await this.prisma.category.findFirst({
      where: {
        slug: data.slug,
        isDeleted: false,
      },
    });

    if (existedSlug) {
      throw new BadRequestException('Slug đã tồn tại');
    }

    if (data.parentId) {
      const parent = await this.prisma.category.findFirst({
        where: {
          id: data.parentId,
          isDeleted: false,
        },
      });

      if (!parent) {
        throw new BadRequestException('Category cha không tồn tại');
      }
    }

    return this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        order: data.order ?? 0,
        parentId: data.parentId,
      },
      include: {
        parent: true,
        children: {
          where: {
            isDeleted: false,
          },
        },
        products: {
          where: {
            isDeleted: false,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        parent: true,
        children: {
          where: {
            isDeleted: false,
          },
        },
        products: {
          where: {
            isDeleted: false,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        parent: true,
        children: {
          where: {
            isDeleted: false,
          },
        },
        products: {
          where: {
            isDeleted: false,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy category');
    }

    return category;
  }

  async update(
    id: number,
    data: {
      name?: string;
      slug?: string;
      order?: number;
      parentId?: number | null;
    },
  ) {
    await this.findOne(id);

    if (data.slug) {
      const existedSlug = await this.prisma.category.findFirst({
        where: {
          slug: data.slug,
          NOT: { id },
          isDeleted: false,
        },
      });

      if (existedSlug) {
        throw new BadRequestException('Slug đã tồn tại');
      }
    }

    if (data.parentId !== undefined && data.parentId !== null) {
      if (data.parentId === id) {
        throw new BadRequestException('Category không thể là cha của chính nó');
      }

      const parent = await this.prisma.category.findFirst({
        where: {
          id: data.parentId,
          isDeleted: false,
        },
      });

      if (!parent) {
        throw new BadRequestException('Category cha không tồn tại');
      }

      // Check circular reference: traverse upward from new parent
      // If we find current category (id), it's a circular reference
      let checkId: number | null = parent.parentId; // Start from parent's parent
      const visited = new Set<number>();

      while (checkId !== null && checkId !== undefined) {
        if (checkId === id) {
          throw new BadRequestException('Không thể tạo circular reference');
        }
        
        if (visited.has(checkId as number)) {
          // Circular reference in existing data, still block the change
          throw new BadRequestException('Không thể tạo circular reference');
        }
        visited.add(checkId as number);
        const ancestor = await this.prisma.category.findUnique({
          where: { id: checkId },
        });

        if (!ancestor) {
          break; // Reached root or broken chain
        }

        checkId = ancestor.parentId;
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        order: data.order,
        parentId: data.parentId,
      },
      include: {
        parent: true,
        children: {
          where: {
            isDeleted: false,
          },
        },
        products: {
          where: {
            isDeleted: false,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const hasProducts = await this.prisma.product.findFirst({
      where: {
        categoryId: id,
        isDeleted: false,
      },
    });

    if (hasProducts) {
      throw new BadRequestException('Category đang có product, không thể xóa');
    }

    const hasChildren = await this.prisma.category.findFirst({
      where: {
        parentId: id,
        isDeleted: false,
      },
    });

    if (hasChildren) {
      throw new BadRequestException('Category đang có danh mục con, không thể xóa');
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}