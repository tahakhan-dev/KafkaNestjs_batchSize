import { IQuery } from '@nestjs/cqrs';
import { AccountDto } from '../dto/Account.dto';

export class GetAccountQuery implements IQuery {
    public constructor(
        public readonly param: AccountDto,
    ) { }
}
