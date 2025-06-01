import { FindOptions, Transaction, WhereOptions } from "sequelize";
import { IModel, IPaginatedData, IPagination } from "./model.interface";
import { BadRequestException, Injectable } from "@nestjs/common";
import constants from "src/common/utils/constants";

@Injectable()
export class ModelRepository<M> implements IModel<M> {
    constructor(private readonly model) {}

    async create<T = unknown>(data: T, transaction: Transaction | null): Promise<M> {
        return this.model.create(data, { transaction });
    }
    
    async bulkCreate<T = unknown>(data: T[], transaction: Transaction | null): Promise<M[]> {
        return this.model.bulkCreate(data, { transaction });
    }

    async findAll<T = unknown>(filter: WhereOptions<M> = {}, includes?: FindOptions<T>): Promise<M[]> {
        return this.model.findAll({where: {...filter}, ...includes});
    }

    async findAllPaginated<T = unknown>(filter: WhereOptions<M> = {}, includes?: FindOptions<T>, pagination?: IPagination): Promise<IPaginatedData> {
        const paginationParams = this.generatePaginationParams(pagination || {});

        const { count: total, rows: data } = await this.model.findAndCountAll({where: { ...filter }, ...includes, ...paginationParams});

        return {
            page: pagination?.page || constants.PAGINATION.DEFAULT_PAGE_NUMBER,
            total,
            limit: paginationParams.limit,
            data
        };
    }

    async findOne<T = unknown>(filter: WhereOptions<M>, includes?: FindOptions<T>): Promise<M> {
        return this.model.findOne({where: { ...filter }, ...includes});
    }
    
    async findById<T = unknown>(id: string | number, includes?: FindOptions<T>): Promise<M> {
        return this.model.findByPk(id, { ...includes });
    }

    async update<T = unknown>(filter: WhereOptions<M>, data: Partial<T>, transaction?: Transaction): Promise<M> {
        const [, rows] = await this.model.update(data, { where: { ...filter }, returning: true, transaction});

        if (!rows) throw new BadRequestException('No item found!');

        return rows[0];
    }

    async delete(filter: WhereOptions<M>, transaction: Transaction | null): Promise<M> {
        return this.model.destroy({where: { ...filter }, transaction });
    }

    private generatePaginationParams(pagination: IPagination) {
        const { DEFAULT_PAGE_NUMBER, DEFAULT_LIMIT } = constants.PAGINATION;

        const { page = DEFAULT_PAGE_NUMBER, limit: size = DEFAULT_LIMIT } = pagination;

        const pageNumber = +page || DEFAULT_PAGE_NUMBER;

        const limit = (+size > DEFAULT_LIMIT ? DEFAULT_LIMIT : +size) || DEFAULT_LIMIT;

        const offset = (pageNumber - 1) * limit;

        return {
            offset,
            limit
        };
    }
}