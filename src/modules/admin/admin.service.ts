import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { Knex } from 'knex';

@Injectable()
export class AdminService {
    constructor(private adminRepository: AdminRepository) { }

    create(user_id: string, trx: Knex.Transaction) {
        return this.adminRepository.create(user_id, trx)
    }
}
